 'use strict';
 var provider = require('./provider.model');
 exports.register = function(socket) {
     provider.schema.post('save', function(doc) {
         onSave(socket, doc);
     });
     provider.schema.post('remove', function(doc) {
         onRemove(socket, doc);
     });
 }

 function onSave(socket, doc, cb) {
     socket.emit('provider:save', doc);
 }

 function onRemove(socket, doc, cb) {
     socket.emit('provider:remove', doc);
 }