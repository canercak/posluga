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
var sendMail = function(admineditor, user, provider, request, servicex, callback) {
    var filename = dir + admineditor.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(admineditor.language, fileContents);
    moment.locale(admineditor.language);
    var placestring = '';
    if (admineditor.language === 'ru') {
        placestring = request.oblast.ru + ', ' + request.rayon.ru + (request.gorad.en !== undefined ? (', ' + request.gorad.ru) : '');
    } else if (admineditor.language === 'en') {
        placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.ru !== undefined ? (', ' + request.gorad.en) : '');
    } else if (admineditor.language === 'uk') {
        placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
    }
    var adminselectquotelocals = {
        TITLE: gt.gettext('customer selected a quote for request') + ' ' + request.sequence,
        HINAME: gt.gettext('Hi') + ', ' + admineditor.name,
        TEXT1: gt.gettext('customer selected a quote for request') + ' ' + request.sequence,
        LOOKATREQUEST: gt.gettext('Go To Request Page'),
        PHONENOTIFY: gt.gettext('Contact'),
        REQUESTNO: gt.gettext('Request No'),
        DETAILS: gt.gettext('Details'),
        TIME: gt.gettext('Time'),
        PLACE: gt.gettext('Place'),
        BUDGET: gt.gettext('Budget'),
        PHONENOTIFYx: request.phonenotify.name,
        SERVICENAME: request.searchtext,
        LANGUAGE: admineditor.language,
        REQUESTNOx: request.sequence,
        DETAILSx: request.description,
        QUESTIONS: (servicex !== null ? servicex.questions : []),
        ANSWERS: request.answers,
        BUDGETx: request.budget,
        TIMEx: (request.date && request.when.objectid === 1) ? moment().format('D MMMM YYYY HH:mm') : request.when.name,
        PLACEx: placestring,
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
    var title = gt.gettext('customer selected a quote for request') + ' ' + request.searchtext + ' ' + gt.gettext('request') + '. (#' + request.sequence + ')';
    service.sendmail('adminselectquote', admineditor, title, adminselectquotelocals, callback);
};
exports.sendMail = sendMail;