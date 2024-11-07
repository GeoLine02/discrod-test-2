"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servers extends Model {
    static associate(models) {
      this.hasMany(models.Channels, {
        foreignKey: "serverId",
        as: "channels",
      });

      this.hasMany(models.DirectMessages, {
        foreignKey: "serverId", // The foreign key in DirectMessages
        as: "messages", // Alias for the association
        onDelete: "CASCADE", // If a server is deleted, delete related messages
      });

      this.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "owner",
      });
      this.belongsToMany(models.User, {
        through: models.ServerMemberJunctions,
        foreignKey: "serverId",
        as: "members",
        onDelete: "CASCADE",
      });
    }
  }
  Servers.init(
    {
      serverName: { type: DataTypes.STRING, allowNull: false, unique: true },
      serverTemplate: { type: DataTypes.STRING, allowNull: false },
      serverCommunity: { type: DataTypes.STRING, allowNull: true },
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      serverImage: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Servers",
    }
  );
  return Servers;
};
