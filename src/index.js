require('dotenv').config()
const Koa = require('Koa')
const KoaRouter = require('koa-router')
const app = new Koa()
const router = new KoaRouter()

router.get('/', (ctx, next) => {
    ctx.body = "Hello World"
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(process.env.PORT)

module.exports = app