'use strict';
angular.module('poslugaApp', ["ladda", 'ngCookies', 'textAngular', 'sn.addthis', 'checklist-model', 'ngMeta', 'angular-character-count', 'string', 'truncate', 'toastr', 'ezfb', 'ngRating', 'focus-if', 'listGroup', 'ui.utils.masks', 'angular-confirm', 'angular-flexslider', 'angularXml2json', 'ngMask', 'ezplus', 'angularLoad', 'angular-loading-bar', 'ngAnimate', 'ngclipboard', 'timer', 'angular-speakingurl', 'ui.select', 'ngtweet', 'xdan.datetimepicker', 'ngFileUpload', 'jcs-autoValidate', 'gettext', 'angularMoment', 'ngUrlParser', 'ngStorage', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap']).config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, ezfbProvider, ngMetaProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    ezfbProvider.setLocale('ru_RU');
    ezfbProvider.setInitParams({
        appId: '1625107384472845',
        version: 'v2.6'
    });
    $httpProvider.interceptors.push('authInterceptor');
}).factory('authInterceptor', function($rootScope, $q, $localStorage, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            if ( config.url.indexOf('s3.amazonaws.com') > -1) {
                config.headers.Authorization = undefined;
            }
            return config;
        },
        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                delete $localStorage.token;
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
}).run(function($rootScope, $location, Auth, amMoment, validator, gettextCatalog, $cookieStore, ngMeta) {
    validator.defaultFormValidationOptions.validateNonVisibleControls = false;
    ngMeta.init();
    //amMoment.changeLocale('ru');
    //gettextCatalog.setCurrentLanguage('ru');
    $rootScope.$on('$stateChangeStart', function(event, next) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        Auth.isLoggedInAsync(function(loggedIn) {
            var url = $location.url();
            var userid = Auth.getCurrentUser()._id;
            $rootScope.previousUrl = next.url;
            if (next.authenticate === true && !loggedIn) {
                if (url.indexOf("user") > -1) {
                    if (!userid) {
                        userid = url.split("user")[1].replace('=', '');;
                    }
                }
                var cookiehash = {
                    id: userid,
                    url: url
                };
                $cookieStore.put('returnUrl', cookiehash);
                $location.path('/login');
            }
        });
    });
});