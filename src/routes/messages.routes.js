const express = require("express");
const router = express.Router();
const messagesController = require("../controller/messages.controller");
router.get("/direct-messages", messagesController.getDirectMesages);
router.get("/channel-messages", messagesController.getChannelMessages);
module.exports = router;
