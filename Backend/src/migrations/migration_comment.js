'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            content: {
                type: Sequelize.TEXT,
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
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Comment');
    }
};
