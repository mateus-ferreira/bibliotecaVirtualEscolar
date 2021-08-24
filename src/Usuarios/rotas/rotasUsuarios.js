const usuario = require('../controllers/UsuariosController')

module.exports = (router, koaBody) => {
    router
        //C
        .post('/cadastroUsuario', koaBody, usuario.cadastrarUsuario)

        //R
        .get('/listarUsuarios', usuario.verTodosUsuarios)
}