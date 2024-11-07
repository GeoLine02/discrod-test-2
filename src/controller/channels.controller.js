const channelsService = require("../services/channels.service");

const getChannelMessages = async (req, res) => {
  // try {
  //   const channelMessages = await channelsService.getChannelMessages(req, res);
  //   return channelMessages;
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = {
  getChannelMessages,
};
