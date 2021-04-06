"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const models = require("./index");
module.exports = (sequelize) => {
  class Users extends Model {}
  Users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name required",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Invalid email." },
          notNull: { msg: "The email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: "Minimum password length is 6 characters",
          },
          notEmpty: {
            args: [true],
            msg: "Please enter a password",
          },
          notNull: {
            args: [true],
            msg: "Please enter a password",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) =>
          (user.password = await bcrypt.hash(user.password, 10)),
      },
      sequelize,
      modelName: "Users",
    }
  );
  //Model Associations
  Users.associate = (models) => {
    Users.hasMany(models.Courses, { foreignKey: "userId" });
  };
  return Users;
};
