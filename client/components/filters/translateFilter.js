'use strict';
angular.module('poslugaApp').filter('translateFilter', function() {
    return function(word, language) {
        if (word !== undefined && language !== undefined && word !== null && language !== null) {
            if (language === 'en') {
                return word.en.text;
            } else if (language === 'ru') {
                return word.ru.text;
            } else if (language === 'uk') {
                return word.uk.text;
            }
        }
    };
});
angular.module('poslugaApp').filter('translatePlaceFilter', function() {
    return function(word, language) {
        if (word !== undefined && language !== undefined && word !== null && language !== null) {
            if (language === 'en') {
                return word.en;
            } else if (language === 'ru') {
                return word.ru;
            } else if (language === 'uk') {
                return word.uk;
            }
        }
    };
});
angular.module('poslugaApp').filter('translatePlaceInformFilter', function() {
    return function(word, language) {
        if (word !== undefined && language !== undefined && word !== null && language !== null) {
            if (language === 'en') {
                return word.en;
            } else if (language === 'ru') {
                return word.ruinform;
            } else if (language === 'uk') {
                return word.ukinform;
            }
        }
    };
});
angular.module('poslugaApp').filter('translateFilterSimple', function() {
    return function(word, language) {
        if (word !== undefined && language !== undefined && word !== null && language !== null) {
            if (language === 'en') {
                return word.en;
            } else if (language === 'ru') {
                return word.ru;
            } else if (language === 'uk') {
                return word.uk;
            }
        }
    };
});