const { CampoInvalido } = require('../erros/erros')

module.exports = {
    dadosInvalidos(codigo, titulo, autor, quantidade){
        if(isNaN(codigo) || titulo.length<=0 || autor.length<=0 || quantidade<0){
            throw new CampoInvalido('Campo inválido')
        }
    }
}