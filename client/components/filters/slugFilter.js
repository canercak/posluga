'use strict';
angular.module('poslugaApp').filter('slugFilter', function() {
    return function(word, language) {
        if (word !== undefined && language !== undefined && word !== null && language !== null) {
            if (language === 'en') {
                return word.en.slug;
            } else if (language === 'ru') {
                return word.ru.slug;
            } else if (language === 'uk') {
                return word.uk.slug;
            }
        }
    };
});
angular.module('poslugaApp').filter('providerSlugFilter', function() {
    return function(slug, language) {
        if (slug !== undefined && language !== undefined && slug !== null && language !== null) {
            if (language === 'en') {
                return slug.latin.en;
            } else if (language === 'ru') {
                return slug.latin.ru;
            } else if (language === 'uk') {
                return slug.latin.uk;
            }
        }
    };
});