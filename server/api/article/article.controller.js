/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/articles              ->  index
 * POST    /api/articles              ->  create
 * GET     /api/articles/:id          ->  show
 * PUT     /api/articles/:id          ->  update
 * DELETE  /api/articles/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Article = require('./article.model');
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
// Gets a list of Articles
exports.index = function(req, res) {
    console.log("dsadadasdas")
    var filteredQuery = {}
    var options = {
        sort: {},
        start: 0,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        options.filters = {
            keyword: {
                fields: ['title'],
                term: req.query.filter
            }
        };
    }
    var param = req.query.sort;
    options.sort = {
        [param.trim()]: req.query.order
    }
    Article.find(filteredQuery).keyword(options).order(options).page(options, function(err, articles) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(articles);
    });
}
exports.show = function(req, res) {
    Article.findById(req.params.id, function(err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        return res.json(thing);
    });
}
exports.showbyslug = function(req, res) {
    Article.findOne({
        'slug': req.params.slug
    }, function(err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        return res.json(thing);
    });
}
exports.create = function(req, res) {
    var slug = getSlug(req.body.title, {
        lang: 'ru'
    });
    req.body.slug = slug;
    Article.create(req.body, function(err, thing) {
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
    Article.findById(req.params.id, function(err, article) {
        if (err) {
            return handleError(res, err);
        }
        if (!article) {
            return res.send(404);
        }
        var updated = _.extend(article, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, article);
        });
    });
};