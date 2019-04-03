const Koa = require("koa")

const app = new Koa();

const tpl = require("./tpl")

app.use(async function(ctx,next){
    ctx.type=""
    ctx.body = tpl.normal
})

app.listen(4455)