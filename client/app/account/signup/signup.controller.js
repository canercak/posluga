'use strict';
angular.module('poslugaApp').controller('SignupCtrl', function($scope, MetatagService, Auth, $location, $window, $rootScope, $state) {
    $scope.user = {
        'termsaccepted': true
    };
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    $scope.errors = {};
    $scope.register = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            Auth.createUser({
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                language: $scope.languageKey,
                picture: 'https://s3.eu-central-1.amazonaws.com/servicebox/static/avatar.png',
                stats: {
                    securitychecks: [{
                        'objectid': 1
                    }, {
                        'objectid': 2
                    }]
                }
            }).then(function() {
                $rootScope.updateLanguage(false, false);
                if ($state.current.name === 'giveservice') {
                    $state.go('profile', {
                        type: 'new'
                    });
                } else {
                    $state.go('dashboard');
                }
                $rootScope.$broadcast('msgid', false);
            }).catch(function(err) {
                err = err.data;
                $scope.errors = {};
                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });
        }
    };
    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
});