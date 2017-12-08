// 'use strict';
// var proxyquire = require('proxyquire').noPreserveCache();
// var awsCtrlStub = {
//   getClientConfig: 'awsCtrl.getClientConfig',
//   getS3Policy: 'awsCtrl.getS3Policy' 
// };
// var routerStub = {
//   get: sinon.spy() 
// };
// // require the index with our stubbed out modules
// var awsIndex = proxyquire('./index.js', {
//   'express': {
//     Router: function() {
//       return routerStub;
//     }
//   },
//   './aws.controller': awsCtrlStub
// });
// describe('AWS API Router:', function() {
//   it('should return an express router instance', function() {
//     awsIndex.should.equal(routerStub);
//   });
//   describe('GET /api/aws/config', function() { 
//     it('should route to aws.controller.getClientConfig', function() {
//       routerStub.get
//         .withArgs('/config', 'awsCtrl.getClientConfig')
//         .should.have.been.calledOnce;
//     }); 
//   });
//   describe('GET /api/aws/getS3Policy', function() { 
//     it('should route to aws.controller.getS3Policy', function() {
//       routerStub.get
//         .withArgs('/getS3Policy', 'awsCtrl.getS3Policy')
//         .should.have.been.calledOnce;
//     }); 
//   }); 
// });