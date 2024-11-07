const friendsService = require("../services/friends.service");

const getFriends = async (req, res) => {
  try {
    const friends = await friendsService.getFriends(req, res);
    return friends;
  } catch (error) {
    console.log(error);
  }
};

const getDMVisibleFriends = async (req, res) => {
  try {
    const DMVisibleFriends = await friendsService.getDMVisibleFriends(req, res);
    return DMVisibleFriends;
  } catch (error) {
    console.log(error);
  }
};

const sendFriendReuqest = async (req, res) => {
  try {
    const sendedFriendRequest = await friendsService.sendFriendRequest(
      req,
      res
    );
    return sendedFriendRequest;
  } catch (error) {
    console.log(error);
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const acceptedRequest = await friendsService.acceptFriendRequest(req, res);
    if (acceptedRequest) {
      return acceptedRequest;
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const rejectedRequest = await friendsService.rejectFriendRequest(req, res);
    return rejectedRequest;
  } catch (error) {
    console.log(error);
  }
};

const getAllFriendRequests = async (req, res) => {
  try {
    const allFriendRequests = await friendsService.getAllFriendRequests(
      req,
      res
    );
    return allFriendRequests;
  } catch (error) {
    console.log(error);
  }
};

const updateFriendDmVisibility = async (req, res) => {
  try {
    const updatedVisibility = await friendsService.upadteFriendDmVisibility(
      req,
      res
    );
    return updatedVisibility;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFriends,
  getDMVisibleFriends,
  updateFriendDmVisibility,
  sendFriendReuqest,
  acceptFriendRequest,
  getAllFriendRequests,
  rejectFriendRequest,
};
