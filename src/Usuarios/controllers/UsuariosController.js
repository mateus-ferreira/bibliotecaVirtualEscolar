const database = require('../../database/models')
const { InvalidArgumentError, InternalServerError } = require('../erros/erros')
const cripto = require('../../seguranca/seguranca')
const valida = require('../../seguranca/validacoes')

class UsuariosController {
    //C
    static async cadastrarUsuario(ctx, next) {
        const novoUsuario = ctx.request.body

        try{

            valida.campoStringNaoNulo(novoUsuario.nome, 'nome');
            valida.campoStringNaoNulo(novoUsuario.email, 'email');
            valida.campoStringNaoNulo(novoUsuario.senha, 'senha');
            valida.campoTamanhoMinimo(novoUsuario.senha, 'senha', 8);
            valida.campoTamanhoMaximo(novoUsuario.senha, 'senha', 64);

            const novaSenha = await cripto.gerarSenhaHash(novoUsuario.senha)
            novoUsuario.senha = novaSenha

            ctx.body = await database.Usuarios.create(novoUsuario)
            console.log(ctx.body)
            
            ctx.status = 201
            return ctx.body

        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                ctx.status = 422
                ctx.body =  erro.message
                return erro
                next()

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()
            }
        }   
    };
    //R
    static async verTodosUsuarios(ctx, next){
        try{
            ctx.body = await database.Usuarios.findAll()
            return ctx.body
        }catch(erro){
            ctx.body = erro.message
            next()
        }
    };
    //U
    static async editarUsuarioPorId(ctx, next){
        const { id } = ctx.params
        const dados = ctx.request.body

        try{
            ctx.body = await database.Usuarios.update(dados, {where: { id: Number(id) }})
            console.log(ctx.body)

            ctx.status = 200
            return ctx.body
        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                ctx.status = 422
                ctx.body =  erro.message
                return erro
                next()

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()
            }
        }  
    };

    static async editarUsuarioPorEmail(ctx, next){
        const { email } = ctx.params
        const dados = ctx.request.body

        try{
            ctx.body = await database.Usuarios.update(dados, {where: { email: email }})
            console.log(ctx.body)

            ctx.status = 200
            return ctx.body
        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                ctx.status = 422
                ctx.body =  erro.message
                return erro
                next()

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()
            }
        }  
    };
    //D
    static async apagarUsuarioPorEmail(ctx, next){
        const { email } = ctx.params

        try{
            ctx.body = await database.Usuarios.destroy({where: { email: Number(email) }})
            console.log(ctx.body)

            ctx.status = 200
            return ctx.body
        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                ctx.status = 422
                ctx.body =  erro.message
                return erro
                next()

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()
            }
        }
    };

    static async apagarUsuarioPorId(ctx, next){
        const { id } = ctx.params

        try{
            ctx.body = await database.Usuarios.destroy({where: { id: Number(id) }})
            console.log(ctx.body)

            ctx.status = 200
            return ctx.body
        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                ctx.status = 422
                ctx.body =  erro.message
                return erro
                next()

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
                next()
            }
        }
    }
}

module.exports = UsuariosController