"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.User, { foreignKey: "UserId" });
      Employee.belongsTo(models.Branch, { foreignKey: "BranchId" });
      Employee.belongsTo(models.Position, { foreignKey: "JobId" });
    }
  }
  Employee.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Employee's name is required",
          },
          notEmpty: {
            msg: "Employee's name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Employee's email is required",
          },
          notEmpty: {
            msg: "Employee's email cannot be empty",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      BranchId: DataTypes.INTEGER,
      JobId: DataTypes.INTEGER,
      startContractDate: DataTypes.DATE,
      endContractDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
