"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServerMemberJunctions extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.Servers, { foreignKey: "serverId", as: "server" });
    }
  }
  ServerMemberJunctions.init(
    {
      serverId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "ServerMemberJunctions",
    }
  );
  return ServerMemberJunctions;
};
