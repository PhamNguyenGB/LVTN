'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Point', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            staffId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'SET NULL',
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            point: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable('Point');
    }
};
