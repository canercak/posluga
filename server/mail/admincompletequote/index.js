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
var sendMail = function(admineditor, user, provider, request, servicex, quoteid, callback) {
    var filename = dir + admineditor.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(admineditor.language, fileContents);
    moment.locale(admineditor.language);
    var admincompletequotelocals = {
        TITLE: gt.gettext('Provider completed giving service. Make sure we get the payment and customer writes a review.') + '. (#' + request.sequence + ')',
        HINAME: gt.gettext('Hi') + ', ' + admineditor.name,
        TEXT1: gt.gettext('Provider completed giving service. Make sure we get the payment and customer writes a review.') + '. (#' + request.sequence + ')',
        admincompletequote: gt.gettext('Go To Request Page'),
        admincompletequote_URL: address + '/admin/requestlist?user=' + admineditor._id,
        COMPANYNAME: (provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname)),
        SERVICENAME: request.searchtext,
        LOOKATREQUEST: gt.gettext('Go To Request Page'),
        LOOKATREQUEST_URL: address + '/admin/requestlist?user=' + admineditor._id,
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
    var title = gt.gettext('Provider completed giving service. Make sure we get the payment and customer writes a review.') + '. (#' + request.sequence + ')';
    service.sendmail('admincompletequote', admineditor, title, admincompletequotelocals, callback);
};
exports.sendMail = sendMail;