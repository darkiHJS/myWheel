/**
 * 二分查找
 * 
 * @param {Array} arr 
 * @param {Any} item 
 */
const binary_search = function(arr, item) {
  let low   = 0
  let high  = arr.length - 1
  while (low <= high) {
    let mid = Math.ceil((low + high) / 2)
    let guess = arr[mid]

    if (guess === item) {
      console.log(low, high, mid, guess, item)
      return mid
    }else if(guess > item) {
      console.log(low, high, mid, guess, item)
      high = mid - 1
    }else {
      console.log(low, high, mid, guess, item)
      low = mid + 1
    }
  }
  return -1
}
 
console.log(binary_search([1,3,3,4,5,5,6,7,7,8,9], 6))
console.log(binary_search(Array.from({length: 128}).map((item,index) => index + 2), 128))