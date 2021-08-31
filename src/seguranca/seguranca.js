const bcrypt = require('bcrypt')
const { InvalidArgumentError } = require('../Usuarios/erros/erros')

class Seguranca {
    static async gerarSenhaHash(senha){
        return await bcrypt.hash(senha, 12)
    }
}

module.exports = Seguranca