const usuario = require('../controllers/UsuariosController')
const router = require('express').Router()

    router
        //login
        .post('/usuario/login', usuario.login)

        //C
        .post('/cadastroUsuario', usuario.cadastrarUsuario)

        //R
        .get('/listarUsuarios', usuario.verTodosUsuarios)

        .get('/buscarUsuariosPorEmail/:email', usuario.buscarPorEmail)

        .get('/buscarUsuarioPorId/:id', usuario.buscarPorId)

        //U
        .put('/editarPorEmail/:email', usuario.editarUsuarioPorEmail)

        .put('/editarPorId/:id', usuario.editarUsuarioPorId)

        //D
        .delete('/excluirPorEmail/:email', /*passport.authenticate('bearer', { session: false }),*/ usuario.apagarUsuarioPorEmail)

        .delete('/excluirPorId/:id', /*passport.authenticate('bearer', { session: false }),*/ usuario.apagarUsuarioPorId)

module.exports = router