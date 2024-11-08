const {
  User,
  FriendRequests,
  FriendList,
  sequelize,
} = require("../sequelize/models");
const { Op } = require("sequelize");
const friendRequestHandler = (socket, io, connectedUsers) => {
  // friend request sender event
  socket.on(
    "send-friend-request",
    async ({ senderUsername, receiverUsername, senderId, status }) => {
      const receiver = connectedUsers[receiverUsername];
      try {
        const user = await User.findOne({
          where: {
            username: receiverUsername,
          },
        });
        const receiverId = user.id;
        const existedRequest = FriendRequests.findOne({
          where: {
            senderId,
            receiverId,
          },
        });
        const sender = await User.findOne({ where: { id: senderId } });
        const isFriend = await FriendList.findOne({
          where: { userId: user.id, friendId: senderId },
        });

        if (senderId === receiverId) {
          socket.emit("decline-friend-request", {
            message: "Friend not found",
          });
        }

        if (existedRequest || isFriend) {
          socket.emit("decline-friend-request", {
            message: "Friend request already sent",
          });
          console.log("friend request declined");
        }

        if (!existedRequest || !isFriend) {
          socket
            .to(receiver)
            .emit(
              "receive-friend-request",
              sender,
              senderUsername,
              receiverUsername,
              senderId,
              status
            );
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on("accept-friend-request", async (user, senderId) => {
    const sender = await User.findOne({ where: { id: senderId } });
    const receiver = connectedUsers[sender.username];
    io.to(receiver).emit("friend-request-accepted", user, () => {
      console.log("friend request accepted");
    });
  });

  socket.on("delete-friend", async (params) => {
    const { userId, friendId, username } = params;
    try {
      const deletedFriend = await FriendList.destroy({
        where: {
          [Op.or]: [
            { userId: userId, friendId: friendId },
            { userId: friendId, friendId: userId },
          ],
        },
      });

      if (deletedFriend) {
        io.to(connectedUsers[username]).emit("deleted-friend", userId);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("get-online-friends", (friendList, user) => {
    console.log(connectedUsers);
    console.log(friendList, user);
    const onlineFriends = [];
    console.log("keys: ", Object.keys(connectedUsers));
    friendList.map((friend) => {
      return Object.keys(connectedUsers).map((key) => {
        if (friend?.Friend?.username === key) {
          return onlineFriends.push({
            id: friend?.Friend?.id,
            username: friend?.Friend?.username,
          });
        }
      });
    });
    io.to(connectedUsers[user?.username]).emit(
      "receive-online-friends",
      onlineFriends
    );
  });
};

module.exports = friendRequestHandler;
