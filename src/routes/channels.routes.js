const channelController = require("../controller/channels.controller");
const express = require("express");
const router = express.Router();
router.get("/messages", channelController.getChannelMessages);

module.exports = router;
