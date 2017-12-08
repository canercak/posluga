'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true,
        controllerAs: 'dashboard'
    })
});