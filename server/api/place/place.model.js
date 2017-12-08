'use strict';
var mongoose = require('mongoose');
var PlaceSchema = new mongoose.Schema({
    oblast: {
        en: String,
        ru: String,
        uk: String,
        slug: String,
        ruinform: String,
        ukinform: String
    },
    rayon: {
        en: String,
        ru: String,
        uk: String,
        slug: String,
        ruinform: String,
        ukinform: String
    },
    gorad: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    rayongorad: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    rayonhasnamegorad: {
        type: Boolean,
        default: false
    },
    hasrayongorad: {
        type: Boolean,
        default: false
    },
    hasgorad: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Place', PlaceSchema);