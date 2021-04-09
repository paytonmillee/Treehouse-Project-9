"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Courses extends Model {}
  Courses.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title required",
          },
          notEmpty: {
            msg: "Title required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description required",
          },
          notEmpty: {
            msg: "Description required",
          },
        },
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  //Model association
  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, { foreignKey: "userId" });
  };
  return Courses;
};
