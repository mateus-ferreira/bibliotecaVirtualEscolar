module.exports = (router) => {
    router.get('/', (ctx, next) => {
        ctx.body = "Hello World"
    })
}