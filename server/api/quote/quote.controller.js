/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/quotes              ->  index
 * POST    /api/quotes              ->  create
 * GET     /api/quotes/:id          ->  show
 * PUT     /api/quotes/:id          ->  update
 * DELETE  /api/quotes/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Quote = require('./quote.model');
var Provider = require('../provider/provider.model');
var Request = require('../request/request.model');
var Local = require('../../auth/local/local.controller');
var moment = require('moment-timezone');

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
exports.index = function(req, res) {
    Quote.find({}, '-salt -password', function(err, quotes) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, quotes);
    });
}
exports.show = function(req, res) {
    Quote.findOne({
        _id: req.params.id
    }).deepPopulate('request.user').populate('provider').populate('chat.sender').exec(function(err, quote) {
        if (err) {
            return handleError(res, err);
        }
        if (!quote) {
            return res.status(404).send('Not Found');
        }
        return res.json(quote);
    })
}
exports.findbestreviews = function(req, res) {
    Quote.find({
        'comment.rating': 5
    }).deepPopulate('request.user').populate('provider').populate('request.service').exec(function(err, quotes) {
        if (err) {
            return handleError(res, err);
        }
        if (!quotes) {
            return res.status(404).send('Not Found');
        }
        return res.json(quotes);
    })
}
exports.showuserhasquote = function(req, res) {
    Quote.find({
        'provider': req.params.providerid
    }).deepPopulate('request').exec(function(err, quotes) {
        if (err) {
            return handleError(res, err);
        }
        if (!quotes) {
            return res.status(404).send('Not Found');
        }
        var returnval = false;
        quotes.forEach(function(quote) {
            var a = req.params.userid;
            var b = quote.request.user._id;
            if (JSON.stringify(a) === JSON.stringify(b)) {
                returnval = true;
            }
        })
        return res.json({
            result: returnval
        });
    })
}
exports.showprovidercomments = function(req, res) {
    Quote.find({
        provider: req.params.providerid,
        'comment.message': {
            $ne: null
        }
    }).populate('request').exec(function(err, quotes) {
        if (err) {
            return handleError(res, err);
        }
        if (!quotes) {
            return res.status(404).send('Not Found');
        }
        return res.json(quotes);
    })
}
exports.allcomments = function(req, res) {
    Quote.find({
        'comment.rating': 5
    }).sort({
        'comment.leftAt': -1
    }).limit(parseInt(req.params.limit)).deepPopulate('request.user provider request.service').exec(function(err, quotes) {
        if (err) {
            return handleError(res, err);
        }
        if (!quotes) {
            return res.status(404).send('Not Found');
        }
        return res.json(quotes);
    });
}
exports.otherquotes = function(req, res) {
    Quote.find({
        request: req.params.requestid,
        provider: {
            $ne: req.params.providerid
        }
    }).populate('provider').exec(function(err, quote) {
        if (err) {
            return handleError(res, err);
        }
        if (!quote) {
            return res.status(404).send('Not Found');
        }
        return res.json(quote);
    })
}
exports.create = function(req, res) {
    var quote = new Quote(req.body);
    quote.save(function(err) {
        if (err) return handleError(err);
        Provider.findOne({
            _id: quote.provider
        }).exec(function(err, provider) {
            var updatedProvider = provider;
            updatedProvider.stats.quotecount += 1;
            provider.stats.totalscore += 5;
            updatedProvider.quotes.push(quote._id);
            updatedProvider.save().then(function() {
                Request.findOne({
                    _id: quote.request
                }).populate('quotes').exec(function(err, request) {
                    request.status = {
                        'objectid': 3,
                        'date': moment().tz('Europe/Kiev')
                    }
                    request.quotes.push(quote._id);
                    request.save();
                    if (request.quotes.count === 5) {
                        Local.sendAllquotesEmail(request.user, request);
                        Local.sendAdminAllquotesEmail(request.user, request);
                    } else {
                        Local.sendNewquoteEmail(provider, request, quote._id);
                        Local.sendAdminNewquoteEmail(provider, request, quote._id);
                    }
                    return res.status(201).json(quote);
                })
            })
        })
    })
}
// Updates an existing Quote in the DB
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Quote.findById(req.params.id, function(err, quote) {
        if (err) {
            return handleError(res, err);
        }
        if (!quote) {
            return res.status(404).send('Not Found');
        }
        var oldquote = JSON.parse(JSON.stringify(quote));
        var updated = _.extend(quote, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            Quote.findOne({
                _id: quote._id
            }).deepPopulate('provider.quotes request.user provider.user').exec(function(err, xquote) {
                Local.updateProviderQuoteStats("updatequote", xquote.provider, xquote, oldquote, xquote.request.user);
                return res.status(200).json(xquote);
            })
        });
    });
}