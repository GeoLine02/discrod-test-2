const migrationService = require("../services/migration.service");

const runMigrations = async (req, res) => {
  try {
    const migrations = migrationService.runMigrations(req, res);
    return migrations;
  } catch (erorr) {
    console.log(erorr);
  }
};

module.exports = {
  runMigrations,
};
