const bcrypt = require('bcrypt-nodejs')
const User = require('../model/modelUser')
const sequelize = require('../sequelize');
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.controller.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
       
        const passed = await User.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'qtd']]
          })

          
          if (passed[0].dataValues.qtd >= 1){

            if(!req.originalUrl.startsWith('/users')) user.admin = false
            if(!req.user || !req.user.admin) user.admin = false
        }else {
            user.admin = true
        }

        try {

            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            const emailverification = await  User.findAll({ where: { email: user.email } })
            if (!emailverification.length === 0){
             //   throw "email já cadastrado"
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)

        if(user.id) {
            User.create(
                { 
                id: user.id,
                name: user.name, 
                email: user.email,
                password:user.password,
                admin: user.admin
        
              })     
              .then(_ => res.status(204).send())
              .catch(err => res.status(500).send(err))
        } else {
            User.create(
                { 
                name: user.name, 
                email: user.email,
                password:user.password,
                admin: user.admin
        
              })     
              .then(_ => res.status(204).send())
              .catch(err => res.status(500).send(err))
        }


    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}