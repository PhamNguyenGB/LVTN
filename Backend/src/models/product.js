'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.List_Product);
      Product.belongsTo(models.Staff);
      Product.hasMany(models.Order_Detail);
      Product.hasMany(models.Review);
      Product.hasMany(models.Comment);

    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.STRING,
    // color: DataTypes.JSON,
    origin: DataTypes.STRING,
    listProductId: DataTypes.INTEGER,
    images: DataTypes.JSON,
    star: DataTypes.FLOAT,
    discount: DataTypes.INTEGER,
    staffId: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Product',
  });
  return Product;
};