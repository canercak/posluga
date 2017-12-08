'use strict';
angular.module('poslugaApp').filter('statTextFilter', function(gettext, gettextCatalog) {
    return function(stat) {
        if (stat !== undefined && stat !== null) {
            return stat.finishedcount
        }
    };
});
angular.module('poslugaApp').filter('statTextFilter2', function(gettext, gettextCatalog) {
    return function(stat) {
        if (stat !== undefined && stat !== null) {
            return stat.happycount
        }
    };
});
angular.module('poslugaApp').filter('statTextFilterUser', function(gettext, gettextCatalog) {
    return function(stat) {
        if (stat !== undefined && stat !== null) {
            return stat.requestcount
        }
    };
});
angular.module('poslugaApp').filter('statPriceFilter', function() {
    return function(stat) {
        if (stat !== undefined && stat !== null) {
            // return String(stat.lowprice / 100) + ' - ' + String(stat.highprice / 100) + ' ' + stat.currency;
            return String(stat.lowprice) + ' - ' + String(stat.highprice) + ' ' + stat.currency;
        }
    };
});