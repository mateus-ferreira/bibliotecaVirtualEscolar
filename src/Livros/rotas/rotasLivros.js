const livro = require('../controllers/LivrosController')
const router = require('express').Router()
const passport = require('passport')

    router
        .get('/', (req, res) => {
            res.send("Hello World")
        })
        //C
        .post('/cadastroLivro', passport.authenticate('bearer', { session: false }), livro.cadastrarLivro)

        //R
        .get('/listaLivros', passport.authenticate('bearer', { session: false }), livro.listarTodosLivros)

        .get('/livroCodigo/:codigo', passport.authenticate('bearer', { session: false }), livro.listarLivroComCodigo)

        .get('/livroTitulo/:titulo', passport.authenticate('bearer', { session: false }), livro.listarLivroComTitulo)

        .get('/livroAutor/:autor', passport.authenticate('bearer', { session: false }), livro.listarLivroComAutor)

        //U
        .put('/editarLivro/:codLivro',passport.authenticate('bearer', { session: false }), livro.editarLivro)

        .patch('/editarLivro/:codLivro',passport.authenticate('bearer', { session: false }), livro.editarLivro)

        //D
        .delete('/excluirLivro/:livroExcluido', passport.authenticate('bearer', { session: false }), livro.excluirLivro)

module.exports = router