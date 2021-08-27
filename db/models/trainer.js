"use strict";
const bcrypt = require("bcryptjs");
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

      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10); // this generates the salt
            user.password = bcrypt.hashSync(user.password, salt); // this sets the hashed value as the password
          }
        },
        beforeUpdate: async (user) => {
          // add beforeUpdate hook here
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  return Trainer;
};
