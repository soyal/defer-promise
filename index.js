
function Promise_(fn) {
  this.status = STATUS.pending  // pending fulfilled rejected
  this.resolveHandlers = []
  this.rejectHandlers = []
  this.result = null
  this.errMsg = null

  fn.call(null, this.resolve.bind(this), this.reject.bind(this))
}

Promise_.prototype.fulfilled = function(value) {
  this.result = value
  this.status = STATUS.fulfilled
}

Promise_.prototype.rejected = function(msg) {
  this.errMsg = msg
  this.status = STATUS.rejected
}

Promise_.prototype.resolve = function(value) {
  // 是Promise
  if(value instanceof Promise_) {

  } else {
    this.fulfilled(value)
    if(this.resolveHandlers.length > 0) {
      let handler = this.resolveHandlers.shift()
      handler(value)
    }
  }
}

Promise_.prototype.reject = function() {

}

Promise_.prototype.then = function(resolve, reject) {
  let me = this

  if(this.status === STATUS.fulfilled) {
    let result = resolve(me.result)
  } else if(this.status === STATUS.pending) {
    this.resolveHandlers.push(resolve)
  }

  return new Promise_()
}

const STATUS = {
  fulfilled: "fulfilled",
  rejected: "rejected",
  pending: "pending"
}