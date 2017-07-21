"use strict";

var wxpay = require('./fixtures/wxpay')

describe.only('RedPack', () => {
  
  var now = Date.now();
  describe('# common', () => {
    
    var redpack = {
      mch_billno: now,
      // sub_mch_id: '1447462802',
      send_name: "泛卡汇",
      re_openid: 'omnmWs0rRFYyCleWtldWtrkokYnk',
      total_amount: 100,
      total_num: 1,
      wishing: '红包祝福语',
      client_ip: '192.168.0.1',
      act_name: '销售分润',
      remark: '10笔分润',
      scene_id: 'PRODUCT_5'
    }

    it('should send ok', (done) => {
      wxpay.sendRedPack(redpack, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        done();
      })
    });
  });
  
  describe('# info', function(){
    it('should get ok', function(done){
      wxpay.getHBInfo({mch_billno: now}, function (err, res) {
        res.should.have.property('result_code', 'SUCCESS')
        res.should.have.property('return_code', 'SUCCESS')
        res.should.have.property('err_code', 'SUCCESS')
        res.should.have.property('status')
        done();
      })
    })
  })
});