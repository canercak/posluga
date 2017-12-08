 'use strict';
 angular.module('poslugaApp').factory('MetatagService', ['ngMeta', '$window', function(ngMeta, $window) {
     var service = {};
     service.setMetaTags = function(author, title, description, image, nofollow) {
         ngMeta.setTitle(title);
         ngMeta.setTag('og:title', title);
         ngMeta.setTag('twitter:title', title);
         ngMeta.setTag('itemprop:name', title);
         ngMeta.setTag('description', description);
         ngMeta.setTag('itemprop:description', description);
         ngMeta.setTag('og:description', description);
         ngMeta.setTag('twitter:description', description);
         ngMeta.setTag('author', author);
         ngMeta.setTag('image', image);
         ngMeta.setTag('itemprop:image', image);
         ngMeta.setTag('og:image', image);
         ngMeta.setTag('twitter:image', image);
         ngMeta.setTag('og:url', $window.location.href);
         ngMeta.setTag('og:site_name', 'Posluga.ua');
         ngMeta.setTag('og:type', ($window.location.href.indexOf('/blog') > -1) ? 'article' : 'website');
         ngMeta.setTag('twitter:card', 'summary');
         ngMeta.setTag('twitter:site', '@poslugaua');
         ngMeta.setTag('twitter:creator', 'website');
         if (nofollow) {
             ngMeta.setTag('robots', 'noindex,nofollow');
         } else {
             ngMeta.setTag('robots', 'all');
         }
         $window.prerenderReady = true;
     };
     return service;
 }]);