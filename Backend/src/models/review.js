'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Review.belongsTo(models.User);
            Review.belongsTo(models.Product);
            Review.belongsTo(models.Comment);
            Review.belongsTo(models.Rep_Comment);
        }
    }

    Review.init({
        productId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        star: DataTypes.INTEGER,
        commentId: DataTypes.INTEGER,
        repCommentId: DataTypes.INTEGER,

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Review',
    });

    return Review;
};
