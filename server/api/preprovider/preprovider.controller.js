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
var Preprovider = require('./preprovider.model');
var User = require('../user/user.model');
//var config = require('../config/environment');
//var Service = require('../api/service/service.model');
//var Place = require('../api/place/place.model');
var NodeGeocoder = require('node-geocoder');
var changeCase = require('change-case')
var cheerio = require('cheerio');
var jschardet = require("jschardet")
var iconv = require('iconv-lite');
var request = require('request');
var encoding = 'windows-1251';
var Extractor = require('phone-number-extractor');
//var _ = require('underscore-node');
var fs = require('fs');
var util = require('util');
var S = require('string');
var contactKeys = ['контакты', 'контакт', 'наши контакты'];
var hrefContactKeys = ['contact', 'kontakt'];
var aboutKeys = ['о нас', 'о компании', 'наши контакты', 'информация о нас'];
var hrefAboutKeys = ['about', 'o-nas', 'o_nas', 'about_us', 'about-us', 'o-kompanii', 'o_kompanii', 'kompaniya'];
var serviceKeys = ['наши услуги', 'услуги', 'наши контакты', 'все услуги']; //'наши работы',
var hrefServiceKeys = ['nashi-uslugi', 'services', 'uslugi', 'vse-uslugi']; //'nashi-raboty',
var imageNoKeys = ['facebook', 'twitter', 'google', 'yandex', 'rambler', 'c.hit', 'language', 'instagram', 'vks', 'arrow', 'logo']
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/posluga-dev';
var serviceslinkdata = [];
var serviceList = [];
var metadata = {};
var landinglinkdata = [];
var translate = require('yandex-translate')("trnsl.1.1.20161030T071551Z.4f7518bfae896153.1e2baf7c57807b28549943c44933d71cebb39680");

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
    console.log(req.query.role)
    console.log(req.query.status)
    var filteredQuery = {};
    if (req.query.role === 'editor') {
        if (req.query.status === 'newpreproviders') {
            filteredQuery['updated'] = false;
            filteredQuery['created'] = false;
            filteredQuery['deleted'] = false;
        } else if (req.query.status === 'updatedpreproviders') {
            filteredQuery['updatedby'] = req.query.user;
            filteredQuery['updated'] = true;
            filteredQuery['created'] = false;
            filteredQuery['deleted'] = false;
        } else if (req.query.status === 'createdpreproviders') {
            filteredQuery['updatedby'] = req.query.user;
            filteredQuery['createdby'] = req.query.user;
            filteredQuery['created'] = true;
            filteredQuery['deleted'] = false;
        } else if (req.query.status === 'deletedpreproviders') {
            filteredQuery['updatedby'] = req.query.user;
            filteredQuery['deleted'] = true;
        } else {
            filteredQuery['updated'] = false;
            filteredQuery['created'] = false;
            filteredQuery['deleted'] = false;
        }
    } else if (req.query.role === 'admin') {
        if (req.query.status === 'newpreproviders') {
            filteredQuery['updated'] = false;
            filteredQuery['created'] = false;
            filteredQuery['deleted'] = false;
        } else if (req.query.status === 'updatedpreproviders') {
            filteredQuery['updated'] = true;
            filteredQuery['created'] = false;
            filteredQuery['deleted'] = false;
        } else if (req.query.status === 'createdpreproviders') {
            filteredQuery['created'] = true;
            filteredQuery['deleted'] = false;
        } else if (req.query.status === 'deletedpreproviders') {
            filteredQuery['deleted'] = true;
        } else if (req.query.status === 'editorupdated') {
            filteredQuery['updated'] = true;
            filteredQuery['created'] = false;
            filteredQuery['deleted'] = false;
            filteredQuery['updatedby'] = '581c9b0f91070902333e1d0f'; //'5825a30921a1c81fe3bb6d43'; 
        } else if (req.query.status === 'editordeleted') {
            filteredQuery['deleted'] = true;
            filteredQuery['deletedby'] = '581c9b0f91070902333e1d0f'; //'5825a30921a1c81fe3bb6d43'; //
        } else {
            filteredQuery['updated'] = false;
            filteredQuery['created'] = false;
        }
    } else {
        filteredQuery = {
            company: "99999"
        };
    }
    var options = {
        sort: {},
        start: req.query.page * req.query.per_page,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        options['filters'] = {
            keyword: {
                fields: ['company', 'website', 'oblast.ru', 'rayon.ru'],
                term: req.query.filter
            }
        };
    }
    var param = req.query.sort;
    options['sort'] = {
        [param.trim()]: req.query.order
    }
    console.log(options)
    Preprovider.find(filteredQuery, '-salt -password').keyword(options).order(options).page(options, function(err, preproviders) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(preproviders);
    });
}
exports.show = function(req, res) {
    Preprovider.findById(req.params.id, function(err, preprovider) {
        if (err) {
            return handleError(res, err);
        }
        if (!preprovider) {
            return res.send(404);
        }
        return res.json(preprovider);
    });
}
exports.admincheckphone = function(req, res) {
    Preprovider.find({
        $or: [{
            $and: [{
                'phone': req.params.phone
            }, {
                'phone': {
                    $ne: null
                }
            }]
        }, {
            $and: [{
                'phone2': req.params.phone
            }, {
                'phone2': {
                    $ne: null
                }
            }]
        }]
    }).exec(function(err, preproviders) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(preproviders);
    })
}
exports.admincheckemail = function(req, res) {
    Preprovider.find({
        'email': req.params.email
    }).exec(function(err, preproviders) {
        if (err) {
            return handleError(res, err);
        }
        var preproviders = preproviders;
        User.findOne({
            'email': req.params.email
        }).exec(function(err, users) {
            var users = users;
            return res.json({
                preproviders: preproviders,
                users: users
            });
        })
    })
}
exports.admincheckwebsite = function(req, res) {
    var website = req.params.protocol + '//' + req.params.host
    Preprovider.find({
        'website': website
    }).exec(function(err, preproviders) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(preproviders);
    })
}
exports.create = function(req, res) {
    var preprovider = new Preprovider(req.body);
    preprovider.company = changeCase.sentenceCase(preprovider.company);
    preprovider.save(function(err) {
        if (err) return handleError(err);
        return res.status(201).json(preprovider);
    });
}
exports.translate = function(req, res) {
    var data = {};
    translate.translate(req.params.text, {
        to: 'uk'
    }, function(err, res1) {
        data['uk'] = res1.text;
        translate.translate(req.params.text, {
            to: 'en'
        }, function(err, res2) {
            data['en'] = res2.text;
            return res.status(200).json(data);
        })
    })
}
exports.findaddress = function(req, resx) {
    var address = req.params.address
    var optionsGoogle = {
        provider: 'google',
        language: 'ru',
        apiKey: 'AIzaSyAvgmwG0Ko5D1mxYMHz_3ti06EQnHnp6Ek',
    };
    var optionsYandex = {
        provider: 'yandex',
        language: 'ru'
    };
    newAddress = address;
    if (address.indexOf("Украина") < -1 && address.indexOf("украина") < -1) {
        var newAddress = address + ' Украина';
    }
    var geocoder = NodeGeocoder(optionsGoogle);
    geocoder.geocode(newAddress).then(function(res) {
        console.log(res);
        return resx.status(200).json(res);
    }).catch(function(err) {
        if (err) return handleError(err);
    });
}
exports.crawlpage = function(req, res) {
    console.log("CRAWLER SERVICE REACHED")
    serviceslinkdata = [];
    serviceList = [];
    metadata = {};
    landinglinkdata = [];
    var encoding = {};
    var page = req.body.website
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('services');
        collection.find({
            categoryid: 5
        }).toArray(function(err, docs) {
            if (err) {
                console.log("mongo connect error")
            } else {
                docs.forEach(function(doc) {
                    serviceList.push({
                        id: doc._id,
                        categoryid: doc.categoryid,
                        subcategoryRu: doc.subcategory.ru.text,
                        subcategoryUk: doc.subcategory.uk.text,
                        keywords: (doc.keywords === undefined ? null : doc.keywords)
                    })
                });
                db.close();
                request(page, function(error, response, html1) {
                    if (!error && response.statusCode == 200) {
                        var detectedEncoding = jschardet.detect(html1).encoding;
                        if (detectedEncoding === 'ascii') {
                            encoding = {
                                encoding: 'ascii',
                                page: page
                            }
                        } else {
                            encoding = {
                                encoding: 'windows-1251',
                                page: page
                            }
                        }
                        var link = encoding.page;
                        request(link, function(error, response, html) {
                            if (!error && response.statusCode == 200) {
                                var landingpageEncoding = jschardet.detect(html).encoding;
                                if (landingpageEncoding === 'ascii') {
                                    console.log("aaaaaaa")
                                    crawlLandingLinks1(page, html, link, res)
                                } else {
                                    console.log("aaaaaa11a")
                                    crawlLandingLinks1(page, html, link, res)
                                }
                            }
                        })
                    }
                });
            }
        });
    });
}
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    req.body.company = changeCase.sentenceCase(req.body.company);
    Preprovider.findById(req.params.id, function(err, preprovider) {
        if (err) {
            return handleError(res, err);
        }
        if (!preprovider) {
            return res.send(404);
        }
        var updated = _.extend(preprovider, req.body);
        console.log(updated)
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, preprovider);
        });
    });
}

