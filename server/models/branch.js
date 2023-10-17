"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Branch.belongsToMany(models.User, {
        through: "Employee",
        foreignKey: "BranchId",
      });
    }
  }
  Branch.init(
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
            msg: "Branch name is required",
          },
          notEmpty: {
            msg: "Branch name cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Branch",
    }
  );
  return Branch;
};
