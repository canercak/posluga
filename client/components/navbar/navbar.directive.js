'use strict';
angular.module('poslugaApp').directive('navbar', function() {
    return {
        templateUrl: 'components/navbar/navbar.html',
        restrict: 'E',
        controller: 'NavbarController',
        controllerAs: 'nav'
    };
});