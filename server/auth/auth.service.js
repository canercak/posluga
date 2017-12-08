'use strict';
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var Request = require('../api/request/request.model');
var Sms = require('../sms/sms.service.js');
var moment = require('moment-timezone');
var validateJwt = expressJwt({
    secret: config.secrets.session
});
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            User.findById(req.user._id, function(err, user) {
                if (err) return next(err);
                if (!user) return res.send(401);
                req.user = user;
                next();
            });
        });
}
/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');
    return compose().use(isAuthenticated()).use(function meetsRequirements(req, res, next) {
        if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
            next();
        } else {
            res.send(403);
        }
    });
}
/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
    return jwt.sign({
        _id: id
    }, config.secrets.session, {
        expiresInMinutes: 60 * 5
    });
}
/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
    if (!req.user) return res.json(404, {
        message: 'Something went wrong, please try again.'
    });
    var token = signToken(req.user._id, req.user.role);
    //res.redirect('/login/' + token);
    res.cookie('token', token);
    console.log("AAAAAAAA");
    console.log(req.session.requestid)
    if (req.session.requestid !== undefined) {
        res.redirect('/login/' + token);
        // Request.findOne({
        //     _id: req.session.requestid
        // }).exec(function(err, request) {
        //     if (err) {
        //         return res.status(500).send('Error in omniauth request');
        //     }
        //     if (!request) {
        //         return res.status(404).send('Not Found');
        //     }
        //     Request.findOne({
        //         phone: request.phone,
        //         user: req.user._id
        //     }).exec(function(err, phonerequest) {
        //         if (err) {
        //             return res.status(500).send('Error in phone request');
        //         }
        //         if (!phonerequest) {
        //             var code = Math.floor(1000 + Math.random() * 9000);
        //             request.code = code;
        //             request.codesent = moment.tz('Europe/Kiev');
        //             request.save().then(function() {
        //                 res.redirect('/login/' + token + '?requestid=' + request._id);
        //                 var body = {
        //                     'code': code,
        //                     'to': request.phone,
        //                     'language': request.language
        //                 }
        //                 console.log(body);
        //                 res.redirect('/phoneverify/' + request._id + '/' + request.phone);
        //                 // Sms.sendVerification(body).then(function() {
        //                 //     res.redirect('/login/' + token);
        //                 //     // done();
        //                 // }, function(error) {
        //                 //     console.log('Error', error);
        //                 //     done(error)
        //                 // })
        //             }, function(error) {
        //                 console.log('Error', error);
        //                 done(error)
        //             })
        //         } else {
        //             request.user = req.user._id;
        //             request.save();
        //             res.redirect('/success/' + request._id + '/save');
        //         }
        //     });
        // })
    } else {
        res.redirect('/login/' + token);
    }
}
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setToken = setToken;