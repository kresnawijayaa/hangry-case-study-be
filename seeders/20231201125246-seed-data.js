"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const locations = require("../data/locations.json").map((location) => {
      location.createdAt = location.updatedAt = new Date();
      return location;
    });
    await queryInterface.bulkInsert("Locations", locations, {});

    const menus = require("../data/menus.json").map((menu) => {
      menu.createdAt = menu.updatedAt = new Date();
      return menu;
    });
    await queryInterface.bulkInsert("Menus", menus, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
