'use strict';
var express = require('express');
var controller = require('./preprovider.controller');
var router = express.Router();
var auth = require('../../auth/auth.service');
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', controller.show);
router.get('/admincheckphone/:phone', controller.admincheckphone);
router.get('/admincheckemail/:email', controller.admincheckemail);
router.get('/admincheckwebsite/:protocol/:host', controller.admincheckwebsite);
router.post('/', controller.create);
router.post('/crawlpage', controller.crawlpage);
router.get('/findaddress/:address', controller.findaddress);
router.get('/translate/:text', controller.translate);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);
module.exports = router;