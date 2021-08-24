const rotasUsuarios = require('../Usuarios/rotas/rotasUsuarios');
const rotasLivros = require('../Livros/rotas/rotasLivros')
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
    
module.exports = (app) =>{
    app
        .use(router.routes())
        .use(router.allowedMethods())
        .use(bodyParser())
        .use(koaBody())

    rotasLivros(router, koaBody());
    rotasUsuarios(router, koaBody());
}