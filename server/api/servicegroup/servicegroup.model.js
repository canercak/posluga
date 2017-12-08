'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');
var ServicegroupSchema = new Schema({
    name: String,
    services: [{
        name: String,
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            autopopulate: true
        }
    }]
});
ServicegroupSchema.plugin(autopopulate);
module.exports = mongoose.model('Servicegroup', ServicegroupSchema);