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
var sendMail = function(usercustomer, userprovider, provider, request, servicex, callback) {
    var filename = dir + userprovider.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(userprovider.language, fileContents);
    moment.locale(userprovider.language);
    var placestring = '';
    if (userprovider.language === 'ru') {
        placestring = request.oblast.ru + ', ' + request.rayon.ru + (request.gorad.ru !== undefined ? (', ' + request.gorad.ru) : '');
    } else if (userprovider.language === 'en') {
        placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.en !== undefined ? (', ' + request.gorad.en) : '');
    } else if (userprovider.language === 'uk') {
        placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
    }
    var usrwants = usercustomer.name + ' ' + gt.gettext('requests a price quote from you.');
    var chosenproviderlocals = {
        TITLE: usrwants,
        HINAME: (gt.gettext('Hi') + ', ' + userprovider.name),
        TEXT1: usrwants,
        TEXT2: gt.gettext('The user has chosen only you to get a price quote, so know that this is a potential business and send a quote as soon as possible.'),
        PHONENOTIFY: gt.gettext('Contact'),
        REQUESTNO: gt.gettext('Request No'),
        DETAILS: gt.gettext('Details'),
        TIME: gt.gettext('Time'),
        PLACE: gt.gettext('Place'),
        BUDGET: gt.gettext('Budget'),
        TEXT3: gt.gettext('Give a quote for this job now and have a better service profile.'),
        TEXT4: gt.gettext('Give your quote fast. Customers tend to select the quotes that come in 24 hours. Make sure you have added your profile link to your webpage. Make sure you have nice photos and explanations about your services. A better profile leads to more earnings.'),
        TEXT6: gt.gettext('Do you want more business opportunities?'),
        TEXT7: gt.gettext('It is important to win at least 1 of the first 15 quotes you give. The number of job opportunities we send to you will increase as you win. There are many ways to win a business chosenprovider. Create a complete profile page, reply to business opportunities on time and give reasonable price quotes.'),
        TEXT8: gt.gettext('How can we give you a better service? Please send your comments to: support@posluga.ua'),
        TEXT9: gt.gettext('Best Regards'),
        TEXT10: gt.gettext('Posluga.ua Team'),
        LOOKATREQUEST: gt.gettext('Give a quote to this request'),
        PHONENOTIFYx: request.phonenotify.objectid === 1 ? gt.gettext('You can call the customer') : gt.gettext('Customer does not want to be called'),
        SERVICENAME: request.searchtext,
        LANGUAGE: userprovider.language,
        REQUESTNOx: request.sequence,
        DETAILSx: request.description,
        QUESTIONS: (servicex !== null ? servicex.questions : []),
        ANSWERS: request.answers,
        BUDGETx: request.budget,
        TIMEx: (request.date && request.when.objectid === 1) ? moment().format('D MMMM YYYY HH:mm') : request.when.name,
        PLACEx: placestring,
        LOOKATREQUEST_URL: address + '/givequote?requestid=' + request._id + '&providerid=' + provider._id + '&user=' + userprovider._id,
        TERMS: address + '/uslovija-ekspluatacii',
        PRIVACY: address + '/politika-konfidencialnosti',
        UNSUBSCRIBE: address + '/unsubscribe?id=' + userprovider._id,
        TERMSTEXT: gt.gettext('Terms'),
        PRIVACYTEXT: gt.gettext('Privacy'),
        UNSUBSCRIBETEXT: gt.gettext('Unsubscribe'),
        CONNECTWITHUS: gt.gettext('Connect with us'),
        CONTACTINFO: gt.gettext('Contact info'),
        EMAIL: gt.gettext('Email'),
        PHONE: gt.gettext('Phone')
    };
    service.sendmail('chosenprovider', userprovider, (usrwants + ' (#' + request.sequence + ')'), chosenproviderlocals, callback);
};
exports.sendMail = sendMail;