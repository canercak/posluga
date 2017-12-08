'use strict';
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var TransactionSchema = new mongoose.Schema({
    transactionType: {
        objectid: Number,
        name: String,
        add: Boolean
    },
    amount: {
        value: Number,
        currency: String
    },
    balance: {
        value: Number,
        currency: String
    },
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        autopopulate: true
    },
    quote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
        autopopulate: true
    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        autopopulate: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
TransactionSchema.plugin(autopopulate);
module.exports = mongoose.model('Transaction', TransactionSchema);