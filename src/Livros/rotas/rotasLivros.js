const livro = require('../controllers/LivrosController')
const router = require('express').Router()

    router
        .get('/', (req, res) => {
            res.send("Hello World")
        })
        //C
        .post('/cadastroLivro', /*passport.authenticate('bearer', { session: false }),*/ livro.cadastrarLivro)

        //R
        .get('/listaLivros', livro.listarTodosLivros)

        .get('/livroCodigo/:codigo', livro.listarLivroComCodigo)

        .get('/livroTitulo/:titulo', livro.listarLivroComTitulo)

        .get('/livroAutor/:autor', livro.listarLivroComAutor)

        //U
        .put('/editarLivro/:codLivro', livro.editarLivro)

        //D
        .delete('/excluirLivro/:livroExcluido', /*passport.authenticate('bearer', { session: false }),*/ livro.excluirLivro)

module.exports = router