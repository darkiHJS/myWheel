async function m1(next) {
  console.log('m1')
  await next()
}

async function m2(next) {
  console.log('m2')
  await next()
}

async function m3() {
  console.log('m3')
}

function createNext(middleware, oldNext) {
  return async function() {
    await middleware(oldNext)
  }
}

let next1 = createNext(m3, null)
let next2 = createNext(m2, next1)
let next3 = createNext(m1, next2)

next3()