'use strict';
var transaction = require('./transaction.model');
exports.register = function(socket) {
    transaction.schema.post('save', function(doc) {
        onSave(socket, doc);
    });
    transaction.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('transaction:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('transaction:remove', doc);
}