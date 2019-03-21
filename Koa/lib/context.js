let proto = {}

function delegateSet(property, name) {
  proto.__defineSetter__(name, function (val) {
    this[property][name] = val
  })
}

function delegateGet(property, name) {
  proto.__defineGetter__(name, function (val) {
    return this[property][name]
  })
}

const requestSet = []
const requestGet = ['query']

const responseSet = ['body', 'status']
const responseGet = responseSet

requestSet.forEach(ele => {
  delegateSet('request', ele)
})

requestGet.forEach(ele => {
  delegateGet('request', ele)
})

responseSet.forEach(ele => {
  delegateSet('response', ele)
})

responseGet.forEach(ele => {
  delegateGet('response', ele)
})

module.exports = proto