// 'use strict';
// var proxyquire = require('proxyquire').noPreserveCache();
// var smsCtrlStub = {
//   sendsms: 'smsCtrl.sendsms', 
// };
// var routerStub = { 
//   post: sinon.spy() 
// };
// // require the index with our stubbed out modules
// var smsIndex = proxyquire('./index.js', {
//   'express': {
//     Router: function() {
//       return routerStub;
//     }
//   },
//   './sms.controller': smsCtrlStub
// });
// describe('SMS API Router:', function() { 
//   it('should return an express router instance', function() {
//     smsIndex.should.equal(routerStub);
//   });
//   describe('POST /api/sms', function() { 
//     it('should route to sms.controller.sendsms', function() {
//       routerStub.post
//         .withArgs('/', 'smsCtrl.sendsms')
//         .should.have.been.calledOnce;
//     }); 
//   });  
// });