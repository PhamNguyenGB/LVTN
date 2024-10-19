'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sold_Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Sold_Product.belongsTo(models.Product);
        }
    }
    Sold_Product.init({
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        description: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Sold_Product',
    });
    return Sold_Product;
};