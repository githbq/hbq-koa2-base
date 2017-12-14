const Http = require('http')
const { IncomingMessage } = Http
const { EventEmitter } = require('events')
const _request = Http.request
Http.request = function (options, _responseCallback) {
  const responseCallback = function (res) {
    res.statusCode = 408
    res.statusMessage = 'request timeout'
    return _responseCallback.apply(this, arguments)
  }
  const req = _request.apply(this, [options, responseCallback])


  const response = new IncomingMessage(new EventEmitter())
  response.req = req
  req.path = options.path
  setTimeout(() => {
    try {
      req.res = response
      req.emit('response', response)
      response.emit('end')
    } catch (e) {
    }
  }, 500)
  return req
}