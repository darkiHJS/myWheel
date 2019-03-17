const MyPromise = require('./promise')

let p = new MyPromise((resolve, reject) => {
  resolve('同步执行')
}).then((v) => {
  console.log(v)
}).then((v) => {
  console.log("v" + v)
})