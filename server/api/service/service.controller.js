/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/services              ->  index
 * POST    /api/services              ->  create
 * GET     /api/services/:id          ->  show
 * PUT     /api/services/:id          ->  update
 * DELETE  /api/services/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Service = require('./service.model');
var Quote = require('../quote/quote.model');
var getSlug = require('speakingurl');
var translit = require('translitit-cyrillic-russian-to-latin');
var changeCase = require('change-case')

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
    var filteredQuery = {};
    var options = {
        sort: {},
        start: req.query.page * req.query.per_page,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        var a = getSlug(req.query.filter, {
            lang: 'en'
        });
        options['filters'] = {
            keyword: {
                fields: ['subcategory.ru.slug'],
                term: a
            }
        };
    }
    var param = req.query.sort;
    options['sort'] = {
        [param.trim()]: req.query.order
    }
    Service.find(filteredQuery, '-salt -password').keyword(options).order(options).page(options, function(err, services) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(services);
    });
}
exports.showBySlug = function(req, res) {
    Service.findOne({
        'subcategory.ru.slug': req.params.slug
    }, function(err, service) {
        if (err) {
            return handleError(res, err);
        }
        if (!service) {
            return res.send(404);
        }
        return res.json(service);
    });
}
exports.showServicesWithIcons = function(req, res) {
    Service.find({
        "iconpath": {
            $ne: null
        }
    }, function(err, service) {
        if (err) {
            return handleError(res, err);
        }
        if (!service) {
            return res.send(404);
        }
        return res.json(service);
    });
}
exports.show = function(req, res) {
    Service.findOne({
        _id: req.params.id
    }, function(err, service) {
        if (err) {
            return handleError(res, err);
        }
        if (!service) {
            return res.send(404);
        }
        return res.json(service);
    });
}
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    if (req.body.keywords !== undefined) {
        if (req.body.keywords.length > 0) {
            req.body.keywords.forEach(function(keyword) {
                keyword = changeCase.lowerCase(keyword);
            })
        }
    }
    Service.findById(req.params.id, function(err, service) {
        if (err) {
            return handleError(res, err);
        }
        if (!service) {
            return res.send(404);
        }
        var updated = _.extend(service, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, service);
        });
    });
}
exports.create = function(req, res) {
        var service = new Service(req.body);
        if (service.keywords !== undefined) {
            if (service.keywords.length > 0) {
                service.keywords.forEach(function(keyword) {
                    keyword = changeCase.lowerCase(keyword);
                })
            }
        }
        service.subcategoryid = Math.floor(1000 + Math.random() * 9000);
        service.subcategory.en.slug = getSlug(service.subcategory.en.text, {
            lang: 'en'
        });
        service.subcategory.ru.slug = getSlug(service.subcategory.ru.text, {
            lang: 'ru'
        });
        service.subcategory.uk.slug = getSlug(service.subcategory.uk.text, {
            lang: 'uk'
        });
        service.category.en.slug = getSlug(service.category.en.text, {
            lang: 'en'
        });
        service.category.ru.slug = getSlug(service.category.ru.text, {
            lang: 'ru'
        });
        service.category.uk.slug = getSlug(service.category.uk.text, {
            lang: 'uk'
        });
        service.subject.en.slug = getSlug(service.subject.en.text, {
            lang: 'en'
        });
        service.subject.ru.slug = getSlug(service.subject.ru.text, {
            lang: 'ru'
        });
        service.subject.uk.slug = getSlug(service.subject.uk.text, {
            lang: 'uk'
        });
        service.save(function(err) {
            if (err) return handleError(err);
            return res.status(201).json(service);
        })
    }
    // Gets a single service from the DB
