import * as Mitm from 'mitm'
const mitm = new Mitm()
mitm.on('request', function (req, res) {
  console.log('request     mitm intercept http request2')
})
mitm.on('connect', function (req, res) {
  console.log('connect    mitm intercept http request2')
})
