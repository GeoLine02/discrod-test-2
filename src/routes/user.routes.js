const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/", userController.getUser);
router.post("/create", userController.createUser);
router.post("/authorize", userController.authorizeUser);
router.get("/refreshToken", userController.refreshAccessToken);
router.get("/logout", userController.logOut);

module.exports = router;
