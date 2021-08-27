"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainer.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false, // here
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // here
      },
    },
    {
      sequelize,
      modelName: "Trainer",
    }
  );
  return Trainer;
};
