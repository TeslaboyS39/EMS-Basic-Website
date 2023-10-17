"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Employee's full name is required",
          },
          notEmpty: {
            msg: "Employee's full name cannot be empty",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
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
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      BranchId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Branches",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      JobId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Positions",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      startContractDate: {
        type: Sequelize.DATE,
      },
      endContractDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
