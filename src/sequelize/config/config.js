require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    url: process.env.INTERNAL_DATABASE_URL, // Adding sslmode=require for SSL connection
    dialect: "postgres",
    dialectOptions: {
      // ssl: {
      //   require: false, // Enforce SSL connection
      //   rejectUnauthorized: false, // Disable certificate
      // },
    },
    pool: {
      max: Infinity,
      min: 2,
      acquire: 60000,
      idle: 20000,
    },
  },
};
