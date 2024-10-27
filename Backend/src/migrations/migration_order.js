'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
      staffId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shipperId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payOnlineCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      statusPay: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Order');
  }
};
