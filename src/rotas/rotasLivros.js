const livro = require('../controllers/LivrosController')

module.exports = (router, koaBody) => {
    router
        .get('/', (ctx, next) => {
            ctx.body = "Hello World"
        })
        //C
        .post('/cadastroLivro', koaBody, livro.cadastrarLivro)

        //R
        .get('/listaLivros', livro.listarTodosLivros)

        .get('/livroCodigo/:codigo', livro.listarLivroComCodigo)

        .get('/livroTitulo/:titulo', livro.listarLivroComTitulo)

        .get('/livroAutor/:autor', livro.listarLivroComAutor)
}