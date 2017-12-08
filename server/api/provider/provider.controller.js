/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/providers              ->  index
 * POST    /api/providers              ->  create
 * GET     /api/providers/:id          ->  show
 * PUT     /api/providers/:id          ->  update
 * DELETE  /api/providers/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var underscore = require('underscore-node');
var Provider = require('./provider.model');
var User = require('../user/user.model');
var Request = require('../request/request.model');
var Service = require('../service/service.model');
var Local = require('../../auth/local/local.controller');
var getSlug = require('speakingurl');
var util = require('util');

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
exports.showbyserviceplace = function(req, res) {
    var query = {}
    if (req.params.placetype === 'oblast') {
        query = {
            'oblast.slug': req.params.oblastslug,
            'service': req.params.serviceid
        }
    } else if (req.params.placetype === 'rayon') {
        query = {
            'rayon.slug': req.params.rayonslug,
            'oblast.slug': req.params.oblastslug,
            'service': req.params.serviceid
        }
    } else if (req.params.placetype === 'gorad') {
        query = {
            'gorad.slug': req.params.goradslug,
            'rayon.slug': req.params.rayonslug,
            'service': req.params.serviceid
        }
    } else if (req.params.placetype === 'rayongorad') {
        query = {
            'rayongorad.slug': req.params.rayongoradslug,
            'gorad.slug': req.params.goradslug,
            'rayon.slug': req.params.rayonslug,
            'service': req.params.serviceid
        }
    } else if (req.params.placetype === 'strana') {
        query = {
            'service': req.params.serviceid
        }
    }
    Provider.find(query).sort({
        company: 'desc'
    }).populate('service').exec(function(err, results) {
        if (err) {
            return handleError(res, err);
        }
        var providers = [];
        var length = results.length;
        if (length > 0) {
            providers = underscore.first(results, 10)
        }
        return res.json({
            providers: providers,
            count: length
        });
    });
}
exports.listservices = function(req, res) {
    var query = {}
    if (req.params.placetype === 'oblast') {
        query = {
            'oblast.slug': req.params.oblastslug
        }
    } else if (req.params.placetype === 'rayon') {
        query = {
            'rayon.slug': req.params.rayonslug,
            'oblast.slug': req.params.oblastslug
        }
    } else if (req.params.placetype === 'gorad') {
        query = {
            'oblast.slug': req.params.oblastslug,
            'gorad.slug': req.params.goradslug,
            'rayon.slug': req.params.rayonslug
        }
    } else if (req.params.placetype === 'rayongorad') {
        query = {
            'oblast.slug': req.params.oblastslug,
            'gorad.slug': req.params.goradslug,
            'rayon.slug': req.params.rayonslug
        }
    } else if (req.params.placetype === 'strana') {
        query = {}
    }
    // Provider.distinct("service").exec(function(err, services) {
    //         return res.json(services);
    //     })
    Provider.find(query).distinct('service', function(error, ids) {
        Service.find({
            '_id': {
                $in: ids
            }
        }, function(err, result) {
            return res.json(result);
        });
    });
    // Provider.find(query).exec(function(err, result) {
    //     if (err) {
    //         return handleError(res, err);
    //     }
    //     var grouped = underscore(result).groupBy(function(o) {
    //         return o.service._id;
    //     });
    //     var serviceIds = [];
    //     for (var key in grouped) {
    //         serviceIds.push(key)
    //     }
    //     Service.find({
    //         '_id': {
    //             $in: serviceIds
    //         }
    //     }, function(err, docs) {
    //         return res.json(docs);
    //     });
    // });
}

