'use strict';
var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}
// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,
    // Root path of server
    root: path.normalize(__dirname + '/../../..'),
    // Server port
    port: process.env.PORT || 9000,
    // Should we populate the DB with sample data?
    seedDB: false,
    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'posluga-secret',
        mailConfirmation: process.env.MAIL_CONFIRMATION_SECRET || 'mailConfirmation',
        passwordReset: process.env.PASSWORD_RESET_SECRET || 'passwordReset'
    },
    // List of user roles
    userRoles: ['guest', 'user', 'admin', 'editor'],
    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    mail: {
        service: process.env.MAIL_SERVICE || 'mail_service',
        api: {
            auth: {
                api_key: process.env.MAIL_APIKEY || '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' //aysecanbilir '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'
            }
        },
        from: {
            name: 'Posluga.ua',
            email: 'Posluga.ua' //'support@posluga.ua'
        }
    },
    facebook: {
        clientID: '570566453104035',
        clientSecret: '4dc708c3bd4e3cec135cc2d28771e3ef',
        callbackURL: 'http://localhost:9000/auth/facebook/callback'
    },
    vkontakte: {
        clientID: '5329775', //process.env.VK_ID || 'id',
        clientSecret: 'hCruMO5ARLJ9QEsBfEV8', //process.env.VK_SECRET || 'secret',
        callbackURL: 'http://localhost:9000/auth/vkontakte/callback' //'http://0.0.0.0:9000/auth/vkontakte/callback' //(process.env.DOMAIN || '') + '/auth/vk/callback'
    },
    twitter: {
        clientID: 'E7IBAH1vdLR3mG4V0M3uIh4Dm',
        clientSecret: 'uFEPEwyb6wJTQ3X8qDedx1SY4lp3yCZpTQHo9PW2VcnlavTBKY', //process.env.TWITTER_SECRET || 'secret',
        callbackURL: 'http://0.0.0.0:9000/auth/twitter/callback' // (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    }
};
// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});