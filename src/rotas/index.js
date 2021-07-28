const rotasLivros = require('../controllers/rotasLivros');
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
}