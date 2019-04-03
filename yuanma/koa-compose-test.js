
function fn1(ctx,next){
    console.log('fn1')
    ctx.fn1 = "fn1"
    next()
    return 1
    // console.log('fn1',ctx, next.toString())
    
}

function fn2(ctx,next){
    console.log('fn2 ')
    ctx.fn2 = "fn2"
    next()
    return "fn2"
    // console.log('fn2',ctx, next.toString())
}

const s1 = compose([fn1])

const ctx ={}
const p = s1(ctx,function(ctx,next){
    ctx.last = "last"
    next();
});
console.log(p)
p.then((res)=>console.log(res))

console.log(ctx)



function compose (middleware) {

    return function (context, next) {
      let index = -1
      return dispatch(0)
      function dispatch (i) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
    
        index = i
    
        let fn = middleware[i]
        console.log(i, middleware.length,i === middleware.length)
        //最后一个 中间件的next()执行后i === middleware.length 为true；
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve()
    
        try {
          return Promise.resolve(fn(context, function next () {
            return dispatch(i + 1)
          }))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }