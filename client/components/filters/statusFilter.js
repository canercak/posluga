'use strict';
angular.module('poslugaApp').filter('statusFilter', function(gettext, OptionsService, gettextCatalog) {
    return function(request, user) {
        // var returnString = undefined;
        // if (request.quotes.length > 0) {
        //     request.quotes.forEach(function(quote) {
        //         if (quote.selected) {
        //             if (quote.provider.user._id === user._id) {
        //                 returnString = gettextCatalog.getString('You Won');
        //             } else {
        //                 returnString = gettextCatalog.getString('You Selected a Quote');
        //             }
        //         }
        //     })
        //     if (returnString === undefined) {
        //         request.quotes.forEach(function(quote) {
        //             if (quote.provider.user._id === user._id) {
        //                 returnString = gettextCatalog.getString('You Sent a Quote');
        //             } else {
        //                 returnString = String(request.quotes.length) + ' ' + gettextCatalog.getString('Quotes Received');
        //             }
        //         })
        //     }
        // } else {
        //     returnString = statusOptions[request.status.objectid - 1].name
        // }
        // return returnString;
    };
});