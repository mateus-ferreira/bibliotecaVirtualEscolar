const database = require('../../database/models')
const { InvalidArgumentError, InternalServerError } = require('../erros/erros')
const cripto = require('../../seguranca/seguranca')
const autenticacao = require('../../seguranca/autenticacao')
const valida = require('../../seguranca/validacoes')
const jwt = require('koa-jwt')

function gerarToken(usuario){
    const payload = { sub: 10 }
    

    const token = jwt.sign(payload, process.env.SECRETPASS)
    return token
}

class UsuariosController {
    //C
    static async cadastrarUsuario(ctx) {
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

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
            }
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

    static async buscarPorEmail(ctx){
        const { email } = ctx.params

        try{
            ctx.body = await database.Usuarios.findOne({ where: { email: email }})
            console.log(ctx.body)
            ctx.status = 200
            return ctx.body
        } catch(erro) {
            ctx.body = erro.message
        }
    };

    static async buscarPorId(ctx) {
        const { id } = ctx.params
        try{
            ctx.body = await database.Usuarios.findOne({ where: { id: Number(id) }})
            console.log(ctx.body)
            ctx.status = 200
            return ctx.body
        } catch(erro) {
            ctx.body = erro.message
        }
    };
    //U
    static async editarUsuarioPorId(ctx){
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

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
            }
        }  
    };

    static async editarUsuarioPorEmail(ctx){
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

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
            }
        }  
    };
    //D
    static async apagarUsuarioPorEmail(ctx){
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

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
            }
        }
    };

    static async apagarUsuarioPorId(ctx){
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

            } else if (erro instanceof InternalServerError) {

                ctx.status = 500
                ctx.body =  erro.message
                return erro

            } else {
                
                ctx.status = 500
                ctx.body =  erro.message
                return erro
            }
        }
    };

    static login(ctx) {
        ctx.body = gerarToken()
        console.log(ctx.body)
        ctx.status = 204
        return ctx.body
    }
}

module.exports = UsuariosController