// 'use strict';
// var proxyquire = require('proxyquire').noPreserveCache();
// var requestCtrlStub = {
//   index: 'requestCtrl.index',
//   indexbyuser: 'requestCtrl.indexbyuser',
//   indexbyuserproviders: 'requestCtrl.indexbyuserproviders',
//   show: 'requestCtrl.show',
//   showforprovider: 'requestCtrl.showforprovider',
//   showbycode: 'requestCtrl.showbycode',
//   showbyphone: 'requestCtrl.showbyphone',
//   showbyphoneuser: 'requestCtrl.showbyphoneuser',
//   showbyphoneoremail: 'requestCtrl.showbyphoneoremail', 
//   showbyuserlast: 'requestCtrl.showbyuserlast',
//   create: 'requestCtrl.create',
//   update: 'requestCtrl.update',
//   destroy: 'requestCtrl.destroy'
// };
// var routerStub = {
//   get: sinon.spy(),
//   put: sinon.spy(),
//   patch: sinon.spy(),
//   post: sinon.spy(),
//   delete: sinon.spy()
// };
// // require the index with our stubbed out modules
// var requestIndex = proxyquire('./index.js', {
//   'express': {
//     Router: function() {
//       return routerStub;
//     }
//   },
//   './request.controller': requestCtrlStub
// });
// describe('Request API Router:', function() {
//   it('should return an express router instance', function() {
//     requestIndex.should.equal(routerStub);
//   });
//   describe('GET /api/requests', function() {
//     it('should route to request.controller.index', function() {
//       routerStub.get
//         .withArgs('/', 'requestCtrl.index')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/requests/user/:userid', function() { 
//     it('should route to request.controller.indexbyuser', function() {
//       routerStub.get
//         .withArgs('/user/:userid', 'requestCtrl.indexbyuser')
//         .should.have.been.calledOnce;
//     }); 
//   });
//   describe('GET /api/requests/userproviders/:userid', function() { 
//     it('should route to request.controller.indexbyuserproviders', function() {
//       routerStub.get
//         .withArgs('/userproviders/:userid', 'requestCtrl.indexbyuserproviders')
//         .should.have.been.calledOnce;
//     }); 
//   });
//   describe('GET /api/requests/:id', function() {
//     it('should route to request.controller.show', function() {
//       routerStub.get
//         .withArgs('/:id', 'requestCtrl.show')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/requests/code/:id/:code ', function() {
//     it('should route to request.controller.showbycode', function() {
//       routerStub.get
//         .withArgs('/code/:id/:code', 'requestCtrl.showbycode')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/requests/userlast/:userid', function() {
//     it('should route to request.controller.showbyuserlast', function() {
//       routerStub.get
//         .withArgs('/userlast/:userid', 'requestCtrl.showbyuserlast')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/requests/phone/:id/:phone ', function() {
//     it('should route to request.controller.showbyphone', function() {
//       routerStub.get
//         .withArgs('/phone/:id/:phone', 'requestCtrl.showbyphone')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/requests/phoneuser/:userid/:phone', function() {
//     it('should route to request.controller.showbyphoneuser', function() {
//       routerStub.get
//         .withArgs('/phoneuser/:userid/:phone', 'requestCtrl.showbyphoneuser')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/requests/phoneoremail/:phone/:email', function() {
//     it('should route to request.controller.showbyphoneoremail', function() {
//       routerStub.get
//         .withArgs('/phoneoremail/:phone/:email', 'requestCtrl.showbyphoneoremail')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('POST /api/requests', function() {
//     it('should route to request.controller.create', function() {
//       routerStub.post
//         .withArgs('/', 'requestCtrl.create')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('PUT /api/requests/:id', function() {
//     it('should route to request.controller.update', function() {
//       routerStub.put
//         .withArgs('/:id', 'requestCtrl.update')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('PATCH /api/requests/:id', function() {
//     it('should route to request.controller.update', function() {
//       routerStub.patch
//         .withArgs('/:id', 'requestCtrl.update')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('DELETE /api/requests/:id', function() {
//     it('should route to request.controller.destroy', function() {
//       routerStub.delete
//         .withArgs('/:id', 'requestCtrl.destroy')
//         .should.have.been.calledOnce;
//     });
//   });
// });