const MyPromise = require('./promise')
const fs = require('fs')

let p = new MyPromise((resolve, reject) => {
  fs.readFile('./file/1.txt', 'utf-8', function(err, data)  {
    err ? reject(err) : resolve(data)
  })
})

let f1 = function(data) {
  console.log(data)
  return new MyPromise((resolve, reject) => {
    fs.readFile('./file/2.txt', 'utf-8', function(err, data)  {
      err ? reject(err) : resolve(data)
    })
  })
}
let f2 = function(data) {
  console.log(data)
  return new MyPromise((resolve, reject) => {
    fs.readFile('./file/3.txt', 'utf-8', function(err, data)  {
      err ? reject(err) : resolve(data)
    })
  })
}
let f3 = function(data) {
  console.log(data)
}

p.then(f1).then(f2).then(f3)
