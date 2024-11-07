const { where } = require("sequelize");
const { User, FriendRequests, FriendList } = require("../sequelize/models");
const getFriends = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendlist = await FriendList.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "Friend",
        },
      ],
      attributes: [],
    });

    if (friendlist) {
      return res.status(200).json(friendlist);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getDMVisibleFriends = async (req, res) => {
  try {
    const { userId } = req.query;
    const DMVisibleFriends = await FriendList.findAll({
      where: {
        userId,
        DMVisibility: true,
      },
      include: [
        {
          model: User,
          as: "Friend",
        },
      ],
    });
    return res.status(200).json(DMVisibleFriends);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, username } = req.body;
    // looks for receiver who's username is equal to req.body.username
    const receiver = await User.findOne({ where: { username } });

    // if receiver not found or senders send request to themselves, server sends error 404
    if (!receiver || senderId === receiver.id) {
      return res.status(200).json({ message: "User not found" });
    }

    const existingRequest = await FriendRequests.findOne({
      where: {
        senderId: senderId,
        receiverId: receiver.id,
      },
    });

    const isFriend = await FriendList.findOne({
      where: { friendId: senderId, userId: receiver.id },
    });
    if (isFriend) {
      console.log("SenderIdddddddd", senderId);
      return res.status(200).json({ message: "User is already your friend" });
    }
    if (existingRequest) {
      return res.status(200).json({ message: "Friend request already sent" });
    }

    // creates friend request
    const friendRequest = await FriendRequests.create({
      senderId: senderId,
      receiverId: receiver.id,
    });

    if (friendRequest) {
      return res
        .status(200)
        .json({ message: "Friend request sent successfuly" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getAllFriendRequests = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendRequests = await FriendRequests.findAll({
      where: { receiverId: userId },
      include: [
        {
          model: User,
          as: "Sender",
        },
      ],
    });

    if (friendRequests) {
      return res.status(200).json({ friendRequests });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const friendRequest = await FriendRequests.findOne({ where: { senderId } });

    if (friendRequest) {
      await FriendList.bulkCreate([
        {
          userId: senderId,
          friendId: receiverId,
          status: "accepted",
          DMVisibility: true,
        },
        {
          userId: receiverId,
          friendId: senderId,
          status: "accepted",
          DMVisibility: true,
        },
      ]);
      await FriendRequests.destroy({
        where: { senderId, receiverId },
      });

      return res.status(200).json({ message: "Successful acception" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const rejectedRequest = await FriendRequests.destroy({
      where: { senderId, receiverId },
    });
    if (rejectedRequest) {
      return res
        .status(200)
        .json({ message: "Friend request rejected successfuly" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.query;
    const deletedFriend = await FriendList.destroy({
      where: {
        userId,
        friendId,
      },
    });

    if (deletedFriend) {
      return res.status(200).json({ message: "user deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const upadteFriendDmVisibility = async (req, res) => {
  try {
    const { userId, friendId, visibility } = req.body;
    if (!friendId) {
      return res.status(400).json({
        message: "user id is required",
      });
    }
    const updatedVisibility = await FriendList.update(
      { DMVisibility: visibility },
      {
        where: {
          userId: userId,
          friendId: friendId,
        },
      }
    );
    if (updatedVisibility) {
      return res
        .status(201)
        .json({ message: "visibility changed successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getFriends,
  getDMVisibleFriends,
  upadteFriendDmVisibility,
  sendFriendRequest,
  getAllFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
};
