const Http = require('http')
const { IncomingMessage } = Http
const { EventEmitter } = require('events')
const _request = Http.request
Http.request = function (options, _responseCallback) {
  const responseCallback = function (res) {
    debugger
    // res.statusCode = 408
    return _responseCallback.apply(this, arguments)
  }
  const req = _request.apply(this, [options, responseCallback])


  const response = new IncomingMessage(new EventEmitter())
  response.req = req
  req.path = options.path
  debugger
  setTimeout(() => {
    req.res = response
    req.emit('response', response)
    req.write('hello')
    response.emit('end')
  }, 500)
  debugger
  return req
}
