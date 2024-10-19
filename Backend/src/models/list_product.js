'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class List_Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            List_Product.hasMany(models.Product);
            List_Product.belongsTo(models.Staff);
        }
    }
    List_Product.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        staffId: DataTypes.INTEGER,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'List_Product',
    });
    return List_Product;
};