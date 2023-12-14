"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
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
      salary: DataTypes.INTEGER,
      employmentStatus: DataTypes.STRING,
      employeeStatus: DataTypes.STRING,
      kpi: DataTypes.INTEGER,
      bankAccNum: DataTypes.STRING,
      photo: DataTypes.TEXT,
      leaveQuota: DataTypes.INTEGER,
      alphaQuota: DataTypes.INTEGER,
      warningLetter: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  Employee.beforeCreate((Employee) => {
    Employee.employeeStatus = "Active";
    Employee.kpi = 0;
    Employee.leaveQuota = 12;
    Employee.alphaQuota = 5;
    Employee.warningLetter = 0;
  });
  Employee.beforeSave(async (employee, options) => {
    const today = new Date();
    const endContractDate = new Date(employee.endContractDate);

    const timeDiff = endContractDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Menghitung selisih dalam hari

    if (daysDiff <= 60) {
      employee.employeeStatus = "Warning";
    }
  });
  Employee.beforeUpdate(async (employee, options) => {
    const today = new Date();
    const endContractDate = new Date(employee.endContractDate);

    const timeDiff = endContractDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Menghitung selisih dalam hari

    if (employee.warningLetter === 2) {
      employee.employeeStatus = "Resigned/Fired";
    } else if (employee.warningLetter !== 2) {
      if (employee.employeeStatus !== "Resigned/Fired") {
        if (daysDiff <= 60) {
          employee.employeeStatus = "Warning";
        } else {
          employee.employeeStatus = "Active";
        }
      }
    }
  });
  return Employee;
};
