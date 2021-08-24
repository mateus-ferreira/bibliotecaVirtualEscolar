const usuario = require('../controllers/UsuariosController')

module.exports = (router, koaBody) => {
    router
        //C
        .post('/cadastroUsuario', koaBody, usuario.cadastrarUsuario)

        //R
        .get('/listarUsuarios', usuario.verTodosUsuarios)

        //U
        .put('/editarPorEmail/:email', koaBody, usuario.editarUsuarioPorEmail)

        .put('/editarPorId/:id', koaBody, usuario.editarUsuarioPorId)

        //D
        .delete('/excluirPorEmail/:email', usuario.apagarUsuarioPorEmail)

        .delete('/excluirPorId/:id', usuario.apagarUsuarioPorId)
}