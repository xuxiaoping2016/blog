const Koa = require("koa");
const app = new Koa();

app.use(async (ctx,next) => {
    console.log('第一个中间件')
    next();
})
app.use(async (ctx,next) => {
    console.log('第二个中间件')
    // next();
})

app.use((ctx,next) => {
    console.log('第三个中间件')
    next();
})


app.use(async (ctx,next) => {
    console.log(ctx)
    ctx.body = 'hello xuxiaoping'
})
app.listen(9999)