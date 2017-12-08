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
var sendMail = function(user, pass, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var loginlocals = {
        TITLE: gt.gettext('Your Login Details'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Welcome to Posluga.ua. We have created an account for you to check the status of your service requests. Your login details are as follows.'),
        LOGIN: gt.gettext('Login') + ': ' + user.email,
        PASSWORD: gt.gettext('Password') + ': ' + pass,
        TEXT2: gt.gettext('We recommend you to change your password from the settings page. If you do not want to remember it everytime, use Facebook or Vkontakte Login.'),
        LOGINBUTTON: gt.gettext('Go To Settings Page'),
        LOGINBUTTON_URL: address + '/settings?user=' + user._id,
        TERMS: address + '/uslovija-ekspluatacii',
        TEXT3: gt.gettext('If you have any questions, you can reach us from support@posluga.ua.'),
        PRIVACY: address + '/politika-konfidencialnosti',
        UNSUBSCRIBE: address + '/unsubscribe?id=' + user._id,
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        TERMSTEXT: gt.gettext('Terms'),
        PRIVACYTEXT: gt.gettext('Privacy'),
        UNSUBSCRIBETEXT: gt.gettext('Unsubscribe'),
        CONNECTWITHUS: gt.gettext('Connect with us'),
        CONTACTINFO: gt.gettext('Contact info'),
        EMAIL: gt.gettext('Email'),
        PHONE: gt.gettext('Phone')
    };
    service.sendmail('login', user, gt.gettext('Your Login Details'), loginlocals, callback);
};
exports.sendMail = sendMail;