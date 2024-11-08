const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.INTERNAL_DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000, // Adjust this as needed
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
