const Http = require('http')
const _request = Http.request
Http.request = function (options, _responseCallback) {
  const responseCallback = function (res) {
    debugger
    res.statusCode = 408
    _responseCallback.apply(this, arguments)
  }
  const req = _request.apply(this, [options, responseCallback])
  debugger
  return req
}
