const express = require("express");
const router = express.Router();
const migrationController = require("../controller/migration.controller");

router.get("/", migrationController.runMigrations);

module.exports = router;
