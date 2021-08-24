const usuarios = require('../controllers/UsuariosController')

module.exports = (router, koaBody) => {
    router
        //C
        .post('/cadastrarUsuario', usuarios.cadastrarUsuario)

        //R
        .get('/listarUsuarios', usuarios.verTodosUsuarios)
}