'use strict';
var express = require('express');
var controller = require('./place.controller');
var router = express.Router();
var auth = require('../../auth/auth.service');
router.get('/oblasts/all/:language', controller.showOblasts);
router.get('/rayons/:oblast/:language', controller.showRayonsByOblast);
router.get('/gorads/:rayon/:oblast/:language', controller.showGoradsByRayon);
router.get('/rayongorads/:oblast/:gorad/:rayon/:language', controller.showRayongoradsByGorad);
router.get('/findfromslugoblast/:oblast', controller.findFromSlugOblast);
router.get('/findfromslugrayon/:oblast/:rayon', controller.findFromSlugRayon);
router.get('/findfromsluggorad/:oblast/:rayon/:gorad', controller.findFromSlugGorad);
router.get('/findfromslugrayongorad/:oblast/:rayon/:gorad/:rayongorad', controller.findFromSlugRayonGorad);
router.get('/placebyslug/:oblast/:rayon/:gorad/:rayongorad', controller.showPlaceBySlug);
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;