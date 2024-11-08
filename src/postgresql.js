const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.INTERNAL_DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 10, // Allows a larger number of concurrent connections (tune this based on expected load)
    min: 2, // Keeps a few connections in reserve, which can improve response time for new queries
    acquire: 60000, // Increases the max time to wait for a connection to 60 seconds (good for high-load apps)
    idle: 20000, // Releases connections after 20 seconds of inactivity to reduce resource usage
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
