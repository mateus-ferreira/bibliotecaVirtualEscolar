const { Sequelize } = require('../../database/models')
const database = require('../../database/models')
const Op = Sequelize.Op
const validacoes = require('../validacoes/validacoesLivros')
const { CampoInvalido } = require('../erros/erros')

class LivrosController {
    //C
    static async cadastrarLivro(ctx, next) {
        const novoLivro = ctx.request.body
        try {
            validacoes.dadosInvalidos(novoLivro.codigo,
                novoLivro.titulo,
                novoLivro.autor,
                novoLivro.editora)
            ctx.body = await database.Livros.create(novoLivro)
            console.log(ctx.body)
            
            ctx.status = 201
            return ctx.body
        }catch(erro){
            if(erro instanceof CampoInvalido){
                ctx.status = 400
                ctx.body = erro
                return erro
                
            }
            return erro
            next()
        }
    }
    
    //R
    static async listarTodosLivros(ctx, next) {
        try {
            ctx.body = await database.Livros.findAll()
            return ctx.body
        } catch (erro) {
            ctx.body = erro.message
        }
    }

    static async listarLivroComCodigo(ctx, next) {
        const { codigo } = ctx.params
        try {
            ctx.body = await database.Livros.findOne({ where: { codigo: Number(codigo) } })
            return ctx.body
        } catch (erro) {
            ctx.body = erro.message
        }
    }

    static async listarLivroComTitulo(ctx, next) {
        const { titulo } = ctx.params
        try {
            ctx.body = await database.Livros.findAll({ where: { titulo: {[Op.substring]: titulo }}})
            return ctx.body
        } catch (erro) {
            return ctx.body = erro.message
        }
    }

    static async listarLivroComAutor(ctx, next) {
        const { autor } = ctx.params
        try {
            ctx.body = await database.Livros.findAll({ where: { autor: {[Op.substring]: autor }}})
        } catch (erro) {
            return ctx.body = erro.message
        }
    }

    //U
    static async editarLivro(ctx, next) {
        const { codLivro } = ctx.params
        const dados = ctx.request.body
        try {
            /*validacoes.dadosInvalidos(dados.codigo,
                dados.titulo,
                dados.autor,
                dados.editora)*/
            ctx.body = await database.Livros.update(dados, {where: { codigo: Number(codLivro) }})
            console.log(ctx.body)

            ctx.status = 200
            return ctx.body
        }catch (erro) {
            if(erro instanceof CampoInvalido){
                ctx.status = 400
                ctx.body = erro
                return erro
                
            }
            return erro
            next()
        }
    }

    //D
    static async excluirLivro(ctx, next) {
        const { livroExcluido } = ctx.params
        try {
            await database.Livros.destroy({where: { codigo: Number(livroExcluido) }})
            ctx.status = 200
            return ctx.message = "Livro Excluído"
        } catch(erro){
            return ctx.body = erro.message
        }
    }

}

module.exports = LivrosController