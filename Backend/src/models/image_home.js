'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image_Home extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Ví dụ: Image_Home có thể có nhiều Order_Detail nếu có mối quan hệ
            Image_Home.belongsTo(models.Staff);
        }
    }

    Image_Home.init({
        url: DataTypes.STRING,
        description: DataTypes.STRING,
        staffId: DataTypes.INTEGER,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Image_Home',
    });

    return Image_Home;
};
