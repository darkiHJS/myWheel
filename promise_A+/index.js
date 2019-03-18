const MyPromise = require('./promise')
const fs = require('fs')

let p = new MyPromise((resolve, reject) => {
  fs.readFile('./file/1.txt', 'utf-8', (err, data) => {
    err ? reject(err) : resolve(data)
  })
})

let f1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    fs.readFile('./file/2.txt', 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data)
    })
  }, 5000);
})
let f2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    fs.readFile('./file/3.txt', 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data)
    })
  }, 5000);
})

var a = MyPromise.resolve(123)
a.then((v) => console.log(v))