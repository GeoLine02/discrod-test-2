const {
  Servers,
  ServerMemberJunctions,
  ServerInviteRequests,
  Channels,
  User,
} = require("../sequelize/models");
const channelsService = require("../services/channels.service");

const getServers = async (req, res) => {
  try {
    const { userId } = req.query;
    const serverList = await ServerMemberJunctions.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Servers,
          as: "server",
          include: [
            {
              model: Channels,
              as: "channels",
            },
          ],
        },
      ],
    });
    if (serverList) {
      return res.status(200).json(serverList);
    }
  } catch (erorr) {
    console.log(erorr);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getServerById = async (req, res) => {
  try {
    const serverId = req.query.serverId;

    const server = await Servers.findOne({
      where: { id: serverId },
      include: [
        {
          model: Channels,
          as: "channels",
        },
      ],
    });

    if (server) {
      return res.status(200).json(server);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const createServerWithChannel = async (req, res) => {
  try {
    const {
      serverName,
      serverTemplate,
      serverCommunity,
      ownerId,
      serverImage,
    } = req.body;

    const existingServer = await Servers.findOne({ where: { serverName } });

    if (existingServer) {
      return res
        .status(400)
        .json({ message: "server with this name already exists" });
    }

    const newServer = await Servers.create({
      serverName,
      serverTemplate: serverTemplate.templateType,
      serverCommunity: serverCommunity.templateType,
      ownerId,
      serverImage,
    });

    const textChannel = await channelsService.createTextChannel(
      {
        body: {
          serverId: newServer.id,
          serverTemplate,
        },
      },
      res
    );

    const voiceChannel = await channelsService.createVoiceChannel({
      body: {
        serverId: newServer.id,
        serverTemplate,
      },
      res,
    });

    await ServerMemberJunctions.create({
      serverId: newServer.id,
      userId: ownerId,
      status: "owner",
    });

    return res
      .status(201)
      .json({ server: newServer, textChannel, voiceChannel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const joinServerByUrl = async (req, res) => {
  try {
    const { serverUrl } = req.body;

    const serverName = serverUrl?.split("/").reverse()[0];

    const server = await Servers.findOne({ where: { serverName } });

    if (!server) {
      return res.status(404).json({ message: "server not found" });
    }

    const joinedMember = await ServerMemberJunctions.create(
      userId,
      server.id,
      "member"
    );
    if (joinedMember) {
      return res
        .status(201)
        .json({ message: "User joined to server successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const joinServerByRequest = async (req, res) => {
  try {
    const { serverId, senderId, receiverId } = req.body;

    const joinedUser = await ServerInviteRequests.create({
      senderId,
      receiverId,
      serverId,
    });

    if (joinedUser) {
      return res
        .status(201)
        .json({ message: "Server invite sent successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getServerInvites = async (req, res) => {
  const { userId } = req.query;
  try {
    const serverInvites = await ServerInviteRequests.findAll({
      where: {
        receiverId: userId,
      },
    });
    if (serverInvites) {
      return res.status(200).json(serverInvites);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getServerMemebers = async (req, res) => {
  try {
    const { serverId } = req.query;
    const serverMembers = await ServerMemberJunctions.findAll({
      where: {
        serverId: serverId,
      },
      include: [
        {
          model: User,
          as: "member",
        },
      ],
    });
    if (serverMembers) {
      return res.status(200).json(serverMembers);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  createServerWithChannel,
  getServerById,
  getServers,
  joinServerByUrl,
  joinServerByRequest,
  getServerInvites,
  getServerMemebers,
};
