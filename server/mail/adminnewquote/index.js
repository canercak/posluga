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
var sendMail = function(admineditor, user, request, quote, provider, callback) {
    var filename = dir + admineditor.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(admineditor.language, fileContents);
    moment.locale(admineditor.language);
    var adminnewquotelocals = {
        TITLE: gt.gettext('Provider sent a quote to a customer for request') + ' ' + request.sequence,
        HINAME: gt.gettext('Hi') + ', ' + admineditor.name,
        TEXT1: gt.gettext('Provider sent a quote to a customer for request') + ' ' + request.sequence,
        PRICE: gt.gettext('Price'),
        TIME: gt.gettext('Time'),
        MESSAGE: gt.gettext('Message to you'),
        MESSAGEx: quote.chat[0].message,
        PRICEx: (quote.price.value) + ' ' + quote.price.currency,
        TIMEx: (quote.date && quote.when.objectid === 1) ? moment(quote.date).format('D MMMM YYYY HH:mm') : quote.when.name,
        COMPANYNAME: provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname),
        LOGO: provider.logo.location,
        SERVICENAME: request.searchtext,
        QUOTEPAGE: gt.gettext('Go To Request Page'),
        QUOTEPAGE_URL: address + '/admin/requestlist?user=' + admineditor._id,
        TERMS: address + '/uslovija-ekspluatacii',
        PRIVACY: address + '/politika-konfidencialnosti',
        UNSUBSCRIBE: address + '/unsubscribe?id=' + admineditor._id,
        TERMSTEXT: gt.gettext('Terms'),
        PRIVACYTEXT: gt.gettext('Privacy'),
        UNSUBSCRIBETEXT: gt.gettext('Unsubscribe'),
        CONNECTWITHUS: gt.gettext('Connect with us'),
        CONTACTINFO: gt.gettext('Contact info'),
        EMAIL: gt.gettext('Email'),
        PHONE: gt.gettext('Phone')
    };
    service.sendmail('adminnewquote', admineditor, (gt.gettext('Provider sent a quote to a customer for request') + '. (#' + request.sequence + ')'), adminnewquotelocals, callback);
};
exports.sendMail = sendMail