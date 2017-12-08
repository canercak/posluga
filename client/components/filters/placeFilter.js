 angular.module('poslugaApp').filter('placeFilter', function() {
     return function(request, language) {
         if (request.oblast !== undefined && language !== undefined && request.oblast !== null && language !== null) {
             if (language === 'en') {
                 return request.oblast.en + ', ' + request.rayon.en + ((request.gorad !== undefined && request.gorad !== null) ? (', ' + request.gorad.en) : '');
             } else if (language === 'ru') {
                 return request.oblast.ru + ', ' + request.rayon.ru + ((request.gorad !== undefined && request.gorad !== null) ? (', ' + request.gorad.ru) : '');
             } else if (language === 'uk') {
                 return request.oblast.uk + ', ' + request.rayon.uk + ((request.gorad !== undefined && request.gorad !== null) ? (', ' + request.gorad.uk) : '');
             }
         }
     };
 });
 'use strict';
 angular.module('poslugaApp').filter('placeFilterShort', function() {
     return function(request, language) {
         if (request.oblast !== undefined && language !== undefined && request.oblast !== null && language !== null) {
             if (language === 'en') {
                 return request.rayon.en + ((request.gorad !== undefined && request.gorad !== null) ? (', ' + request.gorad.en) : '');
             } else if (language === 'ru') {
                 return request.rayon.ru + ((request.gorad !== undefined && request.gorad !== null) ? (', ' + request.gorad.ru) : '');
             } else if (language === 'uk') {
                 return request.rayon.uk + ((request.gorad !== undefined && request.gorad !== null) ? (', ' + request.gorad.uk) : '');
             }
         }
     };
 });
 'use strict';
 angular.module('poslugaApp').filter('placeFilterOblast', function() {
     return function(request, language) {
         if (request.oblast !== undefined && language !== undefined && request.oblast !== null && language !== null) {
             if (language === 'en') {
                 return request.oblast.en + ", " + request.rayon.en;
             } else if (language === 'ru') {
                 return request.oblast.ru + ", " + request.rayon.ru;
             } else if (language === 'uk') {
                 return request.oblast.uk + ", " + request.rayon.uk;
             }
         }
     };
 });