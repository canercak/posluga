 'use strict';
 angular.module('poslugaApp').filter('prettyJSON', function() {
     function prettyPrintJson(json) {
         return JSON.stringify(json)
     }
     return prettyPrintJson;
 });