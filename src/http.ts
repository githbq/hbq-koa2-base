
const http = require('http')

const HttpProxy = {
  wrap(object, methods, hook) {

    if (!Array.isArray(methods)) methods = [methods]

    for (let i = 0; i < methods.length; ++i) {
      let original = object[methods[i]]
      if (!original) return console.log(`Method ${methods[i]} unknown`, )
      if (original.__axm_original) {
        if (methods[i] !== '_load') { return }
      }
      let hooked = hook(original)

      if (original.__axm_original) {
        hooked.__axm_original = original.__axm_original
      } else {
        hooked.__axm_original = original
      }
      object[methods[i]] = hooked
    }
  }
}

HttpProxy.wrap(http.Server.prototype, ['on', 'addListener'], (addListener) => {
  return function (event, listener) {
    console.log(1111)
    const overloadedFunction = (request, response) => {
      let httpStart = {
        url: request.url,
        method: request.method,
        start: Date.now(),
        ip: request.headers['x-forwarded-for'] ||
          (request.connection ? request.connection.remoteAddress : false) ||
          (request.socket ? request.socket.remoteAddress : false) ||
          ((request.connection && request.connection.socket) ? request.connection.socket.remoteAddress : false) || ''
      }
      response.once('finish', () => {
        httpStart = null
      })
    }
    console.log(2222)
    if (!(event === 'request' && typeof listener === 'function')) {
      return addListener.apply(this, arguments)
    }
    if (this.__overloaded !== true) {
      this.on('removeListener', function onRemoveListener() {
        setTimeout(() => {
          if (this.listeners('request').length === 1) {
            this.removeListener('request', overloadedFunction)
            this.removeListener('removeListener', onRemoveListener)
            this.__overloaded = false
          }
        }, 200)
      })
      addListener.call(this, event, overloadedFunction)
      this.__overloaded = true
    }
    return addListener.apply(this, arguments)
  }
})

module.exports = HttpProxy
