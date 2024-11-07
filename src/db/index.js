require("dotenv").config({ path: "../.env" });
const Pool = require("pg").Pool;

const { db } = require("../config/index");

const dbPoolSettings = {
  min: 1,
  max: 5,
};

const pool = new Pool({ ...db, dbPoolSettings });

module.exports = pool;
