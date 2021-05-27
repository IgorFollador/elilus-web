'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    id_category: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: "product_category", key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    path_image: {
      type: Sequelize.STRING(500)
    },
    description: {
      type: Sequelize.STRING(250)
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
    await queryInterface.dropTable('products');
  }
};
