class CampoInvalido extends Error {
    constructor (mensagem){
        super(mensagem)
        this.name = 'CampoInvalido'
    }
}

module.exports = { CampoInvalido }