/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /servicegroups              ->  index
 * POST    /servicegroups              ->  create
 * GET     /servicegroups/:id          ->  show
 * PUT     /servicegroups/:id          ->  update
 * DELETE  /servicegroups/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Servicegroup = require('./servicegroup.model');
// Get list of servicegroups
exports.index = function(req, res) {
    Servicegroup.find(function(err, servicegroups) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, servicegroups);
    });
};
// Get a single servicegroup
exports.show = function(req, res) {
    Servicegroup.findById(req.params.id, function(err, servicegroup) {
        if (err) {
            return handleError(res, err);
        }
        if (!servicegroup) {
            return res.send(404);
        }
        return res.json(servicegroup);
    });
};
// Creates a new servicegroup in the DB.
exports.create = function(req, res) {
    Servicegroup.create(req.body, function(err, servicegroup) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, servicegroup);
    });
};
// Updates an existing servicegroup in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Servicegroup.findById(req.params.id, function(err, servicegroup) {
        if (err) {
            return handleError(res, err);
        }
        if (!servicegroup) {
            return res.send(404);
        }
        var updated = _.extend(servicegroup, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, servicegroup);
        });
    });
};
// Deletes a servicegroup from the DB.
exports.destroy = function(req, res) {
    Servicegroup.findById(req.params.id, function(err, servicegroup) {
        if (err) {
            return handleError(res, err);
        }
        if (!servicegroup) {
            return res.send(404);
        }
        servicegroup.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}