function createSlugLink(provider) {
    var name;
    if (provider.businesstype.objectid === 1) {
        name = provider.firstname + ' ' + provider.lastname
    } else {
        name = provider.company
    }
    var ruplace = (provider.oblast.ru + ' ' + provider.rayon.ru + ' ' + ((provider.gorad !== undefined && provider.gorad !== null) ? provider.gorad.ru : '') + ' ' + ((provider.rayongorad !== undefined && provider.rayongorad !== null) ? provider.rayongorad.ru : '')).trim();
    var ukplace = (provider.oblast.uk + ' ' + provider.rayon.uk + ' ' + ((provider.gorad !== undefined && provider.gorad !== null) ? provider.gorad.uk : '') + ' ' + ((provider.rayongorad !== undefined && provider.rayongorad !== null) ? provider.rayongorad.uk : '')).trim();
    var enplace = (provider.oblast.en + ' ' + provider.rayon.en + ' ' + ((provider.gorad !== undefined && provider.gorad !== null) ? provider.gorad.en : '') + ' ' + ((provider.rayongorad !== undefined && provider.rayongorad !== null) ? provider.rayongorad.en : '')).trim();
    var ukSlugLatin = getSlug(name + ' ' + ukplace + ' ' + provider.service.subcategory.uk.text, {
        lang: 'uk'
    });
    var ruSlugLatin = getSlug(name + ' ' + ruplace + ' ' + provider.service.subcategory.ru.text, {
        lang: 'ru'
    });
    var enSlugLatin = getSlug(name + ' ' + enplace + ' ' + provider.service.subcategory.en.text, {
        lang: 'en'
    });
    var ukSlugCyril = (name + ' ' + ukplace + ' ' + provider.service.subcategory.uk.text).replace(/\s+/g, '-').toLowerCase();
    var ruSlugCyril = (name + ' ' + ruplace + ' ' + provider.service.subcategory.ru.text).replace(/\s+/g, '-').toLowerCase();
    var returnString = {
        cyril: {
            uk: ukSlugCyril,
            ru: ruSlugCyril
        },
        latin: {
            uk: ukSlugLatin,
            ru: ruSlugLatin,
            en: enSlugLatin
        }
    };
    return returnString;
}
// Gets a list of Providers
exports.index = function(req, res) {
    var filteredQuery = {}
    var options = {
        sort: {},
        start: req.query.page * req.query.per_page,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        options.filters = {
            keyword: {
                fields: ['website', 'email', 'phone'],
                term: req.query.filter
            }
        };
    }
    var param = req.query.sort;
    options.sort = {
        [param.trim()]: req.query.order
    }
    Provider.find(filteredQuery, '-salt -password').deepPopulate('quotes user service').keyword(options).order(options).page(options, function(err, providers) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(providers);
    });
}
// Gets a single Provider = require(the DB
exports.show = function(req, res) {
    Provider.findById(req.params.id, function(err, provider) {
        if (err) {
            return handleError(res, err);
        }
        if (!provider) {
            return res.send(404);
        }
        return res.json(provider);
    });
}
exports.showbyslug = function(req, res) {
    Provider.findOne({
        $or: [{
            'slug.latin.ru': req.params.slug
        }, {
            'slug.latin.uk': req.params.slug
        }, {
            'slug.latin.en': req.params.slug
        }]
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
exports.checklink = function(req, res) {
    var request = require('request');
    var cheerio = require("cheerio");
    var outgoinglink = decodeURIComponent(req.params.outgoinglink);
    var incominglink = decodeURIComponent(req.params.incominglink);
    request(incominglink, function(error, response, body) {
        var result = false;
        if (!error) {
            var $ = cheerio.load(body);
            var links = $('a');
            $(links).each(function(i, link) {
                if (outgoinglink.indexOf($(link).attr('href')) > -1) {
                    result = true
                }
            });
        }
        return res.json(result);
    });
}
exports.findexistinguser = function(req, res) {
    return res.json(true);
    // Request.findById(req.params.requestid, function(err, request) {
    //     request.potentialproviders.forEach(function(providerid) {
    //         Provider.findById(providerid, function(err, provider) {
    //             console.log("RRRRRRRRR")
    //             console.log(provider.user._id)
    //             console.log(req.params.userid)
    //             if (provider.user._id === req.params.userid) {
    //                 return res.json(true);
    //             } else {
    //                 return res.json(false);
    //             }
    //         })
    //     })
    // })
}
// Gets a single Provider = require(the DB
exports.showbyuser = function(req, res) {
    Provider.find({
        user: req.params.userid
    }).populate('quotes').exec(function(err, results) {
        if (err) {
            return handleError(res, err);
        }
        if (!results) {
            return res.status(404).send('Not Found');
        }
        return res.json(results);
    });
}
exports.showcheckservice = function(req, res) {
    Provider.findOne({
        'searchtext': req.params.searchtext,
        'user': req.params.userid,
        'oblast.slug': req.params.oblastslug
    }).exec(function(err, result) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(result);
    });
}
// Creates a new Provider in the DB
exports.create = function(req, res) {
    req.body.slug = createSlugLink(req.body);
    var provider = new Provider(req.body);
    provider.save(function(err) {
        if (err) return handleError(err);
        if (provider.adminCreated === false) {
            Local.sendProviderEmail(provider);
            Local.updateProviderQuoteStats('setrankprofilecomplete', provider, null, null, null)
        } else {
            Local.updateProviderQuoteStats('setrankprofilecomplete', provider, null, null, null)
        }
        User.findOne({
            '_id': provider.user
        }, function(err, user) {
            user.isprovider = true;
            if (user.providers.indexOf(provider._id) === -1) {
                user.providers.push(provider._id);
            }
            user.save(function(err) {
                return res.status(201).json(provider);
            });
        });
    });
}
exports.createBulk = function(req, res) {
    req.body.slug = createSlugLink(req.body);
    var provider = new Provider(req.body);
    provider.save(function(err) {
        if (err) return handleError(err);
        if (provider.adminCreated === false) {
            Local.sendProviderEmail(provider);
            Local.updateProviderQuoteStats('setrankprofilecomplete', provider, null, null, null)
        } else {
            Local.updateProviderQuoteStats('setrankprofilecomplete', provider, null, null, null)
        }
        User.findOne({
            '_id': provider.user
        }, function(err, user) {
            user.isprovider = true;
            if (user.providers.indexOf(provider._id) === -1) {
                user.providers.push(provider._id);
            }
            user.save(function(err) {
                return res.status(201).json(provider);
            });
        });
    });
}
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Provider.findById(req.params.id, function(err, provider) {
        if (err) {
            return handleError(res, err);
        }
        if (!provider) {
            return res.status(404).send('Not Found');
        }
        var oldprovider = JSON.parse(JSON.stringify(provider));
        var updated = _.extend(provider, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            Provider.findOne({
                _id: provider._id
            }).populate('provider').exec(function(err, xprovider) {
                if (oldprovider.links.length === 0 && xprovider.links.length > 0) {
                    console.log("1")
                    Local.updateProviderQuoteStats("providerupdatelink", xprovider, null, null, null);
                }
                if (oldprovider.files.length === 0 && xprovider.files.length > 0) {
                    console.log("2")
                    Local.updateProviderQuoteStats("providerupdateimage", xprovider, null, null, null);
                }
                if (oldprovider.documents.length === 0 && xprovider.documents.length > 0) {
                    console.log("3")
                    Local.updateProviderQuoteStats("providerupdatedoc", xprovider, null, null, null);
                }
                console.log(oldprovider.established)
                console.log(xprovider.established)
                if ((oldprovider.established === undefined) && (xprovider.established !== undefined)) {
                    if (xprovider.established.name !== undefined) {
                        console.log("4")
                        Local.updateProviderQuoteStats("providerupdatedate", xprovider, null, null, null);
                    }
                }
                return res.status(200).json(xprovider);
            })
        });
    });
}
// Deletes a Provider = require(the DB
exports.destroy = function(req, res) {
    Provider.findById(req.params.id, function(err, provider) {
        if (err) {
            return handleError(res, err);
        }
        if (!provider) {
            return res.status(404).send('Not Found');
        }
        provider.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            Provider.find({
                user: provider.user
            }, function(err, providers) {
                if (providers.length === 0) {
                    User.findById(provider.user, function(err, user) {
                        user.isprovider = false;
                        user.providers.forEach(function(p, index) {
                            user.providers.splice(index, 1);
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