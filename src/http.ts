console.log('go into    ./http')
import * as Http from 'http'
import * as Mitm from 'mitm'



setTimeout(() => {
  const mitm = Mitm()
  mitm.disable()
  mitm.on('connect', (req, res) => {
    // console.log('connect    mitm intercept http ')
    return req
  })
  mitm.on('response', (req, res) => {
    console.log('response    mitm intercept http ')
  })
  mitm.on('request', function (req, res) {
    res.on('data', (chunk) => {
      console.log('res onData : ', chunk.toString())
    })
    req.on('data', (chunk) => {
      console.log('req onData : ', chunk.toString())
    })
    console.log('request    mitm intercept http ')
    // res.statusCode = 402
    res.end('Pay up, sugar!')
  })

  console.log('into http get')
  mitm.enable()

  Http.get('http://localhost:3000/demo/test/a', (res) => {
    res.on('data', (data) => {
      console.log('xxxx1', data.toString())
    })
    debugger
  })
}, 3000)
//////////////////////////////////////////////////////////////

// const mitmproxy = require('node-mitmproxy')

// mitmproxy.createProxy({
//   sslConnectInterceptor: (req, cltSocket, head) => false,
//   requestInterceptor: (rOptions, req, res, ssl, next) => {
//     console.log(`正在访问：${rOptions.protocol}//${rOptions.hostname}:${rOptions.port}`)
//     console.log('cookie:', rOptions.headers.cookie)
//     res.end('Hello node-mitmproxy!')
//     next()
//   },
//   responseInterceptor: (req, res, proxyReq, proxyRes, ssl, next) => {
//     next()
//   }
// })

