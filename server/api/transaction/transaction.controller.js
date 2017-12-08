/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/transactions              ->  index
 * POST    /api/transactions              ->  create
 * GET     /api/transactions/:id          ->  show
 * PUT     /api/transactions/:id          ->  update
 * DELETE  /api/transactions/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Transaction = require('./transaction.model');
var getSlug = require('speakingurl');

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}
// Gets a list of Transactions
exports.index = function(req, res) {
        Transaction.find(function(err, things) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, things);
        });
    }
    // Gets a single Transaction from the DB
exports.show = function(req, res) {
        Transaction.findById(req.params.id, function(err, thing) {
            if (err) {
                return handleError(res, err);
            }
            if (!thing) {
                return res.send(404);
            }
            return res.json(thing);
        });
    }
    // Gets a single Transaction from the DB
exports.showTransactions = function(req, res) {
        Transaction.find({
            user: req.params.userid
        }, function(err, things) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, things.sort('date'));
        });
    }
    // Creates a new Transaction in the DB
exports.create = function(req, res) {
    Transaction.create(req.body, function(err, thing) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, thing);
    });
}
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Transaction.findById(req.params.id, function(err, transaction) {
        if (err) {
            return handleError(res, err);
        }
        if (!transaction) {
            return res.send(404);
        }
        var updated = _.extend(transaction, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, transaction);
        });
    });
};