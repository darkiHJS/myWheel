const Koa = require('./lib/application')
const app = new Koa()

// app.context.XXXX 可以对ctx对象进行扩展 可以挂在一些常用放，egg就是这么干的

app.use(async ctx => {
  ctx.body = 'hello,' + ctx.query.name
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
