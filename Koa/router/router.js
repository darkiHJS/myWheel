const path = require('path')

// private
const PREFIX = Symbol('router.prefix')
const SERVER = Symbol('router.server')
const MIDDLEWARES = Symbol('router.middlewares');
const VERB = Symbol('router#verb')

function Router(server) {
  this[SERVER] = server
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
    if
  })
  

}


module.exports = Router