'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Point extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Point.belongsTo(models.Staff);
        }
    }

    Point.init({
        staffId: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        point: DataTypes.INTEGER,
        description: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Point',
    });

    return Point;
};
