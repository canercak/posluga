'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('request', {
        url: '/request?type&requestid&serviceid&searchtext&slug&providerid&providername&oblast&rayon&gorad&rayongorad',
        cache: false,
        templateUrl: 'app/request/request.html',
        controller: 'RequestCtrl',
        controllerAs: 'request',
        params: {
            requestid: undefined,
            type: undefined,
            serviceid: undefined,
            searchtext: undefined,
            slug: undefined,
            providerid: undefined,
            providername: undefined,
            oblast: undefined,
            rayon: undefined,
            gorad: undefined,
            rayongorad: undefined
        }
    }).state('myrequests', {
        url: '/dashboard/myrequests',
        templateUrl: 'app/request/myrequests.html',
        controller: 'RequestCtrl',
        controllerAs: 'request',
        authenticate: true
    }).state('success', {
        url: '/success/:requestid/:type',
        templateUrl: 'app/request/success.html',
        controller: 'RequestCtrl',
        controllerAs: 'request',
        authenticate: true,
        params: {
            requestid: undefined,
            type: undefined
        }
    }).state('requestdetail', {
        url: '/requestdetail?id&type&user',
        templateUrl: 'app/request/requestdetail.html',
        controller: 'RequestCtrl',
        controllerAs: 'request',
        authenticate: true,
        params: {
            id: undefined,
            type: undefined,
            user: undefined
        }
    }).state('phoneverify', {
        url: '/phoneverify/:requestid/:phone',
        templateUrl: 'app/request/phoneverify.html',
        controller: 'RequestCtrl',
        controllerAs: 'request',
        params: {
            requestid: undefined,
            phone: undefined
        }
    });
});