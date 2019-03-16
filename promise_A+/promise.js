function MyPromise(fn) {
  let self          = this;         // 固定 current this
  self.value        = null;         // 成功返回值
  self.error        = null;         // 失败信息
  self.onFulfilled  = null;         // succeed callback
  self.onRejected   = null;         // failure callback

  function resolve(value) {
    setTimeout(() => {
      self.value = value;
      self.onFulfilled(self.value);   // resolve执行成功时回调
    })
  }

  function rejected(error) {
    setTimeout(() => {
      self.error = error;
      self.onRejected(self.value);    // reject时执行失败回调
    })
  }
  fn(resolve, rejected)
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  this.onFulfilled = onFulfilled
  this.onRejected = onRejected
}

module.exports = MyPromise;
