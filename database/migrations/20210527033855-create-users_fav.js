'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_favorites', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "products", key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "users", key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('users_favorites');
  }
};
