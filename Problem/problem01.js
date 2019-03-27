function func1(cb) {
  setTimeout(function () {
    console.log(1);
    cb();
  }, 400)
}


function func2(cb) {
  setTimeout(function () {
    console.log(2)
    cb();
  }, 300)
}

function func3(cb) {
  setTimeout(function () {
    console.log(3)
    cb();
  }, 100)

}

queue([func1, func2, func3], 2) // 2 1 3

/**
 * 
 * @param {Array} funcs 并发的任务列表 
 * @param {Number} num  同时并发数
 */

function queue(funcs, num) {
  function Queue(fus, n) {
    let self = this
    self.fulfilled = 0
    self.taskList = [...fus]
    function cb() {
      self.fulfilled++
      if(self.fulfilled >= n) {
        self.fulfilled = 0
        fire()
      }
    }
    function fire() {
      let a = 0
      while(a < n) {
        if(self.taskList.length > 0){
          let fn = self.taskList.shift()
          fn(cb)
        }
        a++
      }
    }
    fire()
  }
  return new Queue(funcs, num)
}
