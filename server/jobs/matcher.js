var Request = require('../api/request/request.model');
var Provider = require('../api/provider/provider.model');
var User = require('../api/user/user.model');
var Service = require('../api/service/service.model');
var Quote = require('../api/quote/quote.model');
var Local = require('../auth/local/local.controller');
exports.matchProviders = function(agenda) {
    agenda.define('match providers', function(job, done) {
        Request.find({
            $or: [{
                'status.objectid': 2
            }, {
                'status.objectid': 3
            }],
            preselectedprovider: null,
            requestclosed: false
        }).exec(function(err, requests) {
            console.log("Found requests");
            requests.forEach(function(request) {
                console.log("Found request: requestid: " + request._id + " - Now looking for eligible providers...");
                Provider.find({
                    'service': request.service,
                    'rayon.slug': request.rayon.slug,
                    'requesttype': {
                        $ne: 'newone'
                    }
                }).exec(function(err, providers) {
                    if (providers.length > 0) {
                        providers.forEach(function(provider) {
                            console.log("aasss")
                            console.log(request.potentialproviders.indexOf(provider._id))
                            console.log(request.potentialproviders)
                            if (request.potentialproviders.indexOf(provider._id) === -1) {
                                request.potentialproviders.push(provider._id);
                                request.save().then(function() {
                                    console.log('added potential provider: ' + provider._id);
                                    done();
                                })
                            }
                        })
                    }
                    done();
                })
            })
            done();
        })
        done();
    })
}