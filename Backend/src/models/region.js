'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Region extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Region.hasMany(models.Order_Detail);
            Region.belongsTo(models.Staff);
            Region.hasMany(models.Order);

        }
    }
    Region.init({
        name: DataTypes.STRING,
        deliveryFee: DataTypes.INTEGER,
        staffId: DataTypes.INTEGER,

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Region',
    });
    return Region;
};