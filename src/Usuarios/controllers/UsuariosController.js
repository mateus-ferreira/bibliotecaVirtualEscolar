const database = require('../../database/models')
const { InvalidArgumentError, InternalServerError } = require('../erros/erros')
const cripto = require('../../seguranca/seguranca')
const autenticacao = require('../../seguranca/autenticacao')
const valida = require('../../seguranca/validacoes')
const jwt = require('jsonwebtoken')

function gerarToken(){
    const payload = { sub: 10 }
    

    const token = jwt.sign(payload, process.env.SECRETPASS)
    console.log("token usuario")
    return token
}

class UsuariosController {
    //C
    static async cadastrarUsuario(req, res) {
        const novoUsuario = req.body

        try{

            valida.campoStringNaoNulo(novoUsuario.nome, 'nome');
            valida.campoStringNaoNulo(novoUsuario.email, 'email');
            valida.campoStringNaoNulo(novoUsuario.senha, 'senha');
            valida.campoTamanhoMinimo(novoUsuario.senha, 'senha', 8);
            valida.campoTamanhoMaximo(novoUsuario.senha, 'senha', 64);

            const novaSenha = await cripto.gerarSenhaHash(novoUsuario.senha)
            novoUsuario.senha = novaSenha

            res.status(201)
            return res.send(await database.Usuarios.create(novoUsuario)).json()

        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {

                res.status(422)
                return res.send(erro).json()

            } else if (erro instanceof InternalServerError) {

                res.status(500)
                return res.send(erro).json()

            } else {
                
                res.status(500)
                return res.send(erro).json()
            }
        }   
    };
    //R
    static async verTodosUsuarios(req, res){
        try{
            return res.send(await database.Usuarios.findAll()).json()
        }catch(erro){
            return res.send(erro).json()
        }
    };

    static async buscarPorEmail(req, res){
        const { email } = req.params

        try{
            res.status(200)
            return res.send(await database.Usuarios.findOne({ where: { email: email }})).json()
            
        } catch(erro) {
            res.status(400)
            return res.send(erro).json()
        }
    };

    static async buscarPorId(req, res) {
        const { id } = req.params
        try{
            res.status(200)
            return res.send(await database.Usuarios.findOne({ where: { id: Number(id) }})).json()

        } catch(erro) {
            res.status(400)
            return res.send(erro).json()
        }
    };
    //U
    static async editarUsuarioPorId(req, res){
        const { id } = req.params
        const dados = req.body

        try{
            res.status(200)
            return res.send(await database.Usuarios.update(dados, {where: { id: Number(id) }})).json()
            
        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {

                res.status(422)
                return res.send(erro).json()

            } else if (erro instanceof InternalServerError) {

                res.status(500)
                return res.send(erro).json()

            } else {
                
                res.status(500)
                return res.send(erro).json()
            }
        }  
    };

    static async editarUsuarioPorEmail(req, res){
        const { email } = req.params
        const dados = req.body

        try{
            res.status(200)
            return res.send(await database.Usuarios.update(dados, {where: { email: email }})).json()
            
        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {

                res.status(422)
                return res.send(erro).json()

            } else if (erro instanceof InternalServerError) {

                res.status(500)
                return res.send(erro).json()

            } else {
                
                res.status(500)
                return res.send(erro).json()
            }
        }  
    };
    //D
    static async apagarUsuarioPorEmail(req, res){
        const { email } = req.params

        try{
            await database.Usuarios.destroy({where: { email: Number(email) }})
            res.status(204)

            return res.send('Usuario excluido').json()

        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {

                res.status(422)
                return res.send(erro).json()

            } else if (erro instanceof InternalServerError) {

                res.status(500)
                return res.send(erro).json()

            } else {
                
                res.status(500)
                return res.send(erro).json()
            }
        }
    };

    static async apagarUsuarioPorId(req, res){
        const { id } = req.params

        try{
            await database.Usuarios.destroy({where: { id: Number(id) }})
            res.status(204)

            return res.send('usuario excluido').json()

        }catch (erro) {
            if (erro instanceof InvalidArgumentError) {

                res.status(422)
                return res.send(erro).json()

            } else if (erro instanceof InternalServerError) {

                res.status(500)
                return res.send(erro).json()

            } else {
                
                res.status(500)
                return res.send(erro).json()
            }
        }
    };

    static login(req, res) {
        const token = gerarToken()
        console.log(token)
        res.status(204)
        return res.send(token)
    }
}

module.exports = UsuariosController