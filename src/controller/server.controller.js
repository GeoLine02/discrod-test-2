const serverService = require("../services/server.service");

const getServers = async (req, res) => {
  try {
    const serverList = serverService.getServers(req, res);
    return serverList;
  } catch (error) {
    console.log(error);
  }
};

const getServerByName = async (req, res) => {
  try {
    const server = await serverService.getServerById(req, res);
    return server;
  } catch (error) {
    console.log(error);
  }
};

const createServerWithChannel = async (req, res) => {
  try {
    const createdServer = await serverService.createServerWithChannel(req, res);
    return createdServer;
  } catch (error) {
    console.log(error);
  }
};

const joinServerByUrl = async (req, res) => {
  try {
    const joinedUser = await serverService.joinServerByUrl(req, res);
    return joinedUser;
  } catch (error) {
    console.log(error);
  }
};

const joinServerByRequest = async (req, res) => {
  try {
    const joinedUser = await serverService.joinServerByRequest(req, res);
    return joinedUser;
  } catch (error) {
    console.log(error);
  }
};

const getServerInvites = async (req, res) => {
  try {
    const serverInvites = await serverService.getServerInvites(req, res);
    return serverInvites;
  } catch (error) {
    console.log(error);
  }
};

const getServerMemebers = async (req, res) => {
  try {
    const serverMembers = await serverService.getServerMemebers(req, res);
    return serverMembers;
  } catch (erorr) {
    console.log(erorr);
  }
};

module.exports = {
  getServers,
  createServerWithChannel,
  getServerByName,
  joinServerByUrl,
  joinServerByRequest,
  getServerInvites,
  getServerMemebers,
};
