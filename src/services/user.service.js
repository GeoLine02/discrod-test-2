const { User } = require("../sequelize/models");
const hashPassword = require("../helpers/bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../helpers/TokenGenerator");

const createUser = async (req, res) => {
  try {
    const { username, displayName, email, password } = req.body;

    const isEmailUsed = await User.findOne({ where: { email } });

    const isUsernameUsed = await User.findOne({ where: { username } });

    if (isEmailUsed) {
      return res.status(200).json({ message: "Email is already in use" });
    }

    if (isUsernameUsed) {
      return res.status(200).json({ message: "Username is already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      displayName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      return res.status(201).json({ message: "User created successfuly" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    {
      if (authHeaders) {
        const token = authHeaders?.split(" ")[1];
        const decodedToken = jwt.decode(token);

        return res.status(200).json({ accessToken: token, user: decodedToken });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const authorizeUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const refreshToken = await generateRefreshToken(user);
    const accessToken = await generateAccessToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const verifiedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findByPk(verifiedToken.id);
    if (!verifiedToken) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (verifiedToken) {
      const newAccessToken = await generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired refresh token" });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "cookie deleted successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  createUser,
  authorizeUser,
  refreshAccessToken,
  getUser,
  logOut,
};
