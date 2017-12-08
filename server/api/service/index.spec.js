// 'use strict';
// var proxyquire = require('proxyquire').noPreserveCache();
// var serviceCtrlStub = {
//     categories: 'serviceCtrl.showSubcategories',
//     subcategories: 'serviceCtrl.showCategories',
//     subjects: 'serviceCtrl.showSubjects',
//     text: 'serviceCtrl.showBytext',
//     showSubjectDetails: 'serviceCtrl.ShowSubjectDetails'
// };
// var routerStub = {
//     get: sinon.spy()
// };
// // require the index with our stubbed out modules
// var serviceIndex = proxyquire('./index.js', {
//     'express': {
//         Router: function() {
//             return routerStub;
//         }
//     },
//     './service.controller': serviceCtrlStub
// });
// describe('GET /api/services/:id ', function() {
//     it('should route to service.controller.show', function() {
//         routerStub.get.withArgs('/:id', 'serviceCtrl.show').should.have.been.calledOnce;
//     });
// });
// describe('GET /api/services/:slug/:language', function() {
//     it('should route to service.controller.showSubjectDetails', function() {
//         routerStub.get.withArgs('/:slug/:language', 'serviceCtrl.showSubjectDetails').should.have.been.calledOnce;
//     });
// });
// describe('service API Router:', function() {
//     it('should return an express router instance', function() {
//         serviceIndex.should.equal(routerStub);
//     });
// })
// describe('GET /api/services/categories/all', function() {
//     it('should route to service.controller.showCategories', function() {
//         routerStub.get.withArgs('/categories/all', 'serviceCtrl.showCategories').should.have.been.calledOnce;
//     });
// });
// describe('GET /api/services/subjects', function() {
//     it('should route to service.controller.showSubjects', function() {
//         routerStub.get.withArgs('/subjects', 'serviceCtrl.showSubjects').should.have.been.calledOnce;
//     });
// });
// describe('GET /api/services/subcategories', function() {
//     it('should route to service.controller.showSubcategories', function() {
//         routerStub.get.withArgs('/subcategories', 'serviceCtrl.showSubcategories').should.have.been.calledOnce;
//     });
// });
// describe('GET /api/services/search', function() {
//     it('should route to service.controller.showBytext', function() {
//         routerStub.get.withArgs('/search', 'serviceCtrl.showBytext').should.have.been.calledOnce;
//     });
// });