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
var sendMail = function(user, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var welcomelocals = {
        TITLE: gt.gettext('Welcome'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Welcome to Posluga.ua. Our goal is to make hiring a local service providers simple and efficient. If you want to get some work done around the house, learn something new, stage a great event or need any other of the 100s of services that we offer, then get started here.'),
        TEXT2: gt.gettext('If you have any questions, you can reach us from support@posluga.ua.'),
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        GETQUOTE: gt.gettext('Get a Free Quote'),
        GETQUOTE_URL: address + '/request?type=new',
        TERMS: address + '/uslovija-ekspluatacii',
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
    service.sendmail('welcome', user, gt.gettext('Welcome'), welcomelocals, callback);
};
exports.sendMail = sendMail;