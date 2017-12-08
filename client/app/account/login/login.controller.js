'use strict';
angular.module('poslugaApp').controller('LoginCtrl', function($scope, MetatagService, $http, Auth, $rootScope, $location, $window, gettextCatalog, $stateParams, $cookieStore, gettext, $state) {
    $scope.user = {};
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    $scope.errors = {};
    if ($stateParams.sessionToken) {
        Auth.setSessionToken($stateParams.sessionToken, function() {
            var oauthrequestid = $cookieStore.get('oauthrequestid');
            //var userx = Auth.getCurrentUser();
            Auth.getCurrentUser().$promise.then(function(userx) {
                if (oauthrequestid !== undefined) {
                    $http.get('/api/requests/' + oauthrequestid).success(function(request) {
                        $cookieStore.remove('oauthrequestid');
                        $scope.request = request;
                        $http.get('/api/requests/phoneuser/' + userx._id + '/' + $scope.request.phone).success(function(result) {
                            if (result) {
                                $scope.request.status = {
                                    'objectid': 2,
                                    'name': gettextCatalog.getString('Waiting for Quotes')
                                }
                                $scope.request.status.date = moment().tz('Europe/Kiev');
                                $scope.request.sendmail = true;
                                $scope.request.user = userx._id;
                                $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(request) {
                                    $scope.request = request;
                                    $location.path('/success/' + $scope.request._id + '/' + 'success');
                                    $rootScope.updateLanguage(false, false);
                                }).catch(function(err) {
                                    console.log('error in post /api/requests : ' + err);
                                });
                            } else {
                                $scope.request.sendmail = false;
                                $scope.request.code = Math.floor(1000 + Math.random() * 9000);
                                $scope.request.codesent = moment.tz('Europe/Kiev');
                                $scope.request.status = {
                                    'objectid': 1,
                                    'name': gettextCatalog.getString('New'),
                                    'condition': 0
                                }
                                $scope.request.user = userx._id;
                                $scope.request.status.date = moment().tz('Europe/Kiev');
                                $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(request) {
                                    $scope.request = request;
                                    $http.post('/api/sms/verification', {
                                        to: $scope.request.phone,
                                        code: $scope.request.code,
                                        language: $scope.languageKey
                                    }).success(function() {
                                        //$scope.startTimer();
                                        $location.path('/phoneverify/' + $scope.request._id + '/' + $scope.request.phone);
                                        $rootScope.updateLanguage(false, false);
                                        // .then(function() {
                                        //     $scope.startTimer();
                                        // })
                                    }).catch(function(err) {
                                        console.log('error in post /api/sms: ' + err);
                                    });
                                }).catch(function(err) {
                                    $scope.request = {};
                                    console.log(err);
                                });
                            }
                        }).catch(function(err) {
                            console.log('error in get /api/requests/phoneuser : ' + err);
                        });
                    });
                } else {
                    if (userx.role === 'admin' || userx.role === 'editor') {
                        $state.go('preproviderlist');
                        $rootScope.updateLanguage(false, false);
                    } else {
                        var cookie = $cookieStore.get('returnUrl');
                        if (cookie !== undefined && cookie.id === userx._id) {
                            $location.url(cookie.url);
                            $cookieStore.remove('returnUrl');
                        } else {
                            if (userx.requests.length > 0 && userx.providers.length === 0) {
                                $state.go('myrequests');
                            } else if (userx.providers.length > 0) {
                                $state.go('myquotes');
                            } else {
                                $state.go('dashboard');
                            }
                            $rootScope.updateLanguage(false, false);
                        }
                    }
                    $rootScope.$broadcast('msgid', false);
                }
            });
        });
    }
    $scope.login = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            Auth.login({
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function() {
                //var user = Auth.getCurrentUser();
                Auth.getCurrentUser().$promise.then(function(user) {
                    $scope.currentUser = user
                    //$rootScope.updateLanguage(false);
                    if (user.role === 'admin' || user.role === 'editor') {
                        $state.go('preproviderlist');
                        $rootScope.updateLanguage(false, false);
                    } else {
                        var cookie = $cookieStore.get('returnUrl');
                        if (cookie !== undefined && cookie.id === user._id) {
                            $location.url(cookie.url);
                            $cookieStore.remove('returnUrl');
                        } else {
                            if (user.requests.length > 0 && user.providers.length === 0) {
                                $state.go('myrequests');
                            } else if (user.providers.length > 0) {
                                $state.go('myquotes');
                            } else {
                                $state.go('dashboard');
                            }
                            $rootScope.updateLanguage(false, false);
                        }
                    }
                    $rootScope.$broadcast('msgid', false);
                })
            }).catch(function(err) {
                $scope.errors.other = err.message;
            });
        }
    };
    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
});