'use strict';
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var autoIncrement = require('mongoose-auto-increment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
autoIncrement.initialize(mongoose.connection);
var QuoteSchema = new mongoose.Schema({
    price: {
        value: Number,
        currency: String
    },
    commission: {
        percentage: Number,
        value: Number,
        currency: String,
        providerpercentage: Number,
        providervalue: Number
    },
    questions: [{
        objectid: Number,
        qtype: String,
        question: String,
        width: String,
        answers: [{
            objectid: Number,
            option: String
        }],
        options: [{
            objectid: Number,
            option: String
        }]
    }],
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    },
    when: {
        objectid: Number,
        name: String
    },
    date: Date,
    latestevent: String,
    selected: {
        type: Boolean,
        default: false
    },
    servicecomplete: {
        type: Boolean,
        default: false
    },
    comment: {
        message: String,
        rating: Number,
        paid: {
            value: Number,
            currency: String
        },
        files: [{
            location: String
        }],
        leftAt: Date
    },
    chat: [{
        message: String,
        sentAt: Date,
        sendertype: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: true
        }
    }]
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
QuoteSchema.plugin(autopopulate);
QuoteSchema.plugin(deepPopulate);
QuoteSchema.plugin(autoIncrement.plugin, {
    model: 'Quote',
    field: 'sequence',
    startAt: 12323,
    incrementBy: 1
});
module.exports = mongoose.model('Quote', QuoteSchema);