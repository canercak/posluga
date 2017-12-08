 'use strict';
 var smsService = require('../../sms/sms.service.js');
 exports.sendVerification = function(req, res) {
     var smsresult = smsService.sendVerification(req.body);
     if (smsresult === false) {
         return res.status(404).send('Not Found');
     } else {
         return res.status(200).send('Sms Sent');
     }
 }