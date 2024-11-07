const connectedUsers = {};
const connectedServers = {};

const friendRequestHandler = require("./friendRequestEvents");
const liveChatEventHandler = require("./liveChatEvents");
const serverInvitaionEventHandler = require("./serverInvitationEvents");
const channelEventHandlers = require("./channelEvents");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("register", async (username) => {
      try {
        console.log(`${username} registered with socket ID ${socket.id}`);
        connectedUsers[username] = socket.id;
        console.log("users: ", connectedUsers);

        socket.on("join-server", (servers) => {
          if (servers) {
            servers?.forEach((server) => {
              socket.join(server?.serverName);
              console.log(`${username} has joined to ${server?.serverName}`);
            });
          }
        });
      } catch (error) {}
    });

    friendRequestHandler(socket, io, connectedUsers);
    liveChatEventHandler(socket, io, connectedUsers);
    serverInvitaionEventHandler(socket, io, connectedUsers);
    channelEventHandlers(socket, io, connectedServers);

    socket.on("disconnect", async () => {
      console.log("A user disconnect: ", socket.id);

      for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};

module.exports = { socketHandler, connectedUsers };
