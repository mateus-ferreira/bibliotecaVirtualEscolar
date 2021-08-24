require('dotenv').config();
const Koa = require('Koa');
const app = new Koa();
const rotasLivros = require('./Livros/rotas');
const rotasUsuarios = require('./Usuarios/rotas')

rotasLivros(app);
rotasUsuarios(app)
server = app.listen(process.env.PORT);

module.exports = server