const Http = require('http')
const _request = Http.request
Http.request = function (options, responseCallback) {
  responseCallback = function () {
    debugger
    return responseCallback.call(this, arguments)
  }
  const req = _request.call(this, arguments)
  debugger
  return req
}
