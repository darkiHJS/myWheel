/**
 * divide and conquer (D&C)
 * 分而治之
 */

// 分而治之 递归调用

// 递归相加
function sum(arr) {
  if(!arr.length) return 0
  let sumArr = [...arr]
  return sumArr.shift() + sum(sumArr)
}

// 递归算长
function count(arr) {
  if(!arr.length) return 0
  let sumArr = [...arr]
  sumArr.shift()
  return 1 + count(sumArr)
}

// 递归找最大
function max(arr) {
  if(arr.length === 1) return arr[0]
  let sumArr = [...arr]
  let a = sumArr.shift()
  if (a > sumArr[sumArr.length - 1]) {
    sumArr[sumArr.length - 1] = a
  }
  return max(sumArr)
}

/**
 * quick sort 快速排序
 */
let s = 0

function quicksort(list) {
  if(list.length < 2) return list
  s++
  let reference = list[Math.floor(Math.random()*list.length)] 
  let less = []
  let greater = []
  list.slice(1).forEach(element => {
    if (element <= reference){
      less.push(element)
    }else{
      greater.push(element)
    }
  });
  return [...quicksort(less), reference, ...quicksort(greater)]
} 


const test = () => {
  console.log(sum([1,1,1,1,1,3,8,3,4,5,7,5,6,5,7,5,8,8,9,9,6,8,6,8,8]))
  console.log(count([1,1,1,1,1,3,8,3,4,5,7,5,6,5,7,5,8,8,9,9,6,8,6,8,8]))
  console.log(max([1,1,1,17,1,3,8,3,4,5,7,5,6,5,7,5,8,8,9,9,6,8,6,8,8]))
  console.log(quicksort([1,1,1,17,1,3,8,3,4,5,7,5,6,5,7,5,8,8,9,9,6,8,6,8,8]))
}