exports.showCategories = function(req, res) {
    Service.aggregate({
        "$group": {
            "_id": {
                categoryid: "$categoryid",
                category: "$category",
                subjectid: "$subjectid",
                subject: "$subject"
            }
        }
    }).exec(function(err, results) {
        var array = [];
        results.forEach(function(result) {
            array.push({
                categoryid: result._id.categoryid,
                category: result._id.category,
                subjectid: result._id.subjectid,
                subject: result._id.subject
            })
        })
        var finalresults = _.sortBy(array, function(num) {
            return num.subjectid;
        });
        if (err) {
            return handleError(res, err);
        }
        if (!finalresults) {
            return res.status(404).send('Not Found');
        }
        return res.json(finalresults);
    });
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
// Gets a single service from the DB
exports.showByruname = function(req, res) {
    // var a = getSlug(req.params.name, {
    //     lang: 'ru'
    // });
    Service.findOne({
        "subcategory.ru.text": req.params.name
    }).exec(function(err, service) {
        if (err) {
            return handleError(res, err);
        }
        if (!service) {
            return res.status(404).send('Not Found');
        }
        return res.json(service);
    });
}
exports.showSubcategories = function(req, res) {
    Service.find({
        categoryid: req.params.categoryid
    }).exec(function(err, subcategories) {
        if (err) {
            return handleError(res, err);
        }
        if (!subcategories) {
            return res.status(404).send('Not Found');
        }
        return res.json(subcategories);
    });
}
exports.showCategoriesBySubject = function(req, res) {
    Service.aggregate(
        [{
            $group: {
                _id: "$categoryid",
                categories: {
                    $push: "$$ROOT"
                }
            }
        }, {
            $match: {
                'categories.subjectid': parseInt(req.params.subjectid)
            }
        }]).exec(function(err, categories) {
        if (err) {
            return handleError(res, err);
        }
        if (!categories) {
            return res.status(404).send('Not Found');
        }
        return res.json(categories);
    });
}
exports.showSubjectDetails = function(req, res) {
    var query = {};
    var pop = {};
    if (req.params.language === 'en') {
        query = {
            'categories.subject.en.slug': req.params.slug
        }
        pop = {
            'subject.en.slug': req.params.slug,
            'popular': true
        }
    } else if (req.params.language === 'ru') {
        query = {
            'categories.subject.ru.slug': req.params.slug
        }
        pop = {
            'subject.ru.slug': req.params.slug,
            'popular': true
        }
    } else if (req.params.language === 'uk') {
        query = {
            'categories.subject.uk.slug': req.params.slug
        }
        pop = {
            'subject.uk.slug': req.params.slug,
            'popular': true
        }
    }
    Service.aggregate(
        [{
            $group: {
                _id: "$category",
                categories: {
                    $push: "$$ROOT"
                }
            }
        }, {
            $match: query
        }]).exec(function(err, all) {
        if (err) {
            return handleError(res, err);
        }
        if (!all) {
            return res.status(404).send('Not Found');
        }
        Service.find(pop).exec(function(err, popular) {
            if (err) {
                return handleError(res, err);
            }
            if (!popular) {
                return res.status(404).send('Not Found');
            }
            return res.json({
                all: all,
                popular: popular
            });
        })
    });
}
exports.showAllServices = function(req, res) {
    Service.aggregate(
        [{
            $group: {
                _id: "$category",
                categories: {
                    $push: "$$ROOT"
                }
            }
        }]).exec(function(err, all) {
        if (err) {
            return handleError(res, err);
        }
        if (!all) {
            return res.status(404).send('Not Found');
        }
        return res.json(all);
    });
}
exports.showSubcategory = function(req, res) {
    var query = {};
    if (req.params.language === 'en') {
        query = {
            'subcategory.en.slug': req.params.slug
        }
    } else if (req.params.language === 'ru') {
        query = {
            'subcategory.ru.slug': req.params.slug
        }
    } else if (req.params.language === 'uk') {
        query = {
            'subcategory.uk.slug': req.params.slug
        }
    }
    Service.findOne(query).exec(function(err, result) {
        if (err) {
            return handleError(res, err);
        }
        if (!result) {
            return res.status(404).send('Not Found');
        }
        return res.json(result);
    })
}
exports.showSubjects = function(req, res) {
    Service.aggregate({
        "$group": {
            "_id": {
                subjectid: "$subjectid",
                subject: "$subject"
            }
        }
    }).exec(function(err, results) {
        var array = [];
        results.forEach(function(result) {
            array.push({
                subjectid: result._id.subjectid,
                subject: result._id.subject
            })
        })
        var subjects = _.sortBy(array, function(num) {
            return num.subjectid;
        });
        var result = {
            "subjects": subjects
        }
        Service.find({
            "topservice": true
        }).limit(7).exec(function(err, topservices) {
            if (err) {
                return handleError(res, err);
            }
            if (!result) {
                return res.status(404).send('Not Found');
            }
            result.topservices = topservices;
            return res.json(result);
        })
    })
}
exports.showMainContent = function(req, res) {
        var filteredQuery = {}
        filteredQuery.$or = [{
            'categoryid': 5
        }, {
            'categoryid': 16
        }, {
            'categoryid': 17
        }]
        Service.find(filteredQuery).limit(100).exec(function(err, subcategories) {
            if (err) {
                return handleError(res, err);
            }
            if (!subcategories) {
                return res.status(404).send('Not Found');
            }
            return res.json(subcategories);
        });
    }
    // Gets a single service from the DB
exports.showBytext = function(req, res) {
    var match = ''
    if (req.params.language === 'ru') {
        match = {
            "query": req.params.keyword,
            "fields": ['subcategory.ru.text', 'keywords'],
            "type": "phrase_prefix"
        }
    } else if (req.params.language === 'uk') {
        match = {
            "query": req.params.keyword,
            "fields": ['subcategory.uk.text', 'keywordsuk'],
            "type": "phrase_prefix"
        }
    } else if (req.params.language === 'en') {
        match = {
            "query": req.params.keyword,
            "fields": ['subcategory.en.text'],
            "type": "phrase_prefix"
        }
    }
    console.log(match)
        // Service.search({
        //     //"multi_match": match
        //     "query": {
        //         // "match": {
        //         //     "subcategory.ru.text": req.params.keyword
        //         // }
        //         "multi_match": {
        //             "query": req.params.keyword,
        //             "type": "best_fields",
        //             "fields": ['subcategory.ru.text', 'keywords'],
        //             "tie_breaker": 0.3,
        //             "minimum_should_match": "30%"
        //         }
        //     }
        // }, {
        //     from: 0,
    Service.search({
        "multi_match": match
    }, {
        from: 0,
        size: 30,
        hydrate: true
    }, function(err, results) {
        if (err) {
            return handleError(res, err);
        }
        if (!results) {
            return res.status(404).send('Not Found');
        }
        return res.json(results);
    })
}