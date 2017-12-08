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
var sendMail = function(user, servicex, providerid, callback) {
    var filename = dir + user.language + '.po';
    var fs = require("fs");
    var fileContents = fs.readFileSync(filename);
    gt.addTextdomain(user.language, fileContents);
    moment.locale(user.language);
    var profilelocals = {
        TITLE: gt.gettext('New Service Profile'),
        TITLEz: gt.gettext('You created a service profile'),
        HINAME: gt.gettext('Hi') + ', ' + user.name,
        TEXT1: gt.gettext('Congrats! You have created your'),
        TEXT1a: gt.gettext('profile. As we find eligible customers and business opportunities, we will send you SMS and emails. New customers will come to your feet.'),
        TEXT1x: gt.gettext('When we determine your eligibility for new business opportunities, we look at various success and trust criteria. If you want more business oppurtunities, you can do these things:'),
        TEXT2: gt.gettext('Add your profile link to your webpage'),
        TEXT3: gt.gettext('If you have a website, add the link of your profile to your webpage. When you do it, not only you will get more business oppurtunities but you will also increase your rating in google and yandex searches.'),
        TEXT4: gt.gettext('Win business oppurtunities'),
        TEXT5: gt.gettext('It is important to win at least 1 of the first 15 quotes you give. The number of job opportunities we send to you will increase as you win. There are many ways to win a business opportunity. Create a complete profile page, reply to business opportunities on time and give reasonable price quotes.'),
        TEXT6: gt.gettext('Make your customers happy'),
        TEXT7: gt.gettext('Your customers and the number of job opportunities we send to you will increase as you get 5 star customer reviews. To get more business, do your job best and ask your customers to give you 5 star reviews.'),
        TEXT8: gt.gettext('How can we give you a better service? Please send your comments to: support@posluga.ua'),
        ADDLINK: gt.gettext('Start by Adding your profile link'),
        TEXTBESTREGARDS: gt.gettext('Best Regards'),
        TEXTPOSLUGATEAM: gt.gettext('Posluga.ua Team'),
        SERVICE: servicex,
        ADDLINK_URL: address + '/addlink?providerid=' + providerid + '&type=edit&user=' + user._id,
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
    service.sendmail('profile', user, gt.gettext('New Service Profile'), profilelocals, callback);
};
exports.sendMail = sendMail;