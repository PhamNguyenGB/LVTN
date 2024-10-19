'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Review', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
            },
            star: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            commentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            repCommentId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Review');
    }
};
