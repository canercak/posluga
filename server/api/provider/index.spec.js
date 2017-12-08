'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var providerCtrlStub = {
  index: 'providerCtrl.index',
  showbyuser:'providerCtrl.showbyuser',
  show: 'providerCtrl.show',
  showbyslug: 'providerCtrl.showbyslug',
  create: 'providerCtrl.create',
  update: 'providerCtrl.update',
  destroy: 'providerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var providerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './provider.controller': providerCtrlStub
});

describe('Provider API Router:', function() {

  it('should return an express router instance', function() {
    providerIndex.should.equal(routerStub);
  });

  describe('GET /api/providers', function() {

    it('should route to provider.controller.index', function() {
      routerStub.get
        .withArgs('/', 'providerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/providers/:id', function() {

    it('should route to provider.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'providerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/providers/slug/:slug', function() {

    it('should route to provider.controller.showbyslug', function() {
      routerStub.get
        .withArgs('/slug/:slug', 'providerCtrl.showbyslug')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/providers/user/:userid', function() {

    it('should route to provider.controller.showbyuser', function() {
      routerStub.get
        .withArgs('/user/:userid', 'providerCtrl.showbyuser')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/providers', function() {

    it('should route to provider.controller.create', function() {
      routerStub.post
        .withArgs('/', 'providerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/providers/:id', function() {

    it('should route to provider.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'providerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/providers/:id', function() {

    it('should route to provider.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'providerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/providers/:id', function() {

    it('should route to provider.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'providerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
