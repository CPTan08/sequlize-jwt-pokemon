"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Pokemons", "trainerId", {
      type: 'INTEGER USING CAST("trainerId" as INTEGER)',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Pokemons", "trainerId", {
      type: Sequelize.STRING,
    });
  },
};
