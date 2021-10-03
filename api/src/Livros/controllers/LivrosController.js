const { Sequelize } = require('../../database/models')
const database = require('../../database/models')
const Op = Sequelize.Op
const validacoes = require('../validacoes/validacoesLivros')
const { CampoInvalido } = require('../erros/erros')

class LivrosController {
    //C
    static async cadastrarLivro(req, res) {
        const novoLivro = req.body
        try {
            validacoes.dadosInvalidos(novoLivro.codigo,
                novoLivro.titulo,
                novoLivro.autor,
                novoLivro.editora)
            const livro = await database.Livros.create(novoLivro)
            console.log(livro)
            
            res.status(201)
            return res.send(livro).json()
        }catch(erro){
            if(erro instanceof CampoInvalido){
                res.status(400)
                return res.send(erro)
                
            }
            return res.send(erro)
        }
    }
    
    //R
    static async listarTodosLivros(req, res) {
        try {
            res.status(200)
            return res.send(await database.Livros.findAll()).json()
        } catch (erro) {
            res.status(404)
            return res.send(erro).json()
        }
    }

    static async listarLivroComCodigo(req, res) {
        const { codigo } = req.params
        try {
            res.status(200)
            return res.send(await database.Livros.findOne({ where: { codigo: Number(codigo) } })).json()
        } catch (erro) {
            res.status(404)
            return res.send(erro).json()
        }
    }

    static async listarLivroComTitulo(req, res) {
        const { titulo } = req.params
        try {
            res.status(200)
            return res.send(await database.Livros.findAll({ where: { titulo: {[Op.substring]: titulo }}})).json()
        } catch (erro) {
            res.status(404)
            return res.send(erro).json()
        }
    }

    static async listarLivroComAutor(req, res) {
        const { autor } = req.params
        try {
            res.status(200)
            return res.send(await database.Livros.findAll({ where: { autor: {[Op.substring]: autor }}})).json()
        } catch (erro) {
            res.status(404)
            return res.send(erro).json()
        }
    }

    //U
    static async editarLivro(req, res) {
        const { codigo } = req.params
        const dados = req.body
        try {
            /*validacoes.dadosInvalidos(dados.codigo,
                dados.titulo,
                dados.autor,
                dados.editora)*/
            res.status(200)
            return res.send(await database.Livros.update(dados, {where: { codigo: Number(codigo) }})).json()  
        }catch (erro) {
            if(erro instanceof CampoInvalido){
                res.status(400)
                return res.send(erro).json()
                
            }
            return res.send(erro).json()
        }
    }

    //D
    static async excluirLivro(req, res) {
        const { livroExcluido } = req.params
        try {
            res.status(204)
            await database.Livros.destroy({where: { codigo: Number(livroExcluido) }})
            return res.send("Livro Excluído").json()
        } catch(erro){
            res.status(400)
            return res.send(erro).json()
        }
    }

}

module.exports = LivrosController