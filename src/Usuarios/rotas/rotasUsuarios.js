const usuario = require('../controllers/UsuariosController')
const passport = require('koa-passport')

module.exports = (router, koaBody) => {
    router
        //login
        .post('/usuario/login', koaBody, passport.authenticate('bearer', { session: false }), usuario.login)

        //C
        .post('/cadastroUsuario', koaBody, usuario.cadastrarUsuario)

        //R
        .get('/listarUsuarios', usuario.verTodosUsuarios)

        .get('/buscarUsuariosPorEmail/:email', usuario.buscarPorEmail)

        .get('/buscarUsuarioPorId/:id', usuario.buscarPorId)

        //U
        .put('/editarPorEmail/:email', koaBody, usuario.editarUsuarioPorEmail)

        .put('/editarPorId/:id', koaBody, usuario.editarUsuarioPorId)

        //D
        .delete('/excluirPorEmail/:email', passport.authenticate('bearer', { session: false }), usuario.apagarUsuarioPorEmail)

        .delete('/excluirPorId/:id', passport.authenticate('bearer', { session: false }), usuario.apagarUsuarioPorId)
}