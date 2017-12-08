'use strict';
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var autoIncrement = require('mongoose-auto-increment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
autoIncrement.initialize(mongoose.connection);
var ProviderSchema = new mongoose.Schema({
    businesstype: {
        objectid: Number,
        name: String
    },
    firstname: String,
    lastname: String,
    company: String,
    phone: String,
    landline: String,
    phonelist: Array,
    website: String,
    address: String,
    searchtext: String,
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        autopopulate: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        autopopulate: true
    },
    description: String,
    logo: {
        location: String
    },
    files: [{
        location: String
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
    },
    adminCreated: {
        type: Boolean,
        default: false
    },
    hasincominglink: {
        type: Boolean,
        default: false
    },
    slug: {
        cyril: {
            uk: String,
            ru: String
        },
        latin: {
            uk: String,
            ru: String,
            en: String
        }
    },
    links: [{
        objectid: Number,
        name: String,
        incominglink: String,
        outgoinglink: String,
        image: String
    }],
    stats: {
        securitychecks: [{
            objectid: Number,
            value: Number
        }],
        recommended: {
            type: Boolean,
            default: false
        },
        totalscore: {
            type: Number,
            default: 0
        },
        reviewscore: {
            type: Number,
            default: 0
        },
        scorefive: {
            type: String,
            default: "0"
        },
        quotecount: {
            type: Number,
            default: 0
        },
        quotewincount: {
            type: Number,
            default: 0
        },
        happycount: {
            type: Number,
            default: 0
        },
        reviewcount: {
            type: Number,
            default: 0
        },
        turnover: {
            currency: {
                type: String,
                default: 'грн.'
            },
            value: {
                type: Number,
                default: 0
            },
        },
        finishedcount: {
            type: Number,
            default: 0
        },
        prices: {
            currency: {
                type: String,
                default: 'грн.'
            },
            lowprice: {
                type: Number,
                default: 0
            },
            highprice: {
                type: Number,
                default: 0
            }
        },
        priority: {
            initial: {
                type: Number,
                default: 0
            },
            profilecomplete: {
                type: Number,
                default: 0
            }
        },
        profile: {
            completeness: Number,
            issues: [{
                objectid: Number,
                name: String,
                element: String
            }]
        }
    },
    termsaccepted: Boolean,
    creditcard: String,
    established: {
        objectid: Number,
        name: String
    },
    documents: [{
        doctype: {
            objectid: Number,
            name: String
        },
        docname: String,
        docnumber: String,
        docdate: Date,
        docfile: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    quotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
        autopopulate: true
    }]
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
ProviderSchema.plugin(autopopulate);
ProviderSchema.plugin(deepPopulate);
ProviderSchema.plugin(autoIncrement.plugin, {
    model: 'Provider',
    field: 'sequence',
    startAt: 12332,
    incrementBy: 1
});
module.exports = mongoose.model('Provider', ProviderSchema);