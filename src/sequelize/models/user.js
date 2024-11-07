"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.ChannelMessages, {
        foreignKey: "senderId",
        as: "sentChannelMessage",
      });

      this.belongsToMany(models.Servers, {
        through: models.ServerMemberJunctions,
        foreignKey: "userId",
        as: "joinedServers",
      });
      this.hasMany(models.DirectMessages, {
        foreignKey: "senderId",
        as: "sentMessage",
      });

      this.hasMany(models.DirectMessages, {
        foreignKey: "receiverId",
        as: "receivedMessage",
      });

      this.belongsToMany(models.User, {
        through: models.FriendRequests,
        as: "SentRequest",
        foreignKey: "senderId",
        onDelete: "CASCADE",
      });

      this.belongsToMany(models.User, {
        through: models.FriendRequests,
        as: "ReceivedRequest",
        foreignKey: "receiverId",
        onDelete: "CASCADE",
      });

      this.belongsToMany(models.User, {
        through: models.FriendList,
        as: "FriendOf",
        foreignKey: "friendId",
        otherKey: "userId",
      });
      this.hasMany(models.Servers, {
        foreignKey: "ownerId",
        as: "ownedServers",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      username: { type: DataTypes.STRING, allowNull: false },
      displayName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
