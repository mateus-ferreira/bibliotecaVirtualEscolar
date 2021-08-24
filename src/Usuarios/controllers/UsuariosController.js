const database = require('../../database/models')
const { InvalidArgumentError, InternalServerError } = require('../erros/erros')

class UsuariosController {
    //C
    static async cadastrarUsuario(ctx, next) {
        const novoUsuario = ctx.request.body

        try{
            ctx.body = await database.Usuarios.create(novoUsuario)
            console.log(ctx.body)
            ctx.status = 201
            return ctx.body

        } catch (erro) {

            /*if (erro instanceof InvalidArgumentError) {
                ctx.status = 422
                ctx.body =  erro.message
                next()

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                next()

            } else {*/
                
                ctx.status = 500
                ctx.body =  erro.message
                next()
            //}
        }   
    };
    //R
    static async verTodosUsuarios(ctx){
        try{
            ctx.body = await database.Usuarios.findAll()
            return ctx.body
        }catch(erro){
            ctx.body = erro.message
        }
    };
}

module.exports = UsuariosController