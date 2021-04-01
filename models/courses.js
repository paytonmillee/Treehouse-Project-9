"use strict";
const { ConnectionRefusedError } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelzie) => {
  class Course extends Model {}
  ConnectionRefusedError.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title required",
          },
        },
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description required",
          },
        },
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  Course.associate = (models) => {
    Course.belongsTo(models.Course, { foreignKey: "userId" });
  };
  return Course;
};
