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
    console.log(toprovider)
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
    var replyperson = (toprovider === true ? provider.user : user);
    var x = (toprovider !== true ? (provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname)) : gt.gettext('the customer'));
    var textx = gt.gettext('You have a new message from') + ' ' + x + ' ' + gt.gettext('about') + ' ' + request.searchtext + ' ' + gt.gettext('request') + '. (#' + request.sequence + ')'
    var replyurl = "";
    if (request.status.objectid === 4 || request.status.objectid === 5 ) {
        replyurl = address + '/quotesuccess?id=' + quoteid + '&type=success&user=' + replyperson._id;
    } else if (request.status.objectid === 3) {
        if (toprovider) {
            replyurl = address + '/quotedetail?id=' + quoteid + '&user=' + replyperson._id;
        } else {
            replyurl = address + '/viewquotes?requestid=' + request._id + '&quoteid=' + quoteid + '&user=' + replyperson._id;
        }
    }
    var newmaillocals = {
        TITLE: gt.gettext('You have a new message'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: textx,
        MESSAGE: message,
        REPLYMESSAGE: gt.gettext('Reply to Message'),
        REPLY_URL: replyurl,
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
    console.log("dsadsdsa3333")
    var title = gt.gettext('You have a new message') + '. (#' + request.sequence + ')';
    service.sendmail('newmessage', replyperson, title, newmaillocals, callback);
};
exports.sendMail = sendMail;