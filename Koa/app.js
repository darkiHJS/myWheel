const Koa = require('./lib/application')
const app = new Koa()

app.use((req, res) => {
  res.writeHead(200)
  res.end('hello world')
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
