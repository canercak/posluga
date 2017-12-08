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
    var winquotelocals = {
        TITLE: gt.gettext('You have won a new business'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Congratulations! you have won the'),
        TEXT2: gt.gettext('request you have quoted.'),
        TEXT3a: gt.gettext('Contact the customer and decide about the details of the work to be done.'),
        TEXT3b: gt.gettext('Especially for the tasks that are more than 10000 грн., we strongly recommend you to make a written and signed agreement about the details of the work to make it official.'),
        TEXT4: gt.gettext('When you complete your service, go to the quote page and'),
        TEXT4a: gt.gettext('confirm that you have completed the service - so we will send a notification to customer to write a review.'),
        TEXT4b: gt.gettext('Customer review is critical for your future business in Posluga.ua so we strongly recommend you to provide your best service and ask the customer to write you a good review.'),
        TEXT5: gt.gettext('What should I do now?'),
        TEXT6: gt.gettext('Contact the customer and decide about the details of the work to be done.'),
        TEXT7: gt.gettext('Go to quote page and click the button to confirm that you have completed the service.'),
        TEXT8: gt.gettext('Ensure the satisfaction of the customer and ask to write a good review.'),
        TEXT8a: gt.gettext('For any comments or questions please contact us on support@posluga.ua or phone 0850 333 22 00'),
        TEXT9: gt.gettext('Best Regards'),
        TEXT10: gt.gettext('Posluga.ua Team'),
        LOOKATREQUEST: gt.gettext('Go To Quote Page'),
        PHONENOTIFY: gt.gettext('Contact'),
        REQUESTNO: gt.gettext('Request No'),
        DETAILS: gt.gettext('Details'),
        TIME: gt.gettext('Time'),
        PLACE: gt.gettext('Place'),
        BUDGET: gt.gettext('Budget'),
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
        LOOKATREQUEST_URL: address + '/quotesuccess?id=' + quoteid + '&type=success&user=' + user._id,
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
    var title = gt.gettext('You have won a new business') + '. (#' + request.sequence + ')';
    service.sendmail('winquote', user, title, winquotelocals, callback);
};
exports.sendMail = sendMail;