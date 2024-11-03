'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User);
            Comment.belongsTo(models.Product);
            Comment.hasOne(models.Review);
        }
    }

    Comment.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        content: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Comment',
    });

    return Comment;
};
