const livro = require('../controllers/LivrosController')
const passport = require('passport')

module.exports = (router, koaBody) => {
    router
        .get('/', (ctx, next) => {
            ctx.body = "Hello World"
        })
        //C
        .post('/cadastroLivro', koaBody, passport.authenticate('bearer', { session: false }), livro.cadastrarLivro)

        //R
        .get('/listaLivros', livro.listarTodosLivros)

        .get('/livroCodigo/:codigo', livro.listarLivroComCodigo)

        .get('/livroTitulo/:titulo', livro.listarLivroComTitulo)

        .get('/livroAutor/:autor', livro.listarLivroComAutor)

        //U
        .put('/editarLivro/:codLivro', koaBody, livro.editarLivro)

        //D
        .delete('/excluirLivro/:livroExcluido', passport.authenticate('bearer', { session: false }), livro.excluirLivro)
}