const messagesService = require("../services/messages.service");

const getDirectMesages = async (req, res) => {
  try {
    const directMessages = await messagesService.getDirectMesages(req, res);
    return directMessages;
  } catch (erorr) {
    console.log(erorr);
  }
};

const getChannelMessages = async (req, res) => {
  try {
    const channelMessages = await messagesService.getChannelMessages(req, res);
    return channelMessages;
  } catch (erorr) {
    console.log(erorr);
  }
};

module.exports = {
  getDirectMesages,
  getChannelMessages,
};
