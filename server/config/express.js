/**
 * Express configuration
 */
'use strict';
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var connectMongo = require('connect-mongo');
var mongoose = require('mongoose');
var mongoStore = connectMongo(session);
module.exports = function(app) {
    var env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    // app.use(bodyParser.urlencoded({
    //     extended: false
    // }));
    // app.use(bodyParser.json());
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(session({
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: false,
        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            db: 'posluga'
        })
    }));
    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        //app.use(require('prerender-node').set('prerenderToken', 'pjgu6Wuy288hZbI57yPG'));
        app.use(require('prerender-node').set('prerenderServiceUrl', 'http://35.163.208.211:3000/').set('afterRender', function(err, req, prerender_res) {
            console.log('PRERENDER URL: ', req.url);
        }));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('appPath', config.root + '/public');
        app.use(morgan('dev'));
    }
    if ('development' === env || 'test' === env) {
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'client')));
        app.use(require('prerender-node').set('prerenderServiceUrl', 'http://35.163.208.211:3000/').set('afterRender', function(err, req, prerender_res) {
            console.log('PRERENDER URL: ', req.url);
        }));
        app.set('appPath', 'client');
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
    //FORCE SSL
    app.use(function(req, res, next) {
        if (req.headers['x-forwarded-proto'] === 'http') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        next();
    });
};