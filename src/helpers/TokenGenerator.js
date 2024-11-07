const jwt = require("jsonwebtoken");
const { Token } = require("../sequelize/models");

const generateAccessToken = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return refreshToken;
};

module.exports = { generateRefreshToken, generateAccessToken };
