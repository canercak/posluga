'use strict';
angular.module('poslugaApp').controller('OauthButtonsCtrl', function($cookieStore, $http, $rootScope, $window, $scope, gettext, $state, gettextCatalog) {
    this.loginOauth = function(provider, type) {
        if ($rootScope.modalopen === false) {
            $window.location.href = '/auth/' + provider;
        } else {
            $http.post('/api/requests', $rootScope.request).success(function(request) {
                $cookieStore.put('oauthrequestid', request._id);
                $window.location.href = '/auth/' + provider + '/modal' + '?requestid=' + request._id;
            }).catch(function(err) {
                console.log('error in post /api/requests : ' + err);
            });
        }
    };
    // $scope.loginOauthFromModal = function(provider) {
    //     $window.location.href = '/auth/' + provider + '/modal' + '?requestid=' + $scope.oauthrequestid;
    // };
    if ($state.current.name === 'signup' || $state.current.name === 'giveservice') {
        $scope.facebookText = gettextCatalog.getString('Signup with Facebook')
        $scope.vkText = gettextCatalog.getString('Signup with Vkontakte')
        $scope.odnoText = gettextCatalog.getString('Signup with Odnoklassniki')
    } else {
        $scope.facebookText = gettextCatalog.getString('Login with Facebook')
        $scope.vkText = gettextCatalog.getString('Login with Vkontakte')
        $scope.odnoText = gettextCatalog.getString('Login with Odnoklassniki')
    }
});