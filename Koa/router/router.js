const path = require('path')
const methods = require('http').METHODS
// private
const PREFIX = Symbol('router.prefix')
const OPTIONS = Symbol('router.options')
const MIDDLEWARES = Symbol('router.middlewares');
const VERB = Symbol('router#verb')

function Router(opts) {
  this[OPTIONS] = opts
  this[PREFIX] = '/' 
  this[MIDDLEWARES] = []
}

Router.prototype.prefix = function(prefix) {
  this[PREFIX] = prefix
  return this
}

Router.prototype.use = function(...middlewares) {
  this[MIDDLEWARES].push(...middlewares)
  return this
}

Router.prototype[VERB] = function(method, router, ...callbacks) {
  router = /^\//.test(router)
  ? path.resolve(this[PREFIX], '.' + router)
  : path.resolve(this[PREFIX], router)
  
  callbacks = callbacks.map(callback => {
  
  })
}

methods.forEach(function (method){
  Router.prototype[method] = function(name, path, middleware) {
    var middleware
    // 防止name没有被传入的情况发生
    if(typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2)
    } else {
      middleware = Array.prototype.slice.call(arguments, 1)
      path = name
      name = null
    }
    // 注册路由
    this.register(path, [method], middleware, {
      name
    })
    return this
  }
})


module.exports = Router