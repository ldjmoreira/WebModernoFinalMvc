const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.controller.user.save)
    app.post('/signin', app.controller.auth.signin)
    app.post('/validateToken', app.controller.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.controller.user.save))
        .get(admin(app.controller.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.controller.user.save))
        .get(admin(app.controller.user.getById))
        .delete(admin(app.controller.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.controller.category.get))
        .post(admin(app.controller.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.controller.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.controller.category.getById)
        .put(admin(app.controller.category.save))
        .delete(admin(app.controller.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.controller.article.get))
        .post(admin(app.controller.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.controller.article.getById)
        .put(admin(app.controller.article.save))
        .delete(admin(app.controller.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.controller.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.controller.stat.get)
}