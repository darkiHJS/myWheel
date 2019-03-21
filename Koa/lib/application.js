const http = require('http')

class Application {
  
  constructor () {
    this.callbackFunc
  }

  listen(...args) {
    let server = http.createServer(this.callback())
    server.listen(...args)
  }

  use(fn) {
    this.callbackFunc = fn
  }

  callback() {
    return (req, res) => {
      this.callbackFunc(req, res)
    }
  }
}

module.exports = Application