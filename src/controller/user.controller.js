const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req, res);
    if (newUser) {
      return newUser;
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const authorizeUser = async (req, res) => {
  try {
    const authorizedUser = await userService.authorizeUser(req, res);
    if (authorizedUser) {
      return authorizedUser;
    } else {
      return 1;
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const fetchedUser = await userService.getUser(req, res);
    return fetchedUser;
  } catch (error) {
    console.log(error);
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const newAccessToken = await userService.refreshAccessToken(req, res);
    if (newAccessToken) {
      return newAccessToken;
    }
  } catch (err) {
    console.log(err);
  }
};

const logOut = async (req, res) => {
  try {
    const removedCookie = await userService.logOut(req, res);
    return removedCookie;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  authorizeUser,
  refreshAccessToken,
  getUser,
  logOut,
};
