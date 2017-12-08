'use strict';
var config = require('../config/environment');
var nodemailer = require("nodemailer");
var _ = require('lodash');
var sgTransport = require('nodemailer-sendgrid-transport');
var mailer = nodemailer.createTransport(sgTransport(config.mail.api));
var emailTemplates;
require('email-templates')(__dirname, {
    open: '{{',
    close: '}}'
}, function(err, _emailTemplates) {
    if (err) {
        console.log('Error on opening template:');
        console.log(err);
    } else {
        emailTemplates = _emailTemplates;
    }
});
var generateMail = function(templateName, locals, callback) {
    emailTemplates(templateName, locals, function(err, html, text) {
        if (err) {
            console.log('Error on generating mail:');
            console.log(err);
        } else {
            callback(html);
        }
    });
};
exports.sendmail = function(templateName, user, subject, locals, callback) {
    console.log("33333333")
        // if (process.env.ENV_VARIABLE === 'production') {
        //     console.log("sending mail in production mode")
    var cb = callback || _.noop;
    console.log('Send ' + subject + 'Mail');
    generateMail(templateName, locals, function(html) {
        var mailOptions = {
            from: config.mail.from.email,
            to: user.email,
            subject: subject,
            html: html,
        };
        mailer.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error on sending' + subject + ' mail:');
                console.log(error);
                console.log(config.mail);
            } else {
                console.log(subject + 'Mail sent: ');
                //console.log(info);
                cb(info.response);
            }
        });
    });
    // } else {
    //     console.log("not sending mail because its not production mode");
    // }
};