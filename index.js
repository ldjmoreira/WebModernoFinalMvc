const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
const sequelize = require('./sequelize');

const userModel = require('./model/modelUser');
const articleModel = require('./model/modelArticle');
const categoryModel = require('./model/modelCategory');

app.sequelize = sequelize
require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./controller/validation.js')
    .then('./controller')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

    sequelize
    .sync()
    /*
    .then(result => {
      return userModel.findById(1);
      // console.log(result);
    })
    .then(userModel2 => {
      console.log(userModel2)
      if (!userModel2) {
        return userModel.create({ name: 'lorion', email: 'lorion@mail.com', password:'lorion' });
      }
      return userModel;
    })
    */
    .then(userModel2 => {
      app.listen(4000);
      console.log('Backend executando na porta 4000...')
    })
    .catch(err => {
      console.log(err);
    });
  

