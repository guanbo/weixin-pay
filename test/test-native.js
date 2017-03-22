var wxpay = require('./fixtures/wxpay')
var util = wxpay.Util
var request = require('request')

var express = require('express')
var app = express()
var notify_url = 'https://notify.fankahui.com/wxpay/native/notify';

app.use('/wxpay/native/notify', wxpay.useWXCallback(function (msg, req, res, next) {
  console.log('--------', msg);
  res.success();
}))

app.listen(3000)

function mockupOrder(caseNo) {
  return {
    body: '扫码支付测试CASE'+caseNo,
    out_trade_no: '20170303'+Math.random().toString().substr(2, 10),
    total_fee: caseNo,
    spbill_create_ip: '153.3.81.104',
    notify_url: notify_url,
    trade_type: 'NATIVE',
    product_id: '1234567890'
  }
}

describe('Native', function(){

  describe('# QRPay', function(){

    describe.only('## CASE 301', function(){
      this.timeout(30000)
      var order = mockupOrder(301)

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          setTimeout(done, 8000);
          // done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('fee_type', 'CNY')
          res.should.have.property('mch_id', wxpay.options.mch_id)
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '301')
          done()
        })
      })
    })

    describe('## CASE 302', function(){

      var order = mockupOrder(302);

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '302')
          res.should.have.property('cash_fee', '299')
          res.should.have.property('coupon_fee', '3')
          res.should.have.property('coupon_count', '2')
          res.should.have.property('coupon_type_0', 'CASH')
          res.should.have.property('coupon_fee_0', '1')
          res.should.have.property('coupon_type_1', 'NO_CASH')
          res.should.have.property('coupon_fee_1', '2')
          done()
        })
      })
    })

    describe('## CASE 330', function(){

      var order = mockupOrder(330)

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('fee_type', 'CNY')
          res.should.have.property('trade_state', 'SUCCESS')
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '330')
          done()
        })
      })

    })

    describe('## CASE 331', function(){

      var order = mockupOrder(331);

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('fee_type', 'CNY')
          res.should.have.property('trade_state', 'PAYERROR')
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '331')
          done()
        })
      })

    })

    describe('## CASE 332', function(){

      var order = mockupOrder(332);

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('fee_type', 'CNY')
          res.should.have.property('trade_state', 'SUCCESS')
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '332')
          done()
        })
      })

    })

    describe('## CASE 333', function(){

      var order = mockupOrder(333);

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('fee_type', 'CNY')
          res.should.have.property('trade_state', 'SUCCESS')
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '333')
          done()
        })
      })

    })

    describe('## CASE 334', function(){

      var order = mockupOrder(334);

      it('should ok', function(done){
        wxpay.createUnifiedOrder(order, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('code_url')
          done()
        })
      })

      after(function(done){
        wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
          res.should.have.property('result_code', 'SUCCESS')
          res.should.have.property('return_code', 'SUCCESS')
          res.should.have.property('fee_type', 'CNY')
          res.should.have.property('trade_state', 'SUCCESS')
          res.should.have.property('out_trade_no', order.out_trade_no)
          res.should.have.property('total_fee', '334')
          done()
        })
      })

    })

    describe('## Notify', function(){

      var notify = function (opts, fn) {
        opts.nonce_str = 'abc123';
        util.mix(opts, wxpay.wxpayID);
        opts.sign = opts.sign||wxpay.sign(opts);

        request({
          url: notify_url,
          method: 'POST',
          body: util.buildXML(opts),
          agentOptions: {
            pfx: wxpay.options.pfx,
            passphrase: wxpay.options.mch_id
          }
        }, function(err, response, body){
          util.parseXML(body, fn);
        });
      }

      it('should ok', function(done){
        notify({}, function (err, res) {
          res.should.have.property('return_code', 'SUCCESS')
          done();
        })
      })

      it('should fail', function(done){
        notify({sign:'fake sign'}, function (err, res) {
          res.should.have.property('return_code', 'FAIL')
          done();
        })
      })
    })
  })

})