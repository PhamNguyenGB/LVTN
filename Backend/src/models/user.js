'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order);
      User.hasMany(models.Review);
      User.hasMany(models.Comment);
      User.belongsToMany(models.Event, {
        through: models.Used_Event, // Bảng liên kết
        foreignKey: 'userId', // Khóa ngoại của bảng User trong bảng Used_Event
        otherKey: 'eventId', // Khóa ngoại của bảng Event trong bảng Used_Event
      });
      User.belongsTo(models.Level);
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    sex: DataTypes.STRING,
    address: DataTypes.STRING,
    point: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    levelId: DataTypes.INTEGER,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};