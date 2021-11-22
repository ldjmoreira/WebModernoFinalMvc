const Sequelize = require('sequelize');
const sequelize = require('../sequelize');


const userModel = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: Sequelize.BOOLEAN,
      deletedAt: Sequelize.TIME,
    });

    module.exports = userModel;
