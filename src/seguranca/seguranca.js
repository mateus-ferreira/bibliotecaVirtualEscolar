const bcrypt = require('bcrypt')

class Seguranca {
    static async gerarSenhaHash(senha){
        return await bcrypt.hash(senha, 12)
    }
}

module.exports = Seguranca