'use strict';
// Production specific configuration
// =================================
// module.exports = {
//     // Server IP
//     ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,
//     // Server port
//     port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
//     // MongoDB connection options
//     mongo: {
//         uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/posluga'
//     }
// };
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/posluga'
    },
    facebook: {
        clientID: '1625107384472845',
        clientSecret: '886269a600145be13950c0a8ed7164f5',
        callbackURL: 'http://posluga.ua/auth/facebook/callback'
    },
    vkontakte: {
        clientID: '5329775', //process.env.VK_ID || 'id',
        clientSecret: 'hCruMO5ARLJ9QEsBfEV8', //process.env.VK_SECRET || 'secret',
        callbackURL: 'http://posluga.ua/auth/vkontakte/callback' //'http://0.0.0.0:9000/auth/vkontakte/callback' //(process.env.DOMAIN || '') + '/auth/vk/callback'
    },
    // Seed database on startup
    seedDB: false,
    port: 8080,
    env: 'production'
};