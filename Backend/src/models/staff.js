'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Staff.hasMany(models.Order);
      Staff.hasMany(models.Rep_Comment);
      Staff.hasMany(models.Event);
      Staff.hasMany(models.List_Product);
      Staff.hasMany(models.Point);
      Staff.hasMany(models.Product);
      Staff.hasMany(models.Image_Home);
    }
  }
  Staff.init({
    fullname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    sex: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,

  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Staff',
  });
  return Staff;
};