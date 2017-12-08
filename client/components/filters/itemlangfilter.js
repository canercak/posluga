'use strict';
angular.module('poslugaApp').filter('itemlangFilter', function() {
    return function(item, language) {
        if (item !== undefined && item !== null && language !== undefined && language !== null) {
            if (language === 'en') {
                return item.en;
            } else if (language === 'ru') {
                return item.ru;
            } else if (language === 'uk') {
                return item.uk;
            }
        }
    };
});