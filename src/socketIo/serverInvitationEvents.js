const {
  DirectMessages,
  ServerMemberJunctions,
  Servers,
} = require("../sequelize/models");

const serverInvitationEventsHandler = (socket, io, connectedUsers) => {
  socket.on("send-server-invitation", async (invitationObj) => {
    try {
      const { serverId, sender, receiver, server } = invitationObj;
      console.log(invitationObj);
      await DirectMessages.create({
        senderId: sender?.id,
        receiverId: receiver?.Friend?.id,
        content: server?.serverName,
        contentType: "invite",
        serverId: serverId,
      });

      const recordId = await DirectMessages.findOne({
        order: [["id", "DESC"]],
      });
      io.to(connectedUsers[receiver?.Friend?.username]).emit(
        "server-invitation-received",
        {
          id: recordId.dataValues.id,
          serverId,
          sender,
          server,
          receiver: receiver?.Friend,
          content: server?.serverName,
          contentType: "invite",
        }
      );
    } catch (erorr) {
      console.log(erorr);
    }
  });

  socket.on("accept-server-invite", async (invitationObj) => {
    try {
      const { id, serverName, user, friend, status } = invitationObj;
      await DirectMessages.destroy({
        where: {
          id,
        },
      });
      const server = await Servers.findOne({
        where: {
          serverName,
        },
      });
      await ServerMemberJunctions.create({
        serverId: server?.id,
        userId: user?.id,
        status,
      });
      io.to(connectedUsers[friend?.username]).emit("server-invite-accepted", {
        user,
        server,
        message: `${user?.username} joined to ${serverName}`,
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = serverInvitationEventsHandler;
