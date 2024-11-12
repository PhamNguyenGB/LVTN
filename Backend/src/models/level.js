'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Level extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Ví dụ: Level có thể có nhiều Order_Detail nếu có mối quan hệ
            Level.belongsTo(models.Staff);
            Level.belongsToMany(models.Event, {
                through: 'level_event',
                foreignKey: 'levelId',
                otherKey: 'eventId'
            });
            Level.hasMany(models.User);
        }
    }

    Level.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        staffId: DataTypes.INTEGER,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Level',
    });

    return Level;
};
