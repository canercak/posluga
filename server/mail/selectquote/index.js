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
        placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.en !== undefined ? (', ' + request.gorad.en) : '');
    } else if (user.language === 'uk') {
        placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
    }
    var selectquotelocals = {
        TITLE: gt.gettext('You have selected a quote'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Congratulations! you have selected a quote for your'),
        TEXT2: gt.gettext('request.'),
        TEXT3: gt.gettext('After you select a quote, we recommend you to'),
        TEXT3a: gt.gettext('decide with the quote owner about the details of the work to be done.'),
        TEXT3b: gt.gettext('Especially for the tasks that are more than 10000 грн., we strongly recommend you to make a written and signed agreement about the details of the work to make it official.'),
        TEXT4: gt.gettext('In addition to that, we recommend you not to pay for the work beforehand. In cases where materials have to be bought or task has been completed partly, we recommend you only to pay for those materials or that part. Especially, if you have selected a service provider with less or no customer reviews, we recommend you to be more careful.'),
        TEXT5: gt.gettext('What will happen now?'),
        TEXT6: gt.gettext('The winning quoter will contact you as soon as possible about the details. You can also contact the quoter.'),
        TEXT7: gt.gettext('Posluga.ua is with you in every step.'),
        TEXT7b: gt.gettext('For any comments or questions please contact us with the email support@posluga.ua or phone 0850 333 22 00'),
        TEXT8: gt.gettext('Do not forget that the quoter has to ensure your satisfaction; because after you take the service, you can write a review on Posluga.ua and this will affect his future business.'),
        TEXT8b: gt.gettext('The power is in you, write a review!'),
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        LOOKATREQUEST: gt.gettext('Go To Request Page'),
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
    var title = gt.gettext('You have selected a quote for your') + ' ' + request.searchtext + ' ' + gt.gettext('request.') + ' (#' + request.sequence + ')';
    service.sendmail('selectquote', user, title, selectquotelocals, callback);
};
exports.sendMail = sendMail;