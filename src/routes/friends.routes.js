const friendsController = require("../controller/friends.controller");

const express = require("express");

const router = express.Router();

router.get("/", friendsController.getFriends);
router.get("/dm-visible-friends", friendsController.getDMVisibleFriends);
router.get("/friend-request/get", friendsController.getAllFriendRequests);
router.post("/friend-request/send", friendsController.sendFriendReuqest);
router.post("/friend-request/accept", friendsController.acceptFriendRequest);
router.delete("/friend-request/reject", friendsController.rejectFriendRequest);
router.patch(
  "/dm-visible-friends/update",
  friendsController.updateFriendDmVisibility
);

module.exports = router;
