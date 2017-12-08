'use strict';
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic')
var serviceSchema = new mongoose.Schema({
    subjectid: Number,
    subject: {
        en: {
            text: String,
            slug: String
        },
        ru: {
            text: String,
            slug: String
        },
        uk: {
            text: String,
            slug: String
        }
    },
    desc: {
        en: {
            text: String,
            slug: String
        },
        ru: {
            text: String,
            slug: String
        },
        uk: {
            text: String,
            slug: String
        }
    },
    categoryid: Number,
    category: {
        en: {
            text: String,
            slug: String
        },
        ru: {
            text: String,
            slug: String
        },
        uk: {
            text: String,
            slug: String
        }
    },
    subcategory: {
        en: {
            text: {
                type: String,
                es_indexed: true
            },
            slug: String
        },
        ru: {
            text: String,
            slug: String
        },
        uk: {
            text: String,
            slug: String
        }
    },
    subcategoryid: Number,
    popular: Boolean,
    keywords: Array,
    keywordsuk: Array,
    crwkeywords: Array,
    image: String,
    topservice: Boolean,
    categoryimage: String,
    subjectimage: String,
    iconpath: String,
    questions: [{
        order: Number,
        qtype: String,
        question: {
            en: String,
            ru: String,
            uk: String
        },
        options: [{
            order: Number,
            option: {
                en: String,
                ru: String,
                uk: String
            },
        }]
    }]
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
serviceSchema.index({
    'subcategory.en.text': 'text'
}, {
    default_language: "english"
});
serviceSchema.index({
    'subcategory.ru.text': 'text'
}, {
    default_language: "russian"
});
serviceSchema.index({
    'subcategory.uk.text': 'text'
}, {
    default_language: "russian"
});
serviceSchema.plugin(mongoosastic)
module.exports = mongoose.model('Service', serviceSchema);
// var Service = mongoose.model('Service', serviceSchema);
// var stream = Service.synchronize()
// var count = 0;
// stream.on('data', function(err, doc) {
//     count++;
// });
// stream.on('close', function() {
//     console.log('indexed ' + count + ' documents!');
// });
// stream.on('error', function(err) {
//     console.log(err);
// });