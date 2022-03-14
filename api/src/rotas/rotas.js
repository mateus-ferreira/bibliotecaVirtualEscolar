//const rotasUsuarios = require('../Usuarios/rotas/rotasUsuarios');
const rotasLivros = require('../Livros/rotas/rotasLivros');
const bodyParser = require('body-parser')

    
module.exports = (app) =>{
    app
        
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended: false}))
        .use(rotasLivros)
        //.use(rotasUsuarios)


        .get('/', (req, res) => {(res.send("hello world"))})
}