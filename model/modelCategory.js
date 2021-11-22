const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const articleModel = require('./modelArticle');


    const categoryModel = sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    categoryModel.belongsTo(categoryModel, {as: 'parent'}, { constraints: true,  onDelete: 'CASCADE' });
  
    module.exports = categoryModel;




