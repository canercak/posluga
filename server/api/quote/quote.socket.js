'use strict';
var quote = require('./quote.model');
exports.register = function(socket) {
    quote.schema.post('save', function(doc) {
        onSave(socket, doc);
    });
    quote.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('quote:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('quote:remove', doc);
}