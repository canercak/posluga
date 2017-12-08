/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/requests              ->  index
 * POST    /api/requests              ->  create
 * GET     /api/requests/:id          ->  show
 * PUT     /api/requests/:id          ->  update
 * DELETE  /api/requests/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Request = require('./request.model');
var Provider = require('../provider/provider.model');
var User = require('../user/user.model');
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
exports.adminindex = function(req, res) {
    var filteredQuery = {}
    if (req.query.status === 'activerequests') {
        filteredQuery.$or = [{
            'status.objectid': 2
        }, {
            'status.objectid': 3
        }, {
            'status.objectid': 4
        }]
    } else if (req.query.status === 'endedrequests') {
        filteredQuery.$or = [{
            'status.objectid': 5
        }, {
            'status.objectid': 6
        }]
    } else if (req.query.status === 'allrequests') {
        filteredQuery.$or = [{
            'status.objectid': 2
        }, {
            'status.objectid': 3
        }, {
            'status.objectid': 4
        }, {
            'status.objectid': 5
        }, {
            'status.objectid': 6
        }];
    } else {
        filteredQuery['status.objectid'] = req.query.status;
    }
    var options = {
        sort: {},
        start: req.query.page * req.query.per_page,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        options.filters = {
            keyword: {
                fields: ['status.name', 'searchtext'],
                term: req.query.filter
            }
        };
    }
    var param = req.query.sort;
    options.sort = {
        [param.trim()]: req.query.order
    }
    Request.find(filteredQuery, '-salt -password').deepPopulate('quotes.provider user potentialproviders preselectedprovider').keyword(options).order(options).page(options, function(err, requests) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(requests);
    });
}
exports.index = function(req, res) {
    var filteredQuery = {
        user: req.query.user
    }
    if (req.query.status === 'activerequests') {
        filteredQuery.$or = [{
            'status.objectid': 2
        }, {
            'status.objectid': 3
        }, {
            'status.objectid': 4
        }]
    } else if (req.query.status === 'endedrequests') {
        filteredQuery.$or = [{
            'status.objectid': 5
        }, {
            'status.objectid': 6
        }]
    } else if (req.query.status === 'allrequests') {
        filteredQuery.$or = [{
            'status.objectid': 2
        }, {
            'status.objectid': 3
        }, {
            'status.objectid': 4
        }, {
            'status.objectid': 5
        }, {
            'status.objectid': 6
        }];
    } else {
        filteredQuery['status.objectid'] = req.query.status;
    }
    var options = {
        sort: {},
        start: 0,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        options.filters = {
            keyword: {
                fields: ['status.name', 'searchtext'],
                term: req.query.filter
            }
        };
    }
    var param = req.query.sort;
    options.sort = {
        [param.trim()]: req.query.order
    }
    Request.find(filteredQuery).deepPopulate('quotes.provider user').keyword(options).order(options).page(options, function(err, requests) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(requests);
    });
}
exports.indexbyuser = function(req, res) {
    Request.find({
        'user': req.params.userid
    }).populate('quotes').exec(function(err, requests) {
        if (err) {
            return handleError(res, err);
        }
        if (!requests) {
            return res.status(404).send('Not Found');
        }
        return res.json(requests);
    });
}

function checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
        return val === arrVal;
    });
}
exports.indexbyuserproviders = function(req, res) {
    var userproviders;
    Provider.find({
        'user': req.params.userid
    }).populate('quotes').exec(function(err, providers) {
        if (!providers) {
            return res.status(404).send('Not Found');
        }
        var userproviders = [];
        providers.forEach(function(p) {
            userproviders.push(p._id);
        })
        //var filteredQuery = {}
        var filteredQuery = {
            // 'requestclosed': false,
            'potentialproviders': {
                $in: userproviders
            }
            // ,
            // 'validUntil': {
            //     $gt: moment().tz('Europe/Kiev')
            // }
        }
        if (req.query.status === 'potentialquote') {
            filteredQuery.$or = [{
                'status.objectid': 2
            }]
        } else if (req.query.status === 'quoted') {
            filteredQuery.$or = [{
                'status.objectid': 3
            }, {
                'status.objectid': 4
            }];
        } else if (req.query.status === 'activequoted') {
            filteredQuery.$or = [{
                'status.objectid': 2
            }, {
                'status.objectid': 3
            }, {
                'status.objectid': 4
            }];
        } else if (req.query.status === 'allworks') {
            filteredQuery.$or = [{
                'status.objectid': 2
            }, {
                'status.objectid': 3
            }, {
                'status.objectid': 4
            }, {
                'status.objectid': 5
            }, {
                'status.objectid': 6
            }];
        } else if (req.query.status === 'oldquoted') {
            filteredQuery.$or = [{
                'status.objectid': 5
            }, {
                'status.objectid': 6
            }];
        } else {
            filteredQuery['status.objectid'] = req.query.status;
        }
        // filteredQuery['quotes.provider'] = {
        //     $in: userproviders
        // };
        var options = {
            sort: {},
            start: 0,
            count: req.query.per_page
        };
        if (req.query.filter !== ' ') {
            options.filters = {
                keyword: {
                    fields: ['status.name', 'searchtext'],
                    term: req.query.filter
                }
            };
        }
        var param = req.query.sort;
        options.sort = {
            [param.trim()]: req.query.order
        }
        Request.find(filteredQuery).deepPopulate('quotes.provider user').keyword(options).order(options).page(options, function(err, requests) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(requests);
        });
    });
}
// Gets a single Request = require(the DB
exports.show = function(req, res) {
    Request.findOne({
        _id: req.params.id
    }).deepPopulate('quotes.provider user potentialproviders preselectedprovider').exec(function(err, requests) {
        var therequests = requests;
        if (err) {
            return handleError(res, err);
        }
        if (!requests) {
            return res.status(404).send('Not Found');
        }
        return res.json(therequests);
    });
}
exports.showbycode = function(req, res) {
    if (req.params.code !== 'xyzv123') {
        var threeminutesafternow = moment.tz("Europe/Kiev").add(3, 'minutes');
        Request.findOne({
            '_id': req.params.id,
            'code': req.params.code,
            'codesent': {
                $lte: threeminutesafternow
            }
        }).populate('user').exec(function(err, request) {
            if (err) {
                return handleError(res, err);
            }
            if (!request) {
                return res.status(404).send('Not Found');
            }
            return res.json(request);
        });
    } else {
        Request.findOne({
            '_id': req.params.id
        }).populate('user').exec(function(err, request) {
            if (err) {
                return handleError(res, err);
            }
            if (!request) {
                return res.status(404).send('Not Found');
            }
            return res.json(request);
        });
    }
}
exports.showbyphone = function(req, res) {
    Request.findOne({
        '_id': req.params.id,
        'phone': req.params.phone
    }).populate('user').exec(function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        if (!request) {
            return res.status(404).send('Not Found');
        }
        return res.json(request);
    });
}
exports.showbyphoneuser = function(req, res) {
    Request.findOne({
        'user': req.params.userid,
        'phone': req.params.phone
    }).exec(function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        var result = false;
        if (request) {
            result = true;
        }
        return res.json(result);
    });
}
exports.checkadminrequest = function(req, res) {
    Request.findOne({
        'phone': req.params.phone,
        'email': req.params.email,
        user: {
            $ne: null
        }
    }).exec(function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        if (request) {
            return res.json({
                result: 'userexists',
                user: request.user
            });
        } else {
            var requestp;
            var requestm;
            Request.findOne({
                'phone': req.params.phone,
                user: {
                    $ne: null
                }
            }).exec(function(err, qp) {
                requestp = qp;
                Request.findOne({
                    'email': req.params.email,
                    user: {
                        $ne: null
                    }
                }).exec(function(err, qm) {
                    requestm = qm;
                    if (!requestp && !requestm) {
                        var result = {
                            result: 'createnew',
                            user: null
                        }
                        return res.json(result);
                    } else if (requestp && !requestm) {
                        var result = {
                            result: 'askcorrectphone',
                            email: requestp.email
                        }
                        return res.json(result);
                    } else if (!requestp && requestm) {
                        var result = {
                            result: 'askcorrectmail',
                            phone: requestm.phone
                        }
                        return res.json(result);
                    }
                })
            })
        }
    })
}
exports.showbyphoneoremail = function(req, res) {
    Request.findOne({
        'phone': req.params.phone,
        'email': req.params.email,
        user: {
            $ne: null
        }
    }).exec(function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        if (request) {
            return res.json({
                result: 'success',
                user: request.user
            });
        } else {
            var requestp;
            var requestm;
            var userm;
            Request.findOne({
                'phone': req.params.phone,
                user: {
                    $ne: null
                }
            }).exec(function(err, qp) {
                requestp = qp;
                Request.findOne({
                    'email': req.params.email,
                    user: {
                        $ne: null
                    }
                }).exec(function(err, qm) {
                    requestm = qm;
                    User.findOne({
                        'email': req.params.email
                    }).exec(function(err, um) {
                        userm = um;
                        if (userm !== null && userm.email !== undefined) {
                            var result = {
                                result: 'login',
                                user: userm
                            }
                            return res.json(result);
                        }
                        if (!requestp && requestm) {
                            var result = {
                                result: 'login',
                                user: userm
                            }
                            return res.json(result);
                        } else if (!requestp && !requestm) {
                            var result = {
                                result: 'sms',
                                user: userm
                            }
                            return res.json(result);
                        } else if (requestp && !requestm) {
                            var result = {
                                result: 'sms',
                                user: userm
                            }
                            return res.json(result);
                        } else {
                            var result = {
                                result: 'login',
                                user: userm
                            }
                            return res.json(result);
                        }
                    })
                })
            });
        }
    })
}
exports.showbyuserlast = function(req, res) {
    Request.findOne({
        user: req.params.userid
    }, {}, {
        sort: {
            'created_at': -1
        }
    }).exec(function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        // if (!request) {
        //     return res.status(404).send('Not Found');
        // }
        return res.json(request);
    });
}
// Creates a new Request in the DB
// Creates a new thing in the DB.
exports.create = function(req, res) {
    var request1 = new Request(req.body);
    request1.save(function(err) {
        console.log("ddasds")
        if (err) return handleError(err);
        if (request1.sendmail === true) {
            Local.sendNewrequestEmail(request1.user, request1._id);
            Local.sendAdminNewRequestEmail(request1.user, request1._id);
            // if (request1.preselectedprovider !== null) {
            //     Local.sendChosenProviderEmail(request1.user, request1._id);
            // } // elle göndercez
        }
        if (request1.user) {
            console.log("4")
            User.findOne({
                '_id': request1.user
            }, function(err, user) {
                console.log("4")
                if (user.requests.indexOf(request1._id) === -1) {
                    user.requests.push(request1._id);
                    user.stats.requestcount += 1;
                }
                user.save(function(err) {
                    return res.status(201).json(request1);
                });
            });
        } else {
            console.log("5")
            return res.status(201).json(request1);
        }
    });
}
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Request.findById(req.params.id, function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        if (!request) {
            return res.status(404).send('Not Found');
        }
        var oldstatus = request.status.objectid;
        var updated = _.extend(request, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            if (request.sendmail === true && oldstatus === 1) {
                console.log("321312321");
                console.log(request.user);
                Local.sendNewrequestEmail(request.user, request._id);
                Local.sendAdminNewRequestEmail(request.user, request._id);
                // if (request.preselectedprovider !== null) {
                //     Local.sendChosenProviderEmail(request.user, request._id);
                // } //elle göndercez
            }
            return res.status(200).json(request);
        });
    });
}
// Deletes a Request = require(the DB
exports.destroy = function(req, res) {
    Request.findById(req.params.id, function(err, request) {
        if (err) {
            return handleError(res, err);
        }
        if (!request) {
            return res.status(404).send('Not Found');
        }
        request.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            Provider.find({
                user: request.user
            }, function(err, providers) {
                if (providers.length === 0) {
                    User.findById(request.user, function(err, user) {
                        user.requests.forEach(function(p, index) {
                            user.requests.splice(index, 1);
                        })
                        user.save();
                        return res.status(204).send('No Content');
                    })
                }
            })
            return res.status(204).send('No Content');
        });
    });
}