'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('provider', {
        url: '/provider/:slug',
        templateUrl: 'app/provider/provider.html',
        controller: 'ProviderCtrl',
        controllerAs: 'provider',
        params: {
            slug: undefined
        }
    }).state('profile', {
        url: '/profile?type&providerid&element&requestid&createsimilar',
        templateUrl: 'app/provider/profile.html',
        controller: 'ProviderCtrl',
        controllerAs: 'provider',
        authenticate: true,
        params: {
            providerid: undefined,
            type: undefined,
            element: undefined,
            requestid: undefined,
            createsimilar: undefined
        }
    }).state('addlink', {
        url: '/addlink?providerid&type&user',
        templateUrl: 'app/provider/addlink.html',
        controller: 'ProviderCtrl',
        controllerAs: 'provider',
        authenticate: true,
        params: {
            providerid: null,
            type: null,
            user: null
        }
    }).state('pronounce', {
        url: '/pronounce?providerid&type',
        templateUrl: 'app/provider/pronounce.html',
        controller: 'ProviderCtrl',
        controllerAs: 'provider',
        authenticate: true,
        params: {
            providerid: null,
            type: null
        }
    }).state('providers', {
        url: '/dashboard/providers',
        templateUrl: 'app/provider/providers.html',
        controller: 'ProviderCtrl',
        authenticate: true,
        controllerAs: 'provider'
    });
});