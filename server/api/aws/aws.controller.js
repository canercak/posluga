 'use strict';
 var AWS = require('aws-sdk'),
     crypto = require('crypto'),
     config = require('./aws.json'),
     createS3Policy,
     getExpiryTime;
 // Get aws congif
 exports.getClientConfig = function(req, res, next) {
     return res.status(200).json({
         awsConfig: {
             bucket: config.bucket
         }
     })
 };
 exports.getS3Policy = function(req, res) {
     createS3Policy(req.query.mimeType, function(creds, err) {
         if (!err) {
             return res.status(200).send(creds);
         } else {
             return res.status(500).send(err);
         }
     });
 };
 getExpiryTime = function() {
     var _date = new Date();
     return '' + (_date.getFullYear()) + '-' + (_date.getMonth() + 1) + '-' + (_date.getDate() + 1) + 'T' + (_date.getHours() + 3) + ':' + '00:00.000Z';
 };
 createS3Policy = function(contentType, callback) {
     var date = new Date();
     var s3Policy = {
         'expiration': getExpiryTime(),
         'conditions': [
             ['starts-with', '$key', 'uploadedfiles/'], {
                 'bucket': config.bucket
             }, {
                 'acl': 'public-read'
             },
             ['starts-with', '$Content-Type', contentType], {
                 'success_action_status': '201'
             }
         ]
     };
     // stringify and encode the policy
     var stringPolicy = JSON.stringify(s3Policy);
     var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');
     // sign the base64 encoded policy
     var signature = crypto.createHmac('sha1', config.secretAccessKey).update(new Buffer(base64Policy, 'utf-8')).digest('base64');
     // build the results object
     var s3Credentials = {
         s3Policy: base64Policy,
         s3Signature: signature,
         AWSAccessKeyId: config.accessKeyId
     };
     // send it back
     callback(s3Credentials);
 };