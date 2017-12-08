 'use strict';
 var config = require('../config/environment');
 var Gettext = require("node-gettext");
 var gt = new Gettext();
 var fs = require("fs");
 var shorturl = require('shorturl');
 // var googl = require('goo.gl');
 // googl.setKey('aBcDeFGhIjKLMnOPqRsT');
 // googl.getKey();
 var SmsUkraine = require("node-smsukraine");
 var sms = new SmsUkraine({
     login: "905322814785",
     pass: "caner900",
     name: "POSLUGAUA"
 });

 function setGetText(language) {
     var dir = './po/'
     if (process.env.NODE_ENV === 'production') {
         dir = '../po/'
     }
     var filename = dir + language + '.po';
     var fs = require("fs");
     var fileContents = fs.readFileSync(filename);
     gt.addTextdomain(language, fileContents);
 }

 function newRequest(body) {
     // var link = 'http://posluga.ua/givequote/' + body.requestid + '/' + body.providerid + '/';
     // googl.shorten(link).then(function(shortUrl) {
     //     setGetText(body.language);
     //     var message1 = gt.gettext('New business opportunity!');
     //     var message2 = gt.gettext('A client in {{body.distict}} is looking for {{body.servicetext}} service. Give quote at: ');
     //     var message3 = shortUrl;
     //     var text = message1 + ' ' + message2 + ' ' + message3 + ' (#' + body.sequence + ')';
     //     var data = {
     //         to: body.to,
     //         text: text
     //     };
     //     console.log("NEW REQUEST SMS:" + "to=>" + String(data.to) + " text=>" + data.text)
     //     return true;
     //     // sms.send(data, function(err, sms_data) {
     //     //     if (err) {
     //     //         console.log(JSON.stringify(err));
     //     //         return false; //res.status(500).end();
     //     //     } else {
     //     //         console.log(JSON.stringify(sms_data)); // eg {"id":335024466,"sms_count":1}
     //     //         return false; //res.status(201).end();
     //     //     }
     //     // })
     // }).catch(function(err) {
     //     console.error(err.message);
     // });
 }
 exports.newQuote = function(body) {
     console.log("body:" + body);
     var link = 'https://posluga.ua/viewquotes?requestid=' + body.requestid + '&quoteid=' + body.quoteid + '&user=' + body.userid
     shorturl(link, function(shorurl) {
         setGetText(body.language);
         var message1 = gt.gettext('You have received a quote of {{body.price}} for your {{body.service}} service. Look at:');
         var text = message1 + ' ' + shorurl + ' (#' + body.sequence + ')';
         var data = {
             to: body.to,
             text: text
         };
         console.log("NEW QUOTE SMS:" + "to=>" + String(data.to) + " text=>" + data.text)
         return true;
         sms.send(data, function(err, sms_data) {
             if (err) {
                 console.log(JSON.stringify(err));
                 return false; //res.status(500).end();
             } else {
                 console.log(JSON.stringify(sms_data)); // eg {"id":335024466,"sms_count":1}
                 return true; //res.status(201).end();
             }
         })
     });
 }
 exports.sendVerification = function(body) {
     console.log("body:" + body.code);
     setGetText(body.language);
     var message = gt.gettext('is the code to complete your verification on Posluga.ua');
     var text = body.code + ' ' + message;
     var to = body.to;
     var data = {
         to: to,
         text: text
     };
     console.log("VERIFICATION SMS:" + "to=>" + String(data.to) + "text=>" + data.text)
     if (process.env.NODE_ENV === "production") {
         sms.send(data, function(err, sms_data) {
             if (err) {
                 console.log(JSON.stringify(err));
                 return false;
             } else {
                 console.log(JSON.stringify(sms_data));
                 return true
             }
         })
     } else {
         return true
     }
 }