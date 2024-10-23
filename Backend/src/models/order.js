'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
      Order.belongsTo(models.Staff);
      Order.hasMany(models.Order_Detail);
      Order.belongsTo(models.Region);
      Order.belongsTo(models.Shipper);
      Order.belongsTo(models.Event);
    }
  }
  Order.init({
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    staffId: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER,
    regionId: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    shipperId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    status: DataTypes.STRING,
    orderCode: DataTypes.STRING,
    payOnlineCode: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Order',
  });
  return Order;
};