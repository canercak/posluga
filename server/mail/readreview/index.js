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
var sendMail = function(user, provider, request, servicex, quoteid, callback) {
    var filename = dir + provider.user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(provider.user.language, fileContents);
    moment.locale(user.language);
    var readreviewlocals = {
        TITLE: gt.gettext('Customer wrote a review for your service'),
        HINAME: gt.gettext('Hi') + ', ' + provider.user.name,
        TEXT1: gt.gettext('Your customer'),
        TEXT2: gt.gettext('wrote a review for your'),
        TEXT3: gt.gettext('service.'),
        TEXT4: gt.gettext('You can read your review by clicking on button below'),
        TEXT6: gt.gettext('For any comments or questions please contact us on support@posluga.ua or phone 0850 333 22 00'),
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        READREVIEW: gt.gettext('Read Review'),
        READREVIEW_URL: address + '/comment?id=' + quoteid + '&type=read&user=' + provider.user._id,
        COMPANYNAME: (provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname)),
        SERVICENAME: request.searchtext,
        TERMS: address + '/uslovija-ekspluatacii',
        PRIVACY: address + '/politika-konfidencialnosti',
        UNSUBSCRIBE: address + '/unsubscribe?id=' + provider.user._id,
        TERMSTEXT: gt.gettext('Terms'),
        PRIVACYTEXT: gt.gettext('Privacy'),
        UNSUBSCRIBETEXT: gt.gettext('Unsubscribe'),
        CONNECTWITHUS: gt.gettext('Connect with us'),
        CONTACTINFO: gt.gettext('Contact info'),
        EMAIL: gt.gettext('Email'),
        PHONE: gt.gettext('Phone')
    };
    var title = gt.gettext('Customer wrote a review for your service') + '. (#' + request.sequence + ')';
    service.sendmail('readreview', provider.user, title, readreviewlocals, callback);
};
exports.sendMail = sendMail;