function checkStringContainsArray(string, array) {
    var string = string;
    var substrings = array;
    var length = substrings.length;
    var doesContain = false;
    while (length--) {
        if (string.indexOf(substrings[length]) != -1) {
            doesContain = true
        }
    }
    return doesContain
}

function crawlLandingLinks1(page, html, link, resx) {
    request.get({
        url: link,
        encoding: null
    }, function(err, res, body) {
        if (body !== undefined) {
            var asciihtml = iconv.decode(body, 'windows-1251');
            if (!asciihtml.includes("Џ") && !asciihtml.includes("љ") && !asciihtml.includes("µ")) {
                html = asciihtml;
            }
        }
        var lowercasehtml = html.toLowerCase();
        var $ = cheerio.load(lowercasehtml);
        var aTexts = $('a');
        for (var key in aTexts) {
            var el = aTexts[key];
            var name = null;
            var href = null;
            if (el.children !== undefined && el.children[0] !== undefined) {
                if (el.children[0].data !== undefined) {
                    name = el.children[0].data.toLowerCase();
                } else {
                    if (el.children[0].children[0] !== undefined) {
                        if (el.children[0].children[0].data !== undefined) {
                            name = el.children[0].children[0].data.toLowerCase();
                        }
                    }
                }
                if (name !== null && name.indexOf("\n\t\t\t\t\t\t") > -1) {
                    if (el.children[0].next.children[0] !== undefined) {
                        name = el.children[0].next.children[0].data;
                    }
                }
            }
            if (el.attribs !== undefined && el.attribs.href !== undefined) {
                href = el.attribs.href.toLowerCase();
            }
            if (name !== null) {
                var ldata = {
                    webpage: page,
                    tag: 'a',
                    href: href,
                    name: name
                };
                var data = ldata;
                if (metadata[data.webpage] === undefined) {
                    metadata[data.webpage] = {
                        'contactlink': '',
                        'aboutlink': '',
                        'servicelink': null,
                        'servicepagelinks': [],
                        'services': []
                    };
                }
                // about
                var doesContainAbout = false;
                if (aboutKeys.indexOf(data.name) > -1) {
                    doesContainAbout = true
                } else {
                    if (data.href !== null && data.href.indexOf('#') === -1 && checkStringContainsArray(data.href, hrefAboutKeys)) {
                        doesContainAbout = true;
                    }
                }
                if (doesContainAbout) {
                    metadata[data.webpage]['aboutlink'] = data.href;
                    var link = metadata[data.webpage]['aboutlink'];
                    if (link.indexOf('://') === -1) {
                        if (link.charAt(0) === '/') {
                            link = data.webpage + link;
                        } else {
                            link = data.webpage + '/' + link;
                        }
                        metadata[data.webpage]['aboutlink'] = link;
                    }
                }
                //services
                var doesContainService = false;
                if (serviceKeys.indexOf(data.name) > -1) {
                    doesContainService = true
                }
                if (doesContainService && metadata[data.webpage]['servicelink'] === null) {
                    metadata[data.webpage]['servicelink'] = data.href;
                    var link = metadata[data.webpage]['servicelink'];
                    if (link.indexOf('://') === -1) {
                        if (link.charAt(0) === '/') {
                            link = data.webpage + link;
                        } else {
                            link = data.webpage + '/' + link;
                        }
                        metadata[data.webpage]['servicelink'] = link;
                        if (index + 1 === landinglinkdata.length && metadata[data.webpage]['servicelink'] === null) {
                            metadata[data.webpage]['servicelink'] = data.webpage;
                        }
                    }
                } else {
                    metadata[data.webpage]['servicelink'] = data.webpage;
                }
            }
        };
        var link = metadata[data.webpage]['servicelink'];
        request(link, function(error, response, htmlx) {
            if (!error && response.statusCode == 200) {
                var servicepageEncoding = jschardet.detect(htmlx).encoding;
                if (servicepageEncoding === 'ascii') {
                    request.get({
                        url: link,
                        encoding: null
                    }, function(err, res, body) {
                        if (body !== undefined) {
                            var asciihtml = iconv.decode(body, 'windows-1251');
                            if (!asciihtml.includes("Џ") && !asciihtml.includes("љ") && !asciihtml.includes("µ")) {
                                crawlservices(link, asciihtml, data.webpage);
                            } else {
                                crawlservices(link, htmlx, data.webpage);
                            }
                        } else {
                            crawlservices(link, htmlx, data.webpage);
                        }
                    });
                } else {
                    crawlservices(link, htmlx, data.webpage);
                }
            }
        })
    });
}

