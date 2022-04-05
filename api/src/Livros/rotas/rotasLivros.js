const livro = require('../controllers/LivrosController')
const router = require('express').Router()
require('dotenv').config();


    router
        .get('/', (req, res) => {
            res.send("Hello World")
            //res.send("Hello")
            //res.send("World")
        })
        //C
        .post('/cadastroLivro', livro.cadastrarLivro)

        //R
        .get('/listaLivros', livro.listarTodosLivros)

        .get('/livroCodigo/:codigo', livro.listarLivroComCodigo)

        .get('/livroTitulo/:titulo', livro.listarLivroComTitulo)

        .get('/livroAutor/:autor', livro.listarLivroComAutor)

        //U
        .put('/editarLivro/:codLivro',livro.editarLivro)

        .patch('/editarLivro/:codLivro',livro.editarLivro)

        //D
        .delete('/excluirLivro/:codLivro', livro.excluirLivro)

module.exports = router