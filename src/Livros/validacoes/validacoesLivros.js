const { CampoInvalido } = require('../erros/erros')

module.exports = {
    dadosInvalidos(codigo, titulo, autor, editora){
        if(isNaN(codigo) || titulo.length<=0 || autor.length<=0 || editora.length<=0){
            throw new CampoInvalido('Campo inválido')
        }
    }
}