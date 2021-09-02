require('dotenv').config();
const passport = require('koa-passport')
const Local = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const User = require('../Usuarios/controllers/UsuariosController')
const { InvalidArgumentError } = require('../Usuarios/erros/erros')
const bcrypt = require('bcrypt')
const database = require('../database/models')
const jwt = require('jsonwebtoken')


function verificaUsuario(usuario){
    if(!usuario) {
        throw new InvalidArgumentError('Não existe esse usuário')
    }
}

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if(senhaValida){
        const msg = "deu boa"
        return msg
    }
    else{
        throw new InvalidArgumentError('E-mail ou senha inválidos')
    }
}
module.exports = (
    passport.use('local',
        new Local({
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        }, async (email, senha) => {
            try{
                const usuario = await database.Usuarios.findOne({ where: { email: email }})
                verificaUsuario(usuario)
               
                const senhaHash = usuario.senha
                console.log(senhaHash)
                await verificaSenha(this.senha, senhaHash)

                return usuario
            }catch (erro) {
                return erro.message
            }
            
        })
    ),

    passport.use(
        new BearerStrategy(
            async (token, done) => {
                console.log(token)
                try{
                    console.log("token auth")
                    const pl = jwt.verify(token, process.env.SECRETPASS)
                    console.log("pl -",pl)
                    const usuario = await database.Usuarios.findOne({ where: { id: Number(pl.id) }})
                    done(null, usuario)
                }catch(erro){
                    done(erro)
                }
                
            }
        ) 
    )
)