function crawlservices(link, html, landingpagelink) {
    console.log("crawlservices")
    var lowercasehtml = html.toLowerCase();
    var $ = cheerio.load(lowercasehtml);
    var aTexts = $('a');
    for (var key in aTexts) {
        var el = aTexts[key];
        var name = null;
        var href = null;
        if (el.children !== undefined && el.children[0] !== undefined) {
            if (el.children[0].data !== undefined) {
                name = el.children[0].data.toLowerCase();
            } else {
                if (el.children[0].children[0] !== undefined) {
                    if (el.children[0].children[0].data !== undefined) {
                        name = el.children[0].children[0].data.toLowerCase();
                    }
                }
            }
            if (name !== null && name.indexOf("\n\t\t\t\t\t\t") > -1) {
                if (el.children[0].next.children[0] !== undefined) {
                    name = el.children[0].next.children[0].data;
                }
            }
        }
        if (el.attribs !== undefined && el.attribs.href !== undefined) {
            href = el.attribs.href.toLowerCase();
        }
        var check = serviceslinkdata.some(function(el) {
            return el.name === name;
        });
        if (!check && name !== null) {
            var ldata = {
                webpage: link,
                tag: 'a',
                href: href,
                name: name
            };
            serviceslinkdata.push(ldata);
        }
    };
    // metadata[data.webpage].services.forEach(function(obj, index) {
    //     var link = obj.matchedhref;
    //     request(link, function(error, response, html) {
    //         if (!error && response.statusCode == 200) {
    //             var servicedetailpageEncoding = jschardet.detect(html).encoding;
    //             if (servicedetailpageEncoding === 'ascii') {
    //                 request.get({
    //                     url: link,
    //                     encoding: null
    //                 }, function(err, res, body) {
    //                     if (body !== undefined) {
    //                         var asciihtml = iconv.decode(body, 'windows-1251');
    //                         if (!asciihtml.includes("Џ") && !asciihtml.includes("љ") && !asciihtml.includes("µ")) {
    //                             getImages(asciihtml, obj);
    //                         } else {
    //                             getImages(html, obj);
    //                         }
    //                     } else {
    //                         getImages(html, obj);
    //                     }
    //                 });
    //             } else {
    //                 getImages(html, obj);
    //             }
    //         }
    //         if (index + 1 === metadata[data.webpage].services.length) {
    //             return resx.status(200).json(metadata);
    //         }
    //     })
    // })
}

function getImages(html, obj) {
    if (obj.matchedimages === undefined) {
        obj.matchedimages = [];
    }
    var lowercasehtml = html.toLowerCase();
    var $ = cheerio.load(lowercasehtml);
    var imgTexts = $("img");
    var imgArray = [];
    var thash = $(imgTexts);
    for (var key in thash) {
        var attr = thash[key].attribs;
        if (attr !== undefined) {
            if (attr.height !== undefined) {
                console.log(attr.src)
                obj.matchedimages.push(attr.src);
            }
        }
    }
}