require('dotenv').config();
const Koa = require('Koa');
const app = new Koa();
const rotas = require('./rotas');

rotas(app);

server = app.listen(process.env.PORT);

module.exports = server