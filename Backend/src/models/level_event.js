'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Level_Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Ví dụ: Level_Event có thể có nhiều Order_Detail nếu có mối quan hệ
        }
    }

    Level_Event.init({
        levelId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Level_Event',
    });

    return Level_Event;
};
