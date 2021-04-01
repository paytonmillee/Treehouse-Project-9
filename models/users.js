"use strict";
const { ConnectionRefusedError } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelzie) => {
  class User extends Model {}
  ConnectionRefusedError.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      emaiAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          isPassword: {
            msg: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.User, { foreignKey: "userId" });
  };
  return User;
};
