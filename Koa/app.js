const Koa = require('./lib/application')
const app = new Koa()

// app.context.XXXX 可以对ctx对象进行扩展 可以挂在一些常用放，egg就是这么干的

app.use(async (ctx, next) => {
  console.log(1)
  next()
  console.log(6)
})
app.use(async (ctx, next) => {
  console.log(2)
  next()
  console.log(5)
})
app.use(async (ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
