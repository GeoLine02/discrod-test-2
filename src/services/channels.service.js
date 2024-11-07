const { Channels } = require("../sequelize/models");

const createTextChannel = async (req, res) => {
  try {
    const { serverId, serverTemplate } = req.body;

    const channelsArray = serverTemplate.textchannels.map((channelName) => ({
      serverId,
      channelName,
      channelType: "text",
    }));

    const channel = await Channels.bulkCreate(channelsArray);
    return channel;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createVoiceChannel = async (req, res) => {
  try {
    const { serverId, serverTemplate } = req.body;

    const channelsArray = serverTemplate.voiceChannels.map((channelName) => ({
      serverId,
      channelName,
      channelType: "voice",
    }));
    const channel = await Channels.bulkCreate(channelsArray);
    return channel;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createTextChannel,
  createVoiceChannel,
};
