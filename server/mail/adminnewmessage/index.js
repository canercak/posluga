'use strict';
var service = require('./../mail.service.js');
var Gettext = require("node-gettext");
var gt = new Gettext();
var moment = require('moment');
var address = "http://localhost:9000"
var dir = './po/'
if (process.env.NODE_ENV === 'production') {
    address = 'https://posluga.ua'
    dir = '../po/'
}
var sendMail = function(user, provider, request, servicex, toprovider, quoteid, message, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var placestring = '';
    if (user.language === 'ru') {
        placestring = request.oblast.ru + ', ' + request.rayon.ru + (request.gorad.ru !== undefined ? (', ' + request.gorad.ru) : '');
    } else if (user.language === 'en') {
        placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.en !== undefined ? (', ' + request.gorad.en) : '');
    } else if (user.language === 'uk') {
        placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
    }
    var newmaillocals = {
        TITLE: gt.gettext('User sent a message for the request') + ' ' + request.sequence,
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('User sent a message for the request') + ' ' + request.sequence,
        MESSAGE: message,
        REPLYMESSAGE: gt.gettext('Go To Request Page'),
        REPLY_URL: address + '/admin/requestlist?user=' + user._id,
        TEXT3: gt.gettext('If you have any questions, you can reach us from support@posluga.ua.'),
        TERMS: address + '/uslovija-ekspluatacii',
        PRIVACY: address + '/politika-konfidencialnosti',
        UNSUBSCRIBE: address + '/unsubscribe?id=' + user._id,
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        TERMSTEXT: gt.gettext('Terms'),
        PRIVACYTEXT: gt.gettext('Privacy'),
        UNSUBSCRIBETEXT: gt.gettext('Unsubscribe'),
        CONNECTWITHUS: gt.gettext('Connect with us'),
        CONTACTINFO: gt.gettext('Contact info'),
        EMAIL: gt.gettext('Email'),
        PHONE: gt.gettext('Phone')
    };
    var title = gt.gettext('User sent a message for the request') + '. (#' + request.sequence + ')';
    service.sendmail('adminnewmessage', user, title, newmaillocals, callback);
};
exports.sendMail = sendMail;