const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const userModel = require('./modelUser');
const categoryModel = require('./modelCategory');

const articleModel = sequelize.define('articles', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl: Sequelize.STRING,
        content: {
            type: Sequelize.BLOB,
        }
    });

    articleModel.belongsTo(userModel, { constraints: true, allowNull: false, onDelete: 'CASCADE' });
    articleModel.belongsTo(categoryModel, { constraints: true, allowNull: false, onDelete: 'CASCADE' });
    module.exports = articleModel;

