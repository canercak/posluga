/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/places              ->  index
 * POST    /api/places              ->  create
 * GET     /api/places/:id          ->  show
 * PUT     /api/places/:id          ->  update
 * DELETE  /api/places/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var Place = require('./place.model');

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
// Gets a list of Places
exports.index = function(req, res) {
    Place.find({}, '-salt -password').then(function() {
        console.log('I am in then function');
        respondWithResult(res)
    }, function(error) {
        console.log('Error', error);
        handleError(res)
    })
}
exports.showPlaceBySlug = function(req, res) {
    var matchtext = {
        'oblast.slug': req.params.oblast
    }
    if (req.params.rayon !== 'undefined') {
        matchtext['rayon.slug'] = req.params.rayon;
    }
    if (req.params.gorad !== 'undefined') {
        matchtext['gorad.slug'] = req.params.gorad;
    }
    if (req.params.rayongorad !== 'undefined') {
        matchtext['rayongorad.slug'] = req.params.rayongorad;
    }
    Place.findOne(matchtext).exec(function(err, result) {
        if (err) {
            return handleError(res, err);
        }
        if (!result) {
            return res.status(404).send('Not Found');
        }
        return res.json(result);
    });
}
exports.showRayonsByOblast = function(req, res) {
    var matchtext = {
        'oblast.slug': req.params.oblast
    };
    Place.aggregate(
        [{
            $match: matchtext
        }, {
            $group: {
                _id: "$rayon",
                places: {
                    $push: "$$ROOT"
                }
            }
        }]).exec(function(err, rayons) {
        if (err) {
            return handleError(res, err);
        }
        if (!rayons) {
            return res.status(404).send('Not Found');
        }
        var array = [];
        var places = [];
        rayons.forEach(function(result) {
            places.push(result.places[0]);
        })
        places.forEach(function(result) {
            var x = result.rayon
            x.oblast = result.oblast;
            x.rayonhasnamegorad = result.rayonhasnamegorad;
            x.hasgorad = result.hasgorad
            array.push(x)
        })
        var fresults = [];
        if (req.params.language === 'en') {
            fresults = _.sortBy(array, function(o) {
                return o.en;
            })
        } else if (req.params.language === 'ru') {
            fresults = _.sortBy(array, function(o) {
                return o.ru;
            })
        } else if (req.params.language === 'uk') {
            fresults = _.sortBy(array, function(o) {
                return o.uk;
            })
        }
        return res.json(fresults);
    });
}
exports.showGoradsByRayon = function(req, res) {
    var matchtext = {
        'rayon.slug': req.params.rayon,
        'oblast.slug': req.params.oblast
    };
    Place.aggregate(
        [{
            $match: matchtext
        }, {
            $group: {
                _id: "$gorad",
                places: {
                    $push: "$$ROOT"
                }
            }
        }]).exec(function(err, gorads) {
        if (err) {
            return handleError(res, err);
        }
        if (!gorads) {
            return res.status(404).send('Not Found');
        }
        var places = [];
        var array = [];
        if (gorads[0] !== undefined && gorads[0].places[0].gorad !== undefined) {
            gorads.forEach(function(result) {
                places.push(result.places[0]);
            })
        }
        places.forEach(function(result) {
            var x = result.gorad
            x.oblast = result.oblast;
            x.rayon = result.rayon;
            x.hasrayongorad = result.hasrayongorad;
            array.push(x)
        })
        var fresults = [];
        if (req.params.language === 'en') {
            fresults = _.sortBy(array, function(o) {
                return o.en;
            })
        } else if (req.params.language === 'ru') {
            fresults = _.sortBy(array, function(o) {
                return o.ru;
            })
        } else if (req.params.language === 'uk') {
            fresults = _.sortBy(array, function(o) {
                return o.uk;
            })
        }
        return res.json(fresults);
    });
}
exports.findFromSlugOblast = function(req, res) {
    var matchtext = {
        'oblast.slug': req.params.oblast
    };
    Place.findOne(matchtext).exec(function(err, place) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(place);
    })
}
exports.findFromSlugRayon = function(req, res) {
    var matchtext = {
        'rayon.slug': req.params.rayon,
        'oblast.slug': req.params.oblast
    };
    Place.findOne(matchtext).exec(function(err, place) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(place);
    })
}
exports.findFromSlugGorad = function(req, res) {
    var matchtext = {
        'rayon.slug': req.params.rayon,
        'oblast.slug': req.params.oblast,
        'gorad.slug': req.params.gorad
    };
    Place.findOne(matchtext).exec(function(err, place) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(place);
    })
}
exports.findFromSlugRayonGorad = function(req, res) {
    var matchtext = {
        'rayon.slug': req.params.rayon,
        'oblast.slug': req.params.oblast,
        'gorad.slug': req.params.gorad,
        'rayongorad.slug': req.params.rayongorad
    };
    Place.findOne(matchtext).exec(function(err, place) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(place);
    })
}
exports.showRayongoradsByGorad = function(req, res) {
    var matchtext = {
        'oblast.slug': req.params.oblast,
        'gorad.slug': req.params.gorad,
        'rayon.slug': req.params.rayon
    };
    Place.aggregate(
        [{
            $match: matchtext
        }, {
            $group: {
                _id: "$rayongorad",
                places: {
                    $push: "$$ROOT"
                }
            }
        }]).exec(function(err, rayongorads) {
        if (err) {
            return handleError(res, err);
        }
        var array = [];
        var places = [];
        if (rayongorads[0] !== undefined && rayongorads[0].places[0].rayongorad !== undefined) {
            rayongorads.forEach(function(result) {
                places.push(result.places[0]);
            })
        }
        places.forEach(function(result) {
            var x = result.rayongorad
            x.oblast = result.oblast;
            x.rayon = result.rayon;
            x.gorad = result.gorad;
            array.push(x)
        })
        var fresults = [];
        if (req.params.language === 'en') {
            fresults = _.sortBy(array, function(o) {
                return o.en;
            })
        } else if (req.params.language === 'ru') {
            fresults = _.sortBy(array, function(o) {
                return o.ru;
            })
        } else if (req.params.language === 'uk') {
            fresults = _.sortBy(array, function(o) {
                return o.uk;
            })
        }
        return res.json(fresults);
    });
}
exports.showOblasts = function(req, res) {
        Place.aggregate({
            "$group": {
                "_id": {
                    oblast: "$oblast"
                }
            }
        }).exec(function(err, oblasts) {
            var array = [];
            oblasts.forEach(function(result) {
                array.push(result._id.oblast);
            })
            if (err) {
                return handleError(res, err);
            }
            var fresults = [];
            if (req.params.language === 'en') {
                fresults = _.sortBy(array, function(o) {
                    return o.en;
                })
            } else if (req.params.language === 'ru') {
                fresults = _.sortBy(array, function(o) {
                    return o.ru;
                })
            } else if (req.params.language === 'uk') {
                fresults = _.sortBy(array, function(o) {
                    return o.uk;
                })
            }
            return res.json(fresults);
        });
    }
    // Gets a single Place = require(the DB
exports.show = function(req, res) {
        Place.findById(req.params.id, function(err, place) {
            if (err) {
                return handleError(res, err);
            }
            if (!place) {
                return res.send(404);
            }
            return res.json(place);
        });
    }
    // Creates a new Place in the DB
exports.create = function(req, res) {
        Place.create(req.body).then(function() {
            console.log('I am in then function');
            respondWithResult(res, 201)
        }, function(error) {
            console.log('Error', error);
            handleError(res)
        })
    }
    // Updates an existing Place in the DB
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Place.findById(req.params.id, function(err, place) {
        if (err) {
            return handleError(res, err);
        }
        if (!place) {
            return res.send(404);
        }
        var updated = _.extend(place, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, place);
        });
    });
};
// Deletes a place from the DB.
exports.destroy = function(req, res) {
    Place.findById(req.params.id, function(err, place) {
        if (err) {
            return handleError(res, err);
        }
        if (!place) {
            return res.send(404);
        }
        place.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};