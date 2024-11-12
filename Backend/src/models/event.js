'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Ví dụ: Event có thể có nhiều Order_Detail nếu có mối quan hệ
            Event.belongsToMany(models.User, {
                through: models.Used_Event, // Bảng liên kết
                foreignKey: 'eventId', // Khóa ngoại của bảng Event trong bảng Used_Event
                otherKey: 'userId', // Khóa ngoại của bảng User trong bảng Used_Event
            });
            Event.hasMany(models.Order);
            Event.belongsTo(models.Staff);
            Event.belongsToMany(models.Level, {
                through: 'level_event',
                foreignKey: 'eventId',
                otherKey: 'levelId'
            });
        }
    }

    Event.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        discount: DataTypes.INTEGER,
        maximum: DataTypes.INTEGER,
        staffId: DataTypes.INTEGER,
        expiryDate: DataTypes.DATE,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Event',
    });

    return Event;
};
