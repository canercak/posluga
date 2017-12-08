'use strict';
angular.module('poslugaApp').filter('MonetaryUnit', function() {
    return function(amount) {
        if (amount !== undefined && amount !== null) {
            // var intval = (amount.value / 100).toFixed(2);
            var intval = amount.value;
            return String(intval) + ' ' + amount.currency;
        }
    };
});
angular.module('poslugaApp').filter('MonetaryUnitShort', function() {
    return function(amount) {
        if (amount !== undefined && amount !== null) {
            // var intval = (amount.value / 100);
            var intval = amount.value;
            return String(intval) + ' ' + amount.currency;
        }
    };
});
// angular.module('poslugaApp').filter('MonetaryUnitFinancial', function() {
//     return function(amount) {
//         if (amount !== undefined) {
//             // var intval = (amount.value / 100);
//             var intval = amount.value;
//             var finalvar = String(intval);
//             if (intval > 0) {
//                 finalvar = '+' + finalvar;
//             }
//             return finalvar + ' ' + amount.currency;
//         }
//     };
// });
angular.module('poslugaApp').filter('MonetaryUnitAbs', function() {
    return function(amount) {
        if (amount !== undefined && amount !== null) {
            // var intval = Math.abs(amount.value / 100);
            var intval = amount.value;
            var finalvar = String(intval);
            return finalvar + ' ' + amount.currency;
        }
    };
});