'use strict';

var express = require('express');
var controller = require('./aws.controller');

var router = express.Router();

router.get('/config', controller.getClientConfig);
router.get('/getS3Policy', controller.getS3Policy);


module.exports = router;
 