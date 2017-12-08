'use strict';
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    body: String,
    slug: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
ArticleSchema.plugin(autopopulate);
module.exports = mongoose.model('Article', ArticleSchema);