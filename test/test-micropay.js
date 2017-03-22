var wxpay = require('./fixtures/wxpay')

function mockupOrder(caseNo) {
  return {
    body: '刷卡支付测试CASE'+caseNo,
    out_trade_no: '20170303'+Math.random().toString().substr(2, 10),
    total_fee: caseNo,
    spbill_create_ip: '153.3.81.104',
    trade_type: 'MICROPAY',
    auth_code: '120061098828009406'
  }
}

describe('MicroPay', function(){
  
  describe('## CASE 001', function(){
    var order = mockupOrder(1)

    it('should ok', function(done){
      wxpay.createMicroPay(order, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('return_msg', 'OK')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('trade_type', 'MICROPAY')
        res.should.have.property('cash_fee', '1')
        res.should.have.property('cash_fee_type', 'CNY')
        res.should.have.property('out_trade_no', order.out_trade_no)
        res.should.have.property('total_fee', '1')
        done()
      })
    })

    after(function(done){
      wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('cash_fee', '1')
        res.should.have.property('out_trade_no', order.out_trade_no)
        res.should.have.property('total_fee', '1')
        done()
      })
    })
  })
  
  describe('## CASE 002', function(){
    var order = mockupOrder(2)

    it('should ok', function(done){
      wxpay.createMicroPay(order, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('trade_type', 'MICROPAY')
        res.should.have.property('cash_fee', '1')
        res.should.have.property('cash_fee_type', 'CNY')
        res.should.have.property('out_trade_no', order.out_trade_no)
        res.should.have.property('total_fee', '2')
        done()
      })
    })

    after(function(done){
      wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('cash_fee', '1')
        res.should.have.property('coupon_fee', '1')
        res.should.have.property('total_fee', '2')
        res.should.have.property('out_trade_no', order.out_trade_no)
        done()
      })
    })
  })
  
  describe('## CASE 003', function(){
    var order = mockupOrder(3)

    it('should ok', function(done){
      wxpay.createMicroPay(order, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('trade_type', 'MICROPAY')
        res.should.have.property('cash_fee', '0')
        res.should.have.property('out_trade_no', order.out_trade_no)
        res.should.have.property('total_fee', '3')
        done()
      })
    })

    after(function(done){
      wxpay.queryOrder({out_trade_no: order.out_trade_no}, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('cash_fee', '0')
        res.should.have.property('coupon_fee', '3')
        res.should.have.property('settlement_total_fee', '-2')
        res.should.have.property('coupon_type_0', 'CASH')
        res.should.have.property('coupon_fee_0', '1')
        res.should.have.property('coupon_fee_1', '2')
        res.should.have.property('coupon_type_1', 'NO_CASH')
        res.should.have.property('total_fee', '3')
        res.should.have.property('out_trade_no', order.out_trade_no)
        res.should.have.property('coupon_count', '2')
        done()
      })
    })
  })
})