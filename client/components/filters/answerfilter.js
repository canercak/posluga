'use strict';
angular.module('poslugaApp').filter('answerFilter', function() {
    return function(answer) {
        if (answer !== undefined && answer !== null) {
            var intval = (amount.value / 100);
            var intval = (amount.value);
            return String(intval) + ' ' + amount.currency;
        }
    };
});