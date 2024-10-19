'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Used_Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Used_Event.init({
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Used_Event',
    });

    return Used_Event;
};
