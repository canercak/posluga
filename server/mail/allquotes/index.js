    'use strict';
    var service = require('./../mail.service.js');
    var Gettext = require("node-gettext");
    var gt = new Gettext();
    var moment = require('moment');
    var address = "http://localhost:9000"
    var dir = './po/'
    if (process.env.NODE_ENV === 'production') {
        address = 'https://posluga.ua'
        dir = './po/'
    }
    var sendMail = function(user, request, servicex, callback) {
        var filename = dir + user.language + '.po';
        var fs = require("fs");
        var fileContents = fs.readFileSync(filename);
        moment.locale(user.language);
        var placestring = '';
        if (user.language === 'ru') {
            placestring = request.oblast.ru + ', ' + request.rayon.ru + (request.gorad.ru !== undefined ? (', ' + request.gorad.ru) : '');
        } else if (user.language === 'en') {
            placestring = request.oblast.en + ', ' + request.rayon.en + (request.gorad.en !== undefined ? (', ' + request.gorad.en) : '');
        } else if (user.language === 'uk') {
            placestring = request.oblast.uk + ', ' + request.rayon.uk + (request.gorad.uk !== undefined ? (', ' + request.gorad.uk) : '');
        }
        var allquoteslocals = {
            TITLE: gt.gettext('All Quotes Received'),
            HINAME: gt.gettext('Hi') + ', ' + user.name,
            TEXT1: gt.gettext('You have received'),
            TEXT2: gt.gettext('quotes for your'),
            TEXT3: gt.gettext('request.'),
            TEXT4: gt.gettext('If you need more information to decide, send message to quoters. You can click the button below to go quote selection page.'),
            TEXT5: gt.gettext('Once you decide,'),
            TEXT5a: gt.gettext('select that quote and make an appointment.'),
            TEXT6: gt.gettext('After you take your service,'),
            TEXT6a: gt.gettext('Write a review for the service you have taken because the world needs your review!'),
            TEXT6b: gt.gettext('Your review helps other consumers and rewards the service providers who has done a good work.'),
            TEXT7: gt.gettext('For your security and satisfaction, we recommend you to make a written aggreement with the service provider and not to pay any amount before the work done.'),
            TEXT8: gt.gettext('If you have any questions, you can reach us from support@posluga.ua.'),
            TEXTBESTREGARDS: gt.gettext('Best Regards'),
            TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
            QUOTECOUNT: request.quotes.count,
            SERVICENAME: request.searchtext,
            QUOTEPAGE: gt.gettext('View Quotes'),
            QUOTEPAGE_URL: address + '/viewquotes?requestid=' + request._id + '&user=' + user._id,
            PHONENOTIFY: gt.gettext('Contact'),
            REQUESTNO: gt.gettext('Request No'),
            DETAILS: gt.gettext('Details'),
            TIME: gt.gettext('Time'),
            PLACE: gt.gettext('Place'),
            BUDGET: gt.gettext('Budget'),
            PHONENOTIFYx: request.phonenotify.name,
            LANGUAGE: user.language,
            REQUESTNOx: request.sequence,
            DETAILSx: request.description,
            QUESTIONS: (servicex !== null ? servicex.questions : []),
            ANSWERS: request.answers,
            BUDGETx: request.budget,
            TIMEx: (request.date && request.when.objectid === 1) ? moment().format('D MMMM YYYY HH:mm') : request.when.name,
            PLACEx: placestring,
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
        service.sendmail('allquotes', user, gt.gettext('All quotes received, time to decide') + '. (#' + request.sequence + ')', allquoteslocals, callback);
    };
    exports.sendMail = sendMail;