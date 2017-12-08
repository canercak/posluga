'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
    }).state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
            var referrer = $state.params.referrer || $state.current.referrer || 'main';
            Auth.logout();
            $state.go('main');
        }
    }).state('loginWithToken', {
        url: '/login/:sessionToken',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
    }).state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
    }).state('settings', {
        url: '/settings?adminuser&type&requestid',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true,
        params: {
            adminuser: null,
            type: null,
            requestid: null
        }
    }).state('confirm', {
        url: '/confirm',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
        authenticate: true
    }).state('confirmWithCode', {
        url: '/confirm/:confirmToken',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl'
    }).state('askForPwdReset', {
        url: '/pwdreset',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl',
    }).state('giveservice', {
        url: '/giveservice',
        templateUrl: 'app/account/signup/giveservice.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
    }).state('resetPwd', {
        url: '/pwdreset/:passwordResetToken',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl'
    });
});