"use strict";
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataUsers = require("../data/users.json");
    dataUsers.forEach((el) => {
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });

    let dataBranches = require("../data/branches.json");
    dataBranches.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    let dataPositions = require("../data/positions.json");
    dataPositions.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    let dataEmployees = require("../data/employees.json");
    dataEmployees.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", dataUsers, {});
    await queryInterface.bulkInsert("Branches", dataBranches, {});
    await queryInterface.bulkInsert("Positions", dataPositions, {});
    await queryInterface.bulkInsert("Employees", dataEmployees, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employees", null, {});
    await queryInterface.bulkDelete("Positions", null, {});
    await queryInterface.bulkDelete("Branches", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
