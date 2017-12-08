'use strict';
angular.module('poslugaApp').directive('dollarstocents', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            if (ngModel) { // Don't do anything unless we have a model
                ngModel.$parsers.push(function(value) {
                    return value * 100;
                });
                ngModel.$formatters.push(function(value) {
                    return value / 100;
                });
            }
        }
    };
});