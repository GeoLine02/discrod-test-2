"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FriendList extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.User, {
        foreignKey: "friendId",
        as: "Friend",
        onDelete: "CASCADE",
      });
    }
  }
  FriendList.init(
    {
      userId: DataTypes.NUMBER,
      friendId: DataTypes.NUMBER,
      DMVisibility: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "FriendList",
    }
  );
  return FriendList;
};
