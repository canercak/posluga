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
    var writereviewlocals = {
        TITLE: gt.gettext('Write a review to help others'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Your service provider'),
        TEXT2: gt.gettext('notified us that they have completed providing your'),
        TEXT3: gt.gettext('service.'),
        TEXT4: gt.gettext('Write a review for the service you have received, because it will help immensely to other users, to your service provider and to us.'),
        TEXT5: gt.gettext('It takes just 20 seconds to help people. Click the button below to use your power now.'),
        TEXT6: gt.gettext('For any comments or questions please contact us on support@posluga.ua or phone 0850 333 22 00'),
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        WRITEREVIEW: gt.gettext('Write Review Now'),
        WRITEREVIEW_URL: address + '/comment?id=' + quoteid + '&type=new&user=' + user._id,
        COMPANYNAME: (provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname)),
        SERVICENAME: request.searchtext,
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
    var title = gt.gettext('Write a review to help others') + '. (#' + request.sequence + ')';
    service.sendmail('writereview', user, title, writereviewlocals, callback);
};
exports.sendMail = sendMail;