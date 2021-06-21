const { Sequelize } = require('../database/models')
const database = require('../database/models')
const Op = Sequelize.Op

class LivrosController {
    //C
    static async cadastrarLivro(ctx, next) {
        const novoLivro = ctx.request.body
        try {
            ctx.body = await database.Livros.create(novoLivro)
            console.log(ctx.body)
            ctx.status = 201
            return ctx.body
        }catch(erro){
            return ctx.body = erro.message
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

}

module.exports = LivrosController