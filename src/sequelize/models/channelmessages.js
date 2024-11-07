"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChannelMessages extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "senderId",
        as: "sender",
      });

      this.belongsTo(models.Channels, {
        foreignKey: "channelName",
        as: "channelMessages",
      });
    }
  }
  ChannelMessages.init(
    {
      serverId: { type: DataTypes.INTEGER, allowNull: false },
      channelName: { type: DataTypes.STRING, allowNull: false },
      senderId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "text",
      },
    },
    {
      sequelize,
      modelName: "ChannelMessages",
    }
  );
  return ChannelMessages;
};
