'use strict';

const { sequelize } = require("../../models/User");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      adm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        select: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING(50),
      },
      telephone: {
        type: Sequelize.STRING(14),
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      password_reset_token: {
        type: Sequelize.STRING(250),
        select: false
      },
      password_reset_expires: {
        type: Sequelize.DATE,
        select: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
