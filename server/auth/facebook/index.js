'use strict';
var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var router = express.Router();
router.get('/modal', function(req, res, next) {
    if (req.query.requestid !== undefined) {
        req.session.requestid = req.query.requestid;
    } else {
        req.session.requestid = undefined;
    }
    passport.authenticate('facebook', {
        scope: ['email', 'user_about_me', 'user_friends'],
        failureRedirect: '/request/' + req.session.requestid,
        session: false
    })(req, res, next)
}, function() {}).get('/', function(req, res, next) {
    req.session.requestid = undefined;
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        session: false,
        scope: ['email', 'user_about_me', 'user_friends']
    })(req, res, next)
}, function() {}).get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
}), auth.setToken);
module.exports = router;
// 'use strict';
// var express = require('express');
// var passport = require('passport');
// var auth = require('../auth.service');
// var router = express.Router();
// router.get('/', passport.authenticate('facebook', {
//     scope: ['email', 'user_about_me', 'user_friends'],
//     failureRedirect: '/signup',
//     session: false
// })).get('/', passport.authenticate('facebook', {
//     scope: ['email', 'user_about_me', 'user_friends'],
//     failureRedirect: '/signup',
//     session: false
// })).get('/callback', passport.authenticate('facebook', {
//     failureRedirect: '/signup',
//     session: false
// }), auth.setToken);
// module.exports = router;