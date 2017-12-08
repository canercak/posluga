var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var PassportFacebookExtension = require('passport-facebook-extension');
exports.setup = function(User, config) {
        console.log(config.facebook.clientSecret);
        passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['displayName', 'name', 'bio', 'birthday', 'education', 'age_range', 'devices', 'hometown', 'website', 'profileUrl', 'id', 'emails', 'photos', 'gender', 'locale', 'timezone', 'updated_time', 'verified', 'friends']
        }, function(accessToken, refreshToken, profile, done) {
            var FBExtension = new PassportFacebookExtension(config.facebook.clientID, config.facebook.clientSecret);
            FBExtension.permissionsGiven(profile.id, accessToken).then(function(permissions) {
                profile.permissions = permissions
                var acceptedFriendsPermission = false;
                permissions.forEach(function(permission) {
                    if (permission.permission === 'user_friends') {
                        acceptedFriendsPermission = true;
                    }
                });
                if (acceptedFriendsPermission) {
                    FBExtension.friendsUsingApp(profile.id, accessToken).then(function(friends) {
                        profile.friends = friends;
                        done(null, profile);
                    }).fail(function(error) {
                        console.log(error);
                    });
                } else {
                    done(null, profile);
                }
            }).fail(function(e) {
                console.log(e);
            });
            User.findOne({
                'email': profile.emails[0].value
            }).then(user => {
                if (user) {
                    user.provider = 'facebook';
                    user.facebook = profile._json;
                    user.picture = profile.photos[0].value;
                    user.name = profile.displayName;
                    user.stats = {
                        securitychecks: [{
                            'objectid': 1
                        }, {
                            'objectid': 2
                        }, {
                            'objectid': 4,
                            'value': profile._json.friends.summary.total_count
                        }]
                    }
                    return user.save().then(function(user) {
                        done(null, user)
                    }, function(error) {
                        console.log('Error', error);
                        done(error)
                    })
                }
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'user',
                    picture: profile.photos[0].value,
                    providers: [],
                    requests: [],
                    provider: 'facebook',
                    language: ((profile.locale === undefined || profile.locale.indexOf("uk_") === -1) ? 'ru' : 'uk'),
                    facebook: profile._json,
                    stats: {
                        securitychecks: [{
                            'objectid': 1
                        }, {
                            'objectid': 2
                        }, {
                            'objectid': 4,
                            'value': profile._json.friends.summary.total_count
                        }]
                    }
                });
                console.log(user)
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
    // var passport = require('passport');
    // var FacebookStrategy = require('passport-facebook').Strategy;
    // exports.setup = function (User, config) {
    //   passport.use(new FacebookStrategy({
    //       clientID: config.facebook.clientID,
    //       clientSecret: config.facebook.clientSecret,
    //       callbackURL: config.facebook.callbackURL
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //       User.findOne({
    //         'facebook.id': profile.id
    //       },
    //       function(err, user) {
    //         if (err) {
    //           return done(err);
    //         }
    //         if (!user) {
    //           user = new User({
    //             name: profile.displayName,
    //             email: profile.emails[0].value,
    //             role: 'user',
    //             username: profile.username,
    //             provider: 'facebook',
    //             facebook: profile._json
    //           });
    //           user.save(function(err) {
    //             if (err) done(err);
    //             return done(err, user);
    //           });
    //         } else {
    //           return done(err, user);
    //         }
    //       })
    //     }
    //   ));
    // };