'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Used_Event', {
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE', // Xóa bản ghi liên quan khi bản ghi trong bảng Event bị xóa
                primaryKey: true, // Đặt làm khóa chính
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onDelete: 'SET NULL', // Xóa bản ghi liên quan khi bản ghi trong bảng User bị xóa
                primaryKey: true, // Đặt làm khóa chính
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

        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['eventId', 'userId']
                }
            ]
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Used_Event');
    }
};
