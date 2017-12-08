'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var authTypes = ['vkontakte', 'facebook'];
var UserSchema = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user'
    },
    hashedPassword: String,
    language: {
        type: String,
        default: 'ru'
    },
    provider: String,
    createdbyrequest: {
        type: Boolean,
        default: false
    },
    providers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        default: null
    }],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        default: null
    }],
    termsaccepted: {
        type: Boolean,
        default: true
    },
    salt: String,
    xp: String,
    isprovider: {
        type: Boolean,
        default: false
    },
    facebook: {},
    vkontakte: {},
    notifications: {
        textrequests: {
            type: Boolean,
            default: true
        },
        textquotes: {
            type: Boolean,
            default: true
        },
        emailquotes: {
            type: Boolean,
            default: true
        },
        emailrequests: {
            type: Boolean,
            default: true
        },
        emailnews: {
            type: Boolean,
            default: true
        },
        emailreviews: {
            type: Boolean,
            default: true
        },
        emailaccount: {
            type: Boolean,
            default: true
        }
    },
    stats: {
        securitychecks: [{
            objectid: Number,
            value: Number
        }],
        reviewscore: {
            type: Number,
            default: 0
        },
        scorefive: {
            type: String,
            default: "0"
        },
        requestcount: {
            type: Number,
            default: 0
        },
        happycount: {
            type: Number,
            default: 0
        },
        reviewcount: {
            type: Number,
            default: 0
        }
    },
    finances: {
        commissionstopay: {
            value: Number,
            currency: String
        },
        servicestaken: {
            value: Number,
            currency: String
        },
        payments: {
            value: Number,
            currency: String
        },
        balance: {
            value: Number,
            currency: String
        }
    },
    picture: String,
    loginemailsent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    },
    versionKey: false
});
/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
}).get(function() {
    return this._password;
});
// Public profile information
UserSchema.virtual('profile').get(function() {
    return {
        'name': this.name,
        'role': this.role
    };
});
// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function() {
    return {
        '_id': this._id,
        'role': this.role
    };
});
/**
 * Validations
 */
// Validate empty email
UserSchema.path('email').validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
}, 'Электронной почты не может быть пустым.'); // Email cannot be blank
// Validate empty password
UserSchema.path('hashedPassword').validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
}, 'Пароль не может быть пустым.'); //'Password cannot be blank');
// Validate email is not taken
UserSchema.path('email').validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({
        email: value
    }, function(err, user) {
        if (err) throw err;
        if (user) {
            if (self.id === user.id) return respond(true);
            return respond(false);
        }
        respond(true);
    });
}, 'Указанный адрес электронной почты уже используется.'); //The specified email address is already in use
var validatePresenceOf = function(value) {
    return value && value.length;
};
/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();
    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) next(new Error('Invalid password'));
    else next();
});
/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },
    confirmMail: function(cb) {
        this.confirmedEmail = true;
        this.save(cb)
    }
};
UserSchema.plugin(deepPopulate);
module.exports = mongoose.model('User', UserSchema);