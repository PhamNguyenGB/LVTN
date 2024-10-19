'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Detail.belongsTo(models.Order);
      Order_Detail.belongsTo(models.Product);
    }
  }
  Order_Detail.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Order_Detail',
  });
  return Order_Detail;
};