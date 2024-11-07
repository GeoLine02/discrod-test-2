"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FriendRequests extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "senderId", as: "Sender" });
      this.belongsTo(models.User, { foreignKey: "receiverId", as: "Receiver" });
    }
  }
  FriendRequests.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      senderId: { type: DataTypes.INTEGER, allowNull: false },
      receiverId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    },

    {
      sequelize,
      modelName: "FriendRequests",
    }
  );
  return FriendRequests;
};
