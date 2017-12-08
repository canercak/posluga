'use strict';
// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/posluga-dev'
    },
    facebook: {
        clientID: '570566453104035',
        clientSecret: '4dc708c3bd4e3cec135cc2d28771e3ef',
        callbackURL: 'http://localhost:9000/auth/facebook/callback'
    },
    vkontakte: {
        clientID: '5708997', //process.env.VK_ID || 'id',
        clientSecret: 'AAmYo4pGjqggW3UPrlly', //process.env.VK_SECRET || 'secret',
        callbackURL: 'http://localhost:9000/auth/vkontakte/callback' //'http://0.0.0.0:9000/auth/vkontakte/callback' //(process.env.DOMAIN || '') + '/auth/vk/callback'
    },
    seedDB: false
};