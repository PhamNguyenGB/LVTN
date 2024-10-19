'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // color: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'SET NULL',
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      star: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      staffId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};
