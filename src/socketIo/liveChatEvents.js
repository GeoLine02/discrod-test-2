const { DirectMessages, ChannelMessages } = require("../sequelize/models");

const liveChatEventsHandler = (socket, io, connectedUsers) => {
  // send message to friend
  socket.on("send-message-to-friend", async (messageObj) => {
    try {
      console.log(messageObj);
      const { content, sender, receiver, sentDate } = messageObj;
      if (content) {
        await DirectMessages.create({
          senderId: sender?.id,
          receiverId: receiver.id,
          content,
        });

        const rowCount = await DirectMessages.findAndCountAll();

        io.to(connectedUsers[receiver?.username]).emit(
          "message-received-from-friend",
          {
            id: rowCount.count,
            content,
            sender,
            sentDate,
            receiver,
            contentType: "text",
          }
        );
      }
    } catch (erorr) {
      console.log(erorr);
    }
  });
};

module.exports = liveChatEventsHandler;
