// 定义三种状态
const PENDING   = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED  = 'rejectend'

function MyPromise(fn) {
  let self                    = this      // 固定 current this
  self.value                  = null      // 成功返回值
  self.error                  = null      // 失败信息
  self.status                 = PENDING   // 初始化状态
  self.onFulfilledCallbacks   = []        // succeed callback
  self.onRejectedCallbacks    = []        // failure callback

  function resolve(value) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = FULFILLED
        self.value = value
        self.onFulfilledCallbacks.forEach((callback) => callback(self.value))
      }, 0)
    }
  }

  function rejected(error) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = REJECTED
        self.error = error
        self.onRejectedCallbacks.forEach((callback) => callback(self.error))
      }, 0)
    }
  }
  fn(resolve, rejected)
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this
  let bridgePromise
  // 防止没有传入回调方法的情况
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
  if (self.status === FULFILLED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      }, 0);
    })
  }
  if (self.status === REJECTED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      }, 0);
    })
  }
  if (self.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }
  return this
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

function resolvePromise(bridgePromisem, x, resolve, reject) {
  if (x instanceof MyPromise) {
    if(x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromisem, y, resolve, reject)
      }, error => {
        reject(error)
      })
    }else {
      x.then(resolve, reject)
    }
  } else {
    resolve(x)
  }
}

module.exports = MyPromise;
