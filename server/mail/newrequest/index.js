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
var sendMail = function(user, request, servicex, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var placestring = '';
    console.log("XXXXXXXXXXXX")
    console.log(request.gorad)
    if (user.language === 'ru') {
        placestring = request.oblast.ru + ', ' + request.rayon.ru + (request.gorad.ru !== undefined ? (', ' + request.gorad.ru) : '');
    } else if (user.language === 'en') {
        placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.en !== undefined ? (', ' + request.gorad.en) : '');
    } else if (user.language === 'uk') {
        placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
    }
    var newrequestlocals = {
        TITLE: gt.gettext('We have received your request'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('We have received your'),
        TEXT2: gt.gettext('request. You will be receiving price quotes as soon as possible.'),
        PHONENOTIFY: gt.gettext('Contact'),
        REQUESTNO: gt.gettext('Request No'),
        DETAILS: gt.gettext('Details'),
        TIME: gt.gettext('Time'),
        PLACE: gt.gettext('Place'),
        BUDGET: gt.gettext('Budget'),
        TEXT3: gt.gettext('What will happen now?'),
        TEXT4: gt.gettext('We will first review your request. If we have any questions we will ask you by phone or email.'),
        TEXT7: gt.gettext('You will be receiving notifications about price quotes with email and SMS in 24 hours. You can review these quotes in your account page and you can choose the one you prefer.'),
        TEXT8: gt.gettext('Once you choose a quote, we recommend you to make a written aggreement with the firm about the work to be done.'),
        TEXT9: gt.gettext('If you have any questions, you can reach us from support@posluga.ua.'),
        TEXT10: gt.gettext('Best Regards'),
        TEXT11: gt.gettext('Posluga.ua Team'),
        LOOKATREQUEST: gt.gettext('Go To Request Page'),
        PHONENOTIFYx: request.phonenotify.name,
        SERVICENAME: request.searchtext,
        LANGUAGE: user.language,
        REQUESTNOx: request.sequence,
        DETAILSx: request.description,
        QUESTIONS: (servicex !== null ? servicex.questions : []),
        ANSWERS: request.answers,
        BUDGETx: request.budget,
        TIMEx: (request.date && request.when.objectid === 1) ? moment().format('D MMMM YYYY HH:mm') : request.when.name,
        PLACEx: placestring,
        LOOKATREQUEST_URL: address + '/requestdetail?id=' + request._id + '&user=' + user._id,
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
    service.sendmail('newrequest', user, gt.gettext('We have received your request') + '. (#' + request.sequence + ')', newrequestlocals, callback);
};
exports.sendMail = sendMail;