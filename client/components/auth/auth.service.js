'use strict';
angular.module('poslugaApp').factory('Auth', function Auth($location, $rootScope, $http, User, Local, $localStorage, $q) {
    var currentUser = {};
    if ($localStorage.token) {
        currentUser = User.get();
    }
    return {
        /**
         * Authenticate user and save token
         *
         * @param  {Object}   user     - login info
         * @param  {Function} callback - optional
         * @return {Promise}
         */
        login: function(user, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.post('/auth/local', {
                email: user.email,
                password: user.password
            }).
            success(function(data) {
                $localStorage.token = data.token;
                currentUser = User.get();
                deferred.resolve(data);
                return cb();
            }).
            error(function(err) {
                this.logout();
                deferred.reject(err);
                return cb(err);
            }.bind(this));
            return deferred.promise;
        },
        /**
         * Delete access token and user info
         *
         * @param  {Function}
         */
        logout: function() {
            delete $localStorage.token;
            currentUser = {};
        },
        /**
         * Create a new user
         *
         * @param  {Object}   user     - user info
         * @param  {Function} callback - optional
         * @return {Promise}
         */
        createUser: function(user, callback) {
            var cb = callback || angular.noop;
            return User.save(user, function(data) {
                $localStorage.token = data.token;
                currentUser = User.get();
                return cb(user);
            }, function(err) {
                this.logout();
                return cb(err);
            }.bind(this)).$promise;
        },
        /**
         * Change password
         *
         * @param  {String}   oldPassword
         * @param  {String}   newPassword
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        changePassword: function(oldPassword, newPassword, callback) {
            var cb = callback || angular.noop;
            return User.changePassword({
                id: currentUser._id
            }, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        /**
         * Gets all available info on authenticated user
         *
         * @return {Object} user
         */
        getCurrentUser: function() {
            if (!currentUser && $localStorage.token) return currentUser = User.get();
            return currentUser;
        },
        /**
         * Check if a user is logged in
         *
         * @return {Boolean}
         */
        isLoggedIn: function() {
            return currentUser.hasOwnProperty('role');
        },
        /**
         * Waits for currentUser to resolve before checking if user is logged in
         */
        isLoggedInAsync: function(cb) {
            if (currentUser.hasOwnProperty('$promise')) {
                currentUser.$promise.then(function() {
                    cb(true);
                }).catch(function() {
                    cb(false);
                });
            } else if (currentUser.hasOwnProperty('role')) {
                cb(true);
            } else {
                cb(false);
            }
        },
        /**
         * Check if a user is an admin
         *
         * @return {Boolean}
         */
        isAdmin: function() {
            return currentUser.role === 'admin';
        },
        isProvider: function isProvider() {
            return currentUser.isprovider === true;
        },
        isEditor: function isEditor() {
            return currentUser.role === 'editor';
        },
        changeSettings: function changeSettings(name, lastname, email, notifications, currentPassword, callback) {
            var safeCb = callback || angular.noop;
            return User.changeSettings({
                id: currentUser._id
            }, {
                name: name,
                lastname: lastname,
                email: email,
                currentPassword: currentPassword
            }, function() {
                return safeCb(callback)(null);
            }, function(err) {
                return safeCb(callback)(err);
            }).$promise;
        },
        changeNotifications: function changeNotifications(notifications, callback) {
            var cb = callback || angular.noop;
            return User.changeNotifications({
                id: currentUser._id
            }, {
                notifications: notifications
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        changeName: function changeName(name, email, picture, callback) {
            var cb = callback || angular.noop;
            return User.changeName({
                id: currentUser._id
            }, {
                name: name,
                email: email,
                picture: picture
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        /**
         * update verified phone
         *
         * @param  {String}   oldPassword
         * @param  {String}   newPassword
         * @param  {Function} callback    - optional, function(error, user)
         * @return {Promise}
         */
        verifyphone: function verifyphone(phone, callback) {
            return User.verifyphone({
                id: currentUser._id
            }, {
                verifiedphone: phone
            }, function(user) {
                safeCb(callback)(user);
                return user;
            }, function(err) {
                return safeCb(callback)(err);
            }).$promise;
        },
        /**
         * Get auth token
         */
        getToken: function() {
            return $localStorage.token;
        },
        /**
         * Confirm mail
         *
         * @param  {String}   mailConfirmationToken
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        confirmMail: function(mailConfirmationToken, callback) {
            var cb = callback || angular.noop;
            return Local.confirmMail({
                mailConfirmationToken: mailConfirmationToken
            }, function(data) {
                $localStorage.token = data.token;
                currentUser = User.get();
                return cb(currentUser);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        /**
         * Check if a user's mail is confirmed
         *
         * @return {Boolean}
         */
        isMailconfirmed: function() {
            return currentUser.confirmedEmail;
        },
        /**
         * Confirm mail
         *
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        sendConfirmationMail: function(callback) {
            var cb = callback || angular.noop;
            return Local.verifyMail(function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        /**
         * Send Reset password Mail
         *
         * @param  {String}   email address
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        sendPwdResetMail: function(email, newPassword, callback) {
            var cb = callback || angular.noop;
            console.log('email :' + email);
            return Local.resetPassword({
                email: email,
                newPassword: newPassword
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        sendLoginEmail: function sendLoginEmail(email, pass, callback) {
            var cb = callback || angular.noop;
            console.log('email :' + email);
            return Local.sendLoginEmail({
                email: email,
                pass: pass
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        sendLoginProviderEmail: function sendLoginProviderEmail(email, pass, callback) {
            var cb = callback || angular.noop;
            console.log('email :' + email);
            return Local.sendLoginProviderEmail({
                email: email,
                pass: pass
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        sendOpportunityEmail: function sendOpportunityEmail(userid, providerid, requestid, callback) {
            var cb = callback || angular.noop;
            return Local.sendOpportunityEmail({
                userid: userid,
                providerid: providerid,
                requestid: requestid
            }, function(user) {
                return cb(user);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        /**
         * Change reseted password
         *
         * @param  {String}   passwordResetToken
         * @param  {String}   newPassword
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        confirmResetedPassword: function(passwordResetToken, callback) {
            var cb = callback || angular.noop;
            console.log('passwordResetToken: ' + passwordResetToken);
            return Local.confirmPassword({
                passwordResetToken: passwordResetToken,
            }, function(data) {
                $localStorage.token = data.token;
                currentUser = User.get();
                return cb(data);
            }, function(err) {
                return cb(err);
            }).$promise;
        },
        /**
         * Set session token
         *
         * @param  {String}   session token
         * @return {Promise}
         */
        setSessionToken: function(sessionToken, callback) {
            var cb = callback || angular.noop;
            $localStorage.token = sessionToken;
            currentUser = User.get(cb);
        }
    };
});