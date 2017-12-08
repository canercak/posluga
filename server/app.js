/**
 * Main application file
 */
'use strict';
// Set default node environment to development
process.env.NODE_ENV = 'development';
//process.env.NODE_ENV = 'production';
//process.env.PORT = '8080';
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var http = require('http');
var matcher = require('./jobs/matcher');
var Agenda = require('agenda');
var moment = require('moment-timezone');
var bugsnag = require("bugsnag");
bugsnag.register("43444b0e28a36cab0aba1c91bc4e07f6");
process.on('uncaughtException', function(err) {
    console.log("Uncaught Exception:", err);
    process.exit(1); // This is VITAL. Don't swallow the err and try to continue.
});
var winston = require('winston');
require('winston-loggly-bulk');
winston.add(winston.transports.Loggly, {
    token: "b2edec95-c2da-4bc1-aee5-5095a2d09887",
    subdomain: "posluga",
    tags: ["Winston-NodeJS"],
    json: true
});
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
// Populate DB with sample data
if (config.seedDB) {
    require('./config/seed');
}
// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
    serveClient: (config.env === 'production') ? false : true,
    path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);
// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    // var agenda = new Agenda({
    //     db: {
    //         address: config.mongo.uri
    //     }
    // });
    // matcher.matchProviders(agenda);
    // agenda.on('ready', function() {
    //     agenda.every('5 seconds', 'match providers');
    //     agenda.start();
    // });
    var cron = require('node-cron');
    cron.schedule('* * * * *', function() {
        console.log('running a task every minute');
        var Request = require('./api/request/request.model');
        var Provider = require('./api/provider/provider.model');
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
                if ((moment(request.validUntil).tz('Europe/Kiev') < moment().tz('Europe/Kiev'))) {
                    // request.requestclosed = true;
                    // Request.update({
                    //     _id: request._id
                    // }, request, {
                    //     upsert: true
                    // }, function(err) {
                    //     console.log('request closed: ');
                    // })
                } else {
                    Provider.find({
                        'service': request.service,
                        'rayon.slug': request.rayon.slug,
                        'user': {
                            $ne: request.user._id
                        },
                        'requesttype': {
                            $ne: 'newone'
                        }
                    }).exec(function(err, providers) {
                        console.log(providers.length)
                        if (providers.length > 0) {
                            providers.forEach(function(provider) {
                                if (request.potentialproviders.indexOf(provider._id) > -1) {
                                    console.log("array contains providerid: " + provider._id)
                                } else {
                                    request.potentialproviders.push(provider._id);
                                    Request.update({
                                        _id: request._id
                                    }, request, {
                                        upsert: true
                                    }, function(err) {
                                        console.log('added potential provider: ' + provider._id);
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    });
});
// Expose app
exports = module.exports = app;