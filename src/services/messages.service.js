const {
  DirectMessages,
  User,
  Servers,
  Channels,
  ChannelMessages,
} = require("../sequelize/models");
const { Op } = require("sequelize");
const getDirectMesages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(404).json({ message: "messages not found" });
    }

    const directMessages = await DirectMessages.findAll({
      where: {
        [Op.or]: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: [
        {
          model: User,
          as: "sender",
        },
        {
          model: User,
          as: "receiver",
        },
        {
          model: Servers,
          as: "server",
          required: false,
          include: [{ model: Channels, as: "channels" }],
        },
      ],
    });

    return res.status(200).json(directMessages);
  } catch (erorr) {
    console.log(erorr);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getChannelMessages = async (req, res) => {
  try {
    const { serverId, channelName } = req.query;
    const channelMessages = await ChannelMessages.findAll({
      where: {
        serverId,
        channelName,
      },
      include: [
        {
          model: User,
          as: "sender",
        },
      ],
    });
    if (channelMessages) {
      return res.status(200).json(channelMessages);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getDirectMesages,
  getChannelMessages,
};
