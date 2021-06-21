const rotasLivros = require("./rotasLivros");
const KoaRouter = require('koa-router');
const router = new KoaRouter();
    
module.exports = (app) =>{
    app
        .use(router.routes())
        .use(router.allowedMethods())

    rotasLivros(router);
}