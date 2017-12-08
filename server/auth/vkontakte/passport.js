var passport = require('passport');
var vkStrategy = require('passport-vkontakte').Strategy;
exports.setup = function(User, config) {
    passport.use(new vkStrategy({
        clientID: config.vkontakte.clientID,
        clientSecret: config.vkontakte.clientSecret,
        callbackURL: config.vkontakte.callbackURL,
        passReqToCallback: true,
        profileFields: ['city', 'bdate', 'email', 'photo_50', 'country', 'sex', 'photo_100', 'photo_200_orig', 'followers_count', 'common_count', 'counters', 'occupation', 'schools', 'universities', 'education']
    }, function(req, token, tokenSecret, params, profile, done) {
        User.findOne({
            'email': params.email
        }).then(function(user) {
            if (user) {
                user.provider = 'vkontakte';
                user.vkontakte = profile._json;
                user.username = profile.username;
                user.picture = profile._json.photo_50;
                user.name = profile.displayName;
                user.stats = {
                    securitychecks: [{
                        'objectid': 1
                    }, {
                        'objectid': 2
                    }, {
                        'objectid': 5,
                        'value': profile._json.counters.friends
                    }]
                }
                return user.save().then(function(user) {
                    done(null, user)
                }, function(error) {
                    console.log('Error', error);
                    done(error)
                })
            }
            console.log("new user")
            user = new User({
                name: profile.displayName,
                providers: [],
                requests: [],
                username: profile.username,
                email: params.email,
                language: 'ru',
                picture: profile._json.photo_50,
                role: 'user',
                provider: 'vkontakte',
                vkontakte: profile._json,
                stats: {
                    securitychecks: [{
                        'objectid': 1
                    }, {
                        'objectid': 2
                    }, {
                        'objectid': 5,
                        'value': profile._json.counters.friends
                    }]
                }
            });
            user.save().then(function(user) {
                done(null, user)
            }, function(error) {
                console.log('Error', error);
                done(error)
            })
        }, function(error) {
            console.log('Error', error);
            done(error)
        })
    }));
}