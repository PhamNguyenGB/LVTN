'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rep_Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Rep_Comment.belongsTo(models.Comment);
            Rep_Comment.belongsTo(models.Staff);
            Rep_Comment.hasOne(models.Review);

        }
    }

    Rep_Comment.init({
        commentId: DataTypes.INTEGER,
        staffId: DataTypes.INTEGER,
        note: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Rep_Comment',
    });

    return Rep_Comment;
};
