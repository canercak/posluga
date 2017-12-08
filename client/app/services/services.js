'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('subject', {
        url: '/kategorija/:slug',
        templateUrl: 'app/services/subject.html',
        controller: 'ServicesCtrl',
        controllerAs: 'services',
        params: {
            slug: undefined
        }
    }).state('subcategory', {
        url: '/podkategorija/:slug',
        templateUrl: 'app/services/subcategory.html',
        controller: 'ServicesCtrl',
        controllerAs: 'services',
        params: {
            slug: undefined
        }
    }).state('allservices', {
        url: '/vse-uslugi',
        templateUrl: 'app/services/allservices.html',
        controller: 'ServicesCtrl',
        controllerAs: 'services'
    });
})