'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shipper extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Shipper.hasMany(models.Order);
        }
    }
    Shipper.init({
        fullname: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        sex: DataTypes.STRING,
        phone: DataTypes.STRING,
        avatar: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Shipper',
    });
    return Shipper;
};