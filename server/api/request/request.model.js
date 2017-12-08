'use strict';
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var autoIncrement = require('mongoose-auto-increment');
require('mongoose-middleware').initialize(mongoose);
var deepPopulate = require('mongoose-deep-populate')(mongoose);
autoIncrement.initialize(mongoose.connection);
var RequestSchema = new mongoose.Schema({
    searchtext: String,
    budget: Number,
    language: String,
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false,
        autopopulate: true
    },
    sendmail: {
        type: Boolean,
        default: false
    },
    providerpaid: {
        type: Boolean,
        default: false
    },
    requestclosed: {
        type: Boolean,
        default: false
    },
    answers: Array,
    description: String,
    files: [{
        location: String
    }],
    oblast: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    rayon: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    gorad: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    destoblast: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    destrayon: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    destgorad: {
        en: String,
        ru: String,
        uk: String,
        slug: String
    },
    when: {
        objectid: Number,
        name: String
    },
    date: Date,
    phone: String,
    email: String,
    address: String,
    validUntil: Date,
    firstname: String,
    lastname: String,
    sequence: Number,
    termsaccepted: Boolean,
    phonenotify: {
        objectid: Number,
        name: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    code: String,
    codesent: Date,
    notes: String,
    status: {
        objectid: {
            type: Number,
            default: 1
        },
        date: Date
    },
    cancelreason: {
        objectid: Number,
        name: String,
        reason: String
    },
    preselectedprovider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    requesttype: String,
    potentialproviders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        autopopulate: false
    }],
    admincomments: [{
        message: String,
        sentAt: Date,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: true
        }
    }],
    opportunityemailsent: [],
    quotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote"
    }]
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
RequestSchema.plugin(deepPopulate);
RequestSchema.plugin(autopopulate);
RequestSchema.plugin(autoIncrement.plugin, {
    model: 'Request',
    field: 'sequence',
    startAt: 3802,
    incrementBy: 1
});
module.exports = mongoose.model('Request', RequestSchema);