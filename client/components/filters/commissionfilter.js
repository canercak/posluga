'use strict';
angular.module('poslugaApp').filter('CommissionUnit', function() {
    return function(comm) {
        if (comm !== undefined && comm !== null) {
            //return '%' + String(comm.percentage) + ' (' + (comm.value / 100).toFixed(2) + ' ' + comm.currency + ')';
            return '%' + String(comm.percentage) + ' (' + (comm.value) + ' ' + comm.currency + ')';
        }
    };
});
angular.module('poslugaApp').filter('ProviderCommissionUnit', function() {
    return function(comm) {
        if (comm !== undefined && comm !== null) {
            //return '%' + String(comm.providerpercentage) + ' (' + (comm.providervalue / 100).toFixed(2) + ' ' + comm.currency + ')';
            return '%' + String(comm.providerpercentage) + ' (' + (comm.providervalue) + ' ' + comm.currency + ')';
        }
    };
});