"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.belongsToMany(models.User, {
        through: "Employee",
        foreignKey: "JobId",
      });
    }
  }
  Position.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Position name is required",
          },
          notEmpty: {
            msg: "Position name cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};
