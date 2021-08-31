require('dotenv').config();
const passport = require('koa-passport')
const Local = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const User = require('../Usuarios/controllers/UsuariosController')
const { InvalidArgumentError } = require('../Usuarios/erros/erros')
const bcrypt = require('bcrypt')
const database = require('../database/models')
const jwt = require('koa-jwt')


function verificaUsuario(usuario){
    if(!usuario) {
        throw new InvalidArgumentError('Não existe esse usuário')
    }
}

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if(!senhaValida){
        throw new InvalidArgumentError('E-mail ou senha inválidos')
    }
}
module.exports = (
    passport.use('local',
        new Local({
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        }, async (email, senha, done) => {
            try{
                const usuario = await database.Usuarios.findOne({ where: {email: email}})
                verificaUsuario(usuario)
                await verificaSenha(senha, usuario.senha)

                done(null, usuario)
            }catch (erro) {
                done(erro)
            }
            
        })
    ),

    passport.use(
        new BearerStrategy(
            async (token, done) => {
                try{
                    const payload = jwt.verify(token, process.env.SECRETPASS)
                    const usuario = await User.buscarPorId(payload.id)
                    done(null, usuario)
                }catch(erro){
                    done(erro)
                }
                
            }
        ) 
    )
)