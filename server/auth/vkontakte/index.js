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
    passport.authenticate('vkontakte', {
        failureRedirect: '/request/' + req.session.requestid,
        session: false,
        scope: ['email']
    })(req, res, next)
}, function() {}).get('/', function(req, res, next) {
    req.session.requestid = undefined;
    passport.authenticate('vkontakte', {
        failureRedirect: '/login',
        session: false,
        scope: ['email']
    })(req, res, next)
}, function() {}).get('/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/login',
    session: false
}), auth.setToken);
module.exports = router;