const { ChannelMessages, Channels } = require("../sequelize/models");

const channelEventsHandler = (socket, io) => {
  socket.on("send-message-to-channel", async (messageObj) => {
    const { serverId, channelName, sender, content, serverName, contentType } =
      messageObj;

    await ChannelMessages.create({
      serverId,
      channelName,
      senderId: sender.id,
      content,
      contentType,
    });

    console.log(`Sending message to ${serverName}`);
    io.to(serverName).emit("message-received-on-server", messageObj);
  });

  socket.on(
    "create-channel",
    async ({ serverId, channelName, channelType, serverName }) => {
      await Channels.create({
        serverId,
        channelName,
        channelType,
      });
      io.to(serverName).emit("new-channel-created", {
        serverId,
        channelName,
        channelType,
      });
    }
  );
};

module.exports = channelEventsHandler;
