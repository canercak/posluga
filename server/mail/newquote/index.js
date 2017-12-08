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
var sendMail = function(user, request, quote, provider, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var newquotelocals = {
        TITLE: gt.gettext('You have received a quote'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Congratulations! You have received a quote for your'),
        TEXT2: gt.gettext('request. If you have any questions, send message to the quoter.'),
        TEXT3: gt.gettext('What should I do?'),
        TEXT4: gt.gettext('Read customer reviews of the quoter, check his profile. If there are other quotes, compare this quote with them. If not, wait for them to come until the quoting closes. If you think this quote is the best, select this quote.'),
        TEXT5: gt.gettext('Best Regards'),
        TEXT6: gt.gettext('Posluga.ua Team'),
        PRICE: gt.gettext('Price'),
        TIME: gt.gettext('Time'),
        MESSAGE: gt.gettext('Message to you'),
        MESSAGEx: quote.chat[0].message,
        PRICEx: (quote.price.value) + ' ' + quote.price.currency,
        TIMEx: (quote.date && quote.when.objectid === 1) ? moment(quote.date).format('D MMMM YYYY HH:mm') : quote.when.name,
        COMPANYNAME: provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname),
        LOGO: provider.logo.location,
        SERVICENAME: request.searchtext,
        QUOTEPAGE1: gt.gettext('View Quote'),
        QUOTEPAGE_URL: address + '/viewquotes?requestid=' + request._id + '&quoteid=' + quote._id + '&user=' + user._id,
        TERMS: address + '/uslovija-ekspluatacii',
        PRIVACY: address + '/politika-konfidencialnosti',
        UNSUBSCRIBE: address + '/unsubscribe?id=' + user._id,
        TERMSTEXT: gt.gettext('Terms'),
        PRIVACYTEXT: gt.gettext('Privacy'),
        UNSUBSCRIBETEXT: gt.gettext('Unsubscribe'),
        CONNECTWITHUS: gt.gettext('Connect with us'),
        CONTACTINFO: gt.gettext('Contact info'),
        EMAIL: gt.gettext('Email'),
        PHONE: gt.gettext('Phone')
    };
    service.sendmail('newquote', user, (gt.gettext('You have received a quote') + '. (#' + request.sequence + ')'), newquotelocals, callback);
};
exports.sendMail = sendMail