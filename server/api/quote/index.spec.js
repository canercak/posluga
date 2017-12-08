// 'use strict';
// var proxyquire = require('proxyquire').noPreserveCache();
// var quoteCtrlStub = {
//   index: 'quoteCtrl.index',
//   otherquotes: 'quoteCtrl.otherquotes',
//   show: 'quoteCtrl.show',
//   showprovidercomments: 'quoteCtrl.showprovidercomments',
//   create: 'quoteCtrl.create',
//   update: 'quoteCtrl.update',
//   destroy: 'quoteCtrl.destroy'
// };
// var routerStub = {
//   get: sinon.spy(),
//   put: sinon.spy(),
//   patch: sinon.spy(),
//   post: sinon.spy(),
//   delete: sinon.spy()
// };
// // require the index with our stubbed out modules
// var quoteIndex = proxyquire('./index.js', {
//   'express': {
//     Router: function() {
//       return routerStub;
//     }
//   },
//   './quote.controller': quoteCtrlStub
// });
// describe('Quote API Router:', function() {
//   it('should return an express router instance', function() {
//     quoteIndex.should.equal(routerStub);
//   });
//   describe('GET /api/quotes', function() {
//     it('should route to quote.controller.index', function() {
//       routerStub.get
//         .withArgs('/', 'quoteCtrl.index')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('GET /api/quotes/:id ', function() {
//     it('should route to quote.controller.show', function() {
//       routerStub.get
//         .withArgs('/:id', 'quoteCtrl.show')
//         .should.have.been.calledOnce;
//     }); 
//   });
//   describe('GET /api/quotes/comments/:providerid ', function() {
//     it('should route to quote.controller.showprovidercomments', function() {
//       routerStub.get
//         .withArgs('/comments/:providerid', 'quoteCtrl.showprovidercomments')
//         .should.have.been.calledOnce;
//     }); 
//   });
//     describe('GET /api/quotes/otherquotes/:requestid/:providerid', function() {
//     it('should route to quote.controller.otherquotes', function() {
//       routerStub.get
//         .withArgs('/otherquotes/:requestid/:providerid', 'quoteCtrl.otherquotes')
//         .should.have.been.calledOnce;
//     }); 
//   });
//   describe('POST /api/quotes', function() {
//     it('should route to quote.controller.create', function() {
//       routerStub.post
//         .withArgs('/', 'quoteCtrl.create')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('PUT /api/quotes/:id', function() {
//     it('should route to quote.controller.update', function() {
//       routerStub.put
//         .withArgs('/:id', 'quoteCtrl.update')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('PATCH /api/quotes/:id', function() {
//     it('should route to quote.controller.update', function() {
//       routerStub.patch
//         .withArgs('/:id', 'quoteCtrl.update')
//         .should.have.been.calledOnce;
//     });
//   });
//   describe('DELETE /api/quotes/:id', function() {
//     it('should route to quote.controller.destroy', function() {
//       routerStub.delete
//         .withArgs('/:id', 'quoteCtrl.destroy')
//         .should.have.been.calledOnce;
//     });
//   });
// });