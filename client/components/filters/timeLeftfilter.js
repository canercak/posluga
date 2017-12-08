'use strict';
angular.module('poslugaApp').filter('validityFilter', function() {
    return function(validUntil, languagekey) {
        if (validUntil !== undefined && languagekey !== undefined && validUntil !== null && languagekey !== null) {
            var start = moment().tz('Europe/Kiev');
            var end = moment(validUntil).tz('Europe/Kiev');
            var duration = moment.duration(end.diff(start));
            var mseconds = (start < end) ? duration.asMilliseconds() : 0;
            return humanizeDuration(mseconds, {
                language: languagekey,
                units: ['d', 'h'],
                round: true,
                largest: 2
            })
        }
    };
});
angular.module('poslugaApp').filter('durationFilter', function(gettext, gettextCatalog) {
    return function(createdAt, languagekey) {
        if (createdAt !== undefined && languagekey !== undefined && createdAt !== null && languagekey !== null) {
            var start = moment().tz('Europe/Kiev');
            var end = moment(createdAt).tz('Europe/Kiev');
            var duration = moment.duration(start.diff(end));
            var mseconds = duration.asMilliseconds();
            var unit = undefined;
            if (duration.asDays() > 30) {
                unit = ['y', 'mo'];
            } else if (duration.asDays() > 1) {
                unit = ['d'];
            } else if (duration.asHours() < 24 && duration.asHours() > 1) {
                unit = ['h'];
            } else if (duration.asHours() < 1) {
                unit = ['m'];
            }
            var theHumanizer = humanizeDuration.humanizer({
                language: languagekey,
                units: unit,
                round: true,
                largest: 2
            });
            var returntext = null;
            if (duration.asDays() > 0) {
                returntext = theHumanizer(mseconds);
            }
            return returntext;
        }
    };
});