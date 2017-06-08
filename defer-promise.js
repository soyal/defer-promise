const defer = function() {
  let pending = [], value

  return {
    resolve: function(_value) {
      if(pending) {
        value = ref(_value)

        for(let callback of pending) {
          value.then(callback)
        }
        pending = null
      }
    },

    promise: {
      then: function(_callback) {
        let result = defer()

        let callback = function(value) {
          result.resolve(_callback(value))
        }

        if(pending) {
          pending.push(callback)
        } else {
          value.then(callback)
        }

        return result.promise
      }
    }
  }
}

const ref = function(value) {
  if(value && typeof value.then === 'function') {
    return value
  }

  return {
    then: function(_callback) {
      return ref(_callback(value))
    }
  }
}