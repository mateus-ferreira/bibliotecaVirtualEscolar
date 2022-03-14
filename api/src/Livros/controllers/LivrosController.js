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
            
            return res.status(201).json(livro)
        }catch(erro){
            if(erro instanceof CampoInvalido){
                return res.status(400).json(erro)
            }
            return res.send(erro)
        }
    }
    
    //R
    static async listarTodosLivros(req, res) {
        try {
            return res.status(200).json(await database.Livros.findAll())
        } catch (erro) {
            return res.status(404).json(erro)
        }
    }

    static async listarLivroComCodigo(req, res) {
        const { codigo } = req.params
        try {
            return res.status(200).json(await database.Livros.findOne({ where: { codigo: Number(codigo) } }))
        } catch (erro) {
            return res.status(404).json(erro)
        }
    }

    static async listarLivroComTitulo(req, res) {
        const { titulo } = req.params
        try {
            return res.status(200).json(await database.Livros.findAll({ where: { titulo: {[Op.substring]: titulo }}}))
        } catch (erro) {
            return res.status(404).json(erro)
        }
    }

    static async listarLivroComAutor(req, res) {
        const { autor } = req.params
        try {
            return res.status(200).json(await database.Livros.findAll({ where: { autor: {[Op.substring]: autor }}}))
        } catch (erro) {
            return res.status(404).json(erro)
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
            return res.status(200).json(await database.Livros.update(dados, {where: { codigo: Number(codigo) }}))
                }catch (erro) {
            if(erro instanceof CampoInvalido){
                return res.status(400).json(erro)
            }
            return res.status(400).json(erro)
        }
    }

    //D
    static async excluirLivro(req, res) {
        //const { livroExcluido } = req.params.codLivro
        try {
            await database.Livros.destroy({where: { codigo: Number(req.params.codLivro) }})
            return res.status(204).send("Livro Excluído")
        } catch(erro){
            return res.status(400).json(erro)
        }
    }

}

module.exports = LivrosController