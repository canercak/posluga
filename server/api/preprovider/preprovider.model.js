'use strict';
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
require('mongoose-middleware').initialize(mongoose);
var PreproviderSchema = new mongoose.Schema({
    businesstype: {
        objectid: Number,
        name: String
    },
    firstname: String,
    lastname: String,
    company: String,
    email: String,
    phone: String,
    phone2: String,
    landline: String,
    created: {
        type: Boolean,
        default: false
    },
    resolvedaddress: String,
    updatedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    deletedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    updated: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    website: String,
    address: String,
    description: String,
    photo: String,
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    extraaddresses: [{
        email: String,
        phone: String,
        phone2: String,
        resolvedaddress: String,
        address: String,
        enableRayonGorad: Boolean,
        enableGorad: Boolean,
        enableRayon: Boolean,
        showGorad: Boolean,
        showRayonGorad: Boolean,
        rayonOptions: {},
        goradOptions: {},
        rayongoradOptions: {},
        oblastOptions: {},
        oblast: {
            slug: String,
            en: String,
            ru: String,
            uk: String
        },
        rayon: {
            slug: String,
            en: String,
            ru: String,
            uk: String
        },
        gorad: {
            slug: String,
            en: String,
            ru: String,
            uk: String
        },
        rayongorad: {
            slug: String,
            en: String,
            ru: String,
            uk: String
        }
    }],
    services: [{
        name: String,
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            autopopulate: true
        },
        images: [{
            url: String
        }]
    }],
    oblast: {
        slug: String,
        en: String,
        ru: String,
        uk: String
    },
    rayon: {
        slug: String,
        en: String,
        ru: String,
        uk: String
    },
    gorad: {
        slug: String,
        en: String,
        ru: String,
        uk: String
    },
    rayongorad: {
        slug: String,
        en: String,
        ru: String,
        uk: String
    } 
}, {
    timestamps: true,
    versionKey: false
});
PreproviderSchema.plugin(autopopulate);
module.exports = mongoose.model('Preprovider', PreproviderSchema);