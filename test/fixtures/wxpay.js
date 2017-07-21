var WXPay = require('../..')
var fs = require('fs')

var wxpay = WXPay({
  // sandbox: true,
  appid: process.env.WX_APPID,
  mch_id: process.env.WX_MCHID,
  partner_key: process.env.WX_PARTNERKEY,
  pfx: fs.readFileSync('test/wxpay_cert.p12')
})

before(function(done){
  if(!wxpay.options.sandbox) return done();
  
  var intervalId = setInterval(function () {
    if(wxpay.options.ready) {
      clearInterval(intervalId);
      done();
    }
  }, 500);
})

module.exports = wxpay