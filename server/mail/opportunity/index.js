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
var sendMail = function(user, provider, request, servicex, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var placestring = '';
    if (user.language === 'ru') {
        placestring = request.oblast.ru + ', ' + request.rayon.ru + (request.gorad.ru !== undefined ? (', ' + request.gorad.ru) : '');
    } else if (user.language === 'en') {
        placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.ru !== undefined ? (', ' + request.gorad.en) : '');
    } else if (user.language === 'uk') {
        placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
    }
    var opportunitylocals = {
        TITLE: gt.gettext('New Business Opportunity'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('You have a new'),
        TEXT2: gt.gettext('request. When this request reaches maximum quote count it will be closed for new quotes. If you are interested, give a quote now.'),
        PHONENOTIFY: gt.gettext('Contact'),
        REQUESTNO: gt.gettext('Request No'),
        DETAILS: gt.gettext('Details'),
        TIME: gt.gettext('Time'),
        PLACE: gt.gettext('Place'),
        BUDGET: gt.gettext('Budget'),
        TEXT3: gt.gettext('Give a quote for this job now and have a better service profile.'),
        TEXT4: gt.gettext('Give your quote fast. Customers tend to select the quotes that come in 24 hours. Make sure you have added your profile link to your webpage. Make sure you have nice photos and explanations about your services. A better profile leads to more earnings.'),
        TEXT6: gt.gettext('Do you want more business opportunities?'),
        TEXT7: gt.gettext('It is important to win at least 1 of the first 15 quotes you give. The number of job opportunities we send to you will increase as you win. There are many ways to win a business opportunity. Create a complete profile page, reply to business opurtunities on time and give reasonable price quotes.'),
        TEXT8: gt.gettext('How can we give you a better service? Please send your comments to: support@posluga.ua'),
        TEXT9: gt.gettext('Best Regards'),
        TEXT10: gt.gettext('Posluga.ua Team'),
        LOOKATREQUEST: gt.gettext('Give Quote'),
        PHONENOTIFYx: request.phonenotify.objectid === 1 ? gt.gettext('You can call the customer') : gt.gettext('Customer does not want to be called'),
        SERVICENAME: request.searchtext,
        LANGUAGE: user.language,
        REQUESTNOx: request.sequence,
        DETAILSx: request.description,
        QUESTIONS: (servicex !== null ? servicex.questions : []),
        ANSWERS: request.answers,
        BUDGETx: request.budget,
        TIMEx: (request.date && request.when.objectid === 1) ? moment().format('D MMMM YYYY HH:mm') : request.when.name,
        PLACEx: placestring,
        LOOKATREQUEST_URL: address + '/givequote?requestid=' + request._id + '&providerid=' + provider._id + '&user=' + user._id,
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
    service.sendmail('opportunity', user, (gt.gettext('There is a new business opportunity, give quote now') + '. (#' + request.sequence + ')'), opportunitylocals, callback);
};
exports.sendMail = sendMail;