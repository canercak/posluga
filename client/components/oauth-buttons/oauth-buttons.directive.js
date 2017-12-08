'use strict';
angular.module('poslugaApp').directive('oauthButtons', function() {
    return {
        templateUrl: 'components/oauth-buttons/oauth-buttons.html',
        restrict: 'EA',
        controller: 'OauthButtonsCtrl',
        controllerAs: 'OauthButtons',
        scope: {
            classes: '@'
        }
    };
}).directive('oauthButtonsModal', function() {
    return {
        templateUrl: 'components/oauth-buttons/oauth-buttons-modal.html',
        restrict: 'EA',
        controller: 'OauthButtonsCtrl',
        scope: {
            classes: '@'
        }
    };
});