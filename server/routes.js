/**
 * Main application routes
 */
'use strict';
var errors = require('./components/errors');
var path = require('path');
var passport = require('passport');
module.exports = function(app) {
    app.get('auth/vkontakte', passport.authenticate('vkontakte'), function(req, res) {
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    })
    app.get('auth/vkontakte/callback', passport.authenticate('vkontakte', {
        failureRedirect: '/login'
    }), function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
    // Insert routes below
    // Insert routes below
    app.use('/api/servicegroups', require('./api/servicegroup'));
    app.use('/api/users', require('./api/user'));
    app.use('/auth', require('./auth'));
    app.use('/api/requests', require('./api/request'));
    app.use('/api/providers', require('./api/provider'));
    app.use('/api/articles', require('./api/article'));
    app.use('/api/preproviders', require('./api/preprovider'));
    app.use('/api/services', require('./api/service'));
    app.use('/api/places', require('./api/place'));
    app.use('/api/quotes', require('./api/quote'));
    app.use('/api/transactions', require('./api/transaction'));
    app.use('/api/aws', require('./api/aws'));
    app.use('/api/sms', require('./api/sms'));
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
    // All other routes should redirect to the index.html
    app.route('/*').get(function(req, res) {
        res.sendfile(app.get('appPath') + '/index.html');
    });
};