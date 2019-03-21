const EventEmitter  = require('events')
const http          = require('http')
const context       = require('./context')
const request       = require('./request')
const response      = require('./response')

class Application {
  /**
   * 构造函数
   */
  constructor () {
    this.middlewares = []
    this.context = context
    this.request = request
    this.response = response
  }
  /**
   * 开启 http server并传入回调方法
   */
  listen(...args) {
    let server = http.createServer(this.callback())
    server.listen(...args)
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }
  /**
   * 中间件的合并方法，将中间件合并成一个中间件
   * @return {Function}
   */
  compose() {
    // 将middlewares合并为一个函数， 该函数接受一个ctx对象
    return async ctx => {
      
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }

      let len = this.middlewares.length
      let next = async () => {
        return Promise.resolve()
      }
      for (let i = len - 1; i >= 0; i--) {
        let currentMiddleware = this.middlewares[i]
        next = createNext(currentMiddleware, next)
      }

      await next()
    }
  }

  /**
   * 获取 http所需的callback函数
   * @return {Function} fn
   */
  callback() {
    return (req, res) => {
      let ctx = this.createContext(req, res)
      let respond = () => this.reponseBody(ctx)
      let fn = this.compose()
      // 捕获中间件异常 进行error降级
      let onerror = (err) => this.onerror(err, ctx)
      return fn(ctx).then(respond).catch(onerror)
    }
  }

  createContext(req, res) {
    let ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  reponseBody(ctx) {
    let content = ctx.body
    if(typeof content === 'string') {
      ctx.res.end(content)
    }else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content))
    }
  }

  /**
   * 错误处理
   * @param {Object} err Error对象
   * @param {Object} ctx ctx对象
   */
  onerror(err, ctx) {
    if(err.code === 'ENOENT') {
      // ENOENT 没有这样的文件或者目录
      ctx.state = 404 
    }else {
      ctx.state = 500
    }
    let msg = err.message || 'Internal error'
    ctx.res.end(msg)
    this.emit('error', err)
  }
}

module.exports = Application