"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
    static associate(models) {
      this.hasMany(models.ChannelMessages, {
        foreignKey: "channelName",
        as: "server",
      });

      this.belongsTo(models.Servers, {
        foreignKey: "serverId",
        as: "channels",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Channels.init(
    {
      serverId: { type: DataTypes.INTEGER, allowNull: false },
      channelName: { type: DataTypes.STRING, allowNull: false },
      channelType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "text",
      },
    },
    {
      sequelize,
      modelName: "Channels",
    }
  );
  return Channels;
};
