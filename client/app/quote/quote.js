'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('viewquotes', {
        url: '/viewquotes?requestid&quoteid&user',
        templateUrl: 'app/quote/viewquotes.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote',
        params: {
            requestid: null,
            quoteid: null,
            user: null
        }
    }).state('myquotes', {
        url: '/dashboard/myquotes',
        templateUrl: 'app/quote/myquotes.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote'
    }).state('quotesuccess', {
        url: '/quotesuccess?id&type&user',
        cache: false,
        templateUrl: 'app/quote/quotesuccess.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote',
        params: {
            id: null,
            type: null,
            user: null
        }
    }).state('givequote', {
        url: '/givequote?requestid&providerid&id&user',
        templateUrl: 'app/quote/givequote.html',
        controller: 'QuoteCtrl',
        cache: false,
        authenticate: true,
        controllerAs: 'quote',
        params: {
            requestid: null,
            providerid: null,
            id: null,
            user: null
        }
    }).state('quotedetail', {
        url: '/quotedetail?id&type',
        templateUrl: 'app/quote/quotedetail.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote',
        params: {
            id: null,
            type: null,
            user: null
        }
    }).state('comment', {
        url: '/comment?id&type&user',
        templateUrl: 'app/quote/comment.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote',
        params: {
            id: null,
            type: null,
            user: null
        }
    }).state('commentsuccess', {
        url: '/commentsuccess?id',
        templateUrl: 'app/quote/commentsuccess.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote',
        params: {
            id: null
        }
    }).state('servicesuccess', {
        url: '/servicesuccess?id',
        templateUrl: 'app/quote/servicesuccess.html',
        controller: 'QuoteCtrl',
        authenticate: true,
        controllerAs: 'quote',
        params: {
            id: null
        }
    });
});