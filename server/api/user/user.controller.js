'use strict';
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var local = require('../../auth/local/local.controller');
var mail = require('../../mail');
var validationError = function(res, err) {
    return res.json(422, err);
};
/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};
exports.adminindex = function(req, res) {
    var filteredQuery = {}
    var options = {
        sort: {},
        start: 0,
        count: req.query.per_page
    };
    if (req.query.filter !== ' ') {
        options.filters = {
            keyword: {
                fields: ['email'],
                term: req.query.filter
            }
        };
    }
    var param = req.query.sort;
    options.sort = {
        [param.trim()]: req.query.order
    }
    User.find(filteredQuery, '-salt -hashedPassword').deepPopulate('providers requests').sort('transactions').keyword(options).order(options).page(options, function(err, users) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(users);
    });
}
exports.changeLanguage = function(req, res, next) {
    var userId = req.user._id;
    User.findById(userId, function(err, user) {
        user.language = req.body.language;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
        });
    });
};
exports.changeName = function(req, res, next) {
    console.log(req.body._id);
    var userId = req.user._id;
    if (req.body._id !== undefined) {
        userId = req.body._id;
    }
    User.findById(userId, function(err, user) {
        user.name = req.body.name;
        user.picture = req.body.picture;
        user.email = req.body.email;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
        })
    });
}
exports.changeNotifications = function(req, res, next) {
    var userId = req.user._id;
    User.findById(userId, function(err, user) {
        user.notifications = req.body.notifications;
        user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
        })
    });
}
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    // newUser.providers = [];
    // newUser.picture = 'https://s3.eu-central-1.amazonaws.com/servicebox/static/avatar.png';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        if (newUser.createdbyrequest === false) {
            local.sendWelcomeEmail(user);
        }
        res.json({
            token: token,
            user: user
        });
    });
};
/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;
    User.findById({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user);
    });
};
/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};
/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);
    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};
/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};
/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};