'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var transactionCtrlStub = {
  index: 'transactionCtrl.index', 
  show: 'transactionCtrl.show',
  create: 'transactionCtrl.create',
  showTransactions: 'transactionCtrl.showTransactions'
};

var routerStub = {
  get: sinon.spy(), 
  post: sinon.spy() 
};

// require the index with our stubbed out modules
var transactionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './transaction.controller': transactionCtrlStub
});

describe('Transaction API Router:', function() {

  it('should return an express router instance', function() {
    transactionIndex.should.equal(routerStub);
  });

  describe('GET /api/transactions', function() {

    it('should route to transaction.controller.index', function() {
      routerStub.get
        .withArgs('/', 'transactionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/transactions/:id', function() {

    it('should route to transaction.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'transactionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/user/:userid', function() {

    it('should route to transaction.controller.userid', function() {
      routerStub.get
        .withArgs('/:userid', 'transactionCtrl.showTransactions')
        .should.have.been.calledOnce;
    });

  });
 
  describe('POST /api/transactions', function() {

    it('should route to transaction.controller.create', function() {
      routerStub.post
        .withArgs('/', 'transactionCtrl.create')
        .should.have.been.calledOnce;
    });

  });
 

});
