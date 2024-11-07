"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DirectMessages extends Model {
    static associate(models) {
      this.belongsTo(models.Servers, {
        foreignKey: "serverId", // Foreign key in DirectMessages
        as: "server", // Alias for the association
        onDelete: "CASCADE", // If a server is deleted, delete related messages
      });

      this.belongsTo(models.User, {
        foreignKey: "senderId",
        as: "sender",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.User, {
        foreignKey: "receiverId",
        as: "receiver",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  DirectMessages.init(
    {
      senderId: { type: DataTypes.INTEGER, allowNull: false },
      receiverId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "text",
      },
      serverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "DirectMessages",
    }
  );
  return DirectMessages;
};
