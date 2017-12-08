'use strict';
angular.module('poslugaApp').controller('PasswordModalInstanceCtrl', function($scope, MetatagService, $uibModalInstance, foundemail, request, Auth, $rootScope) {
    $scope.foundemail = foundemail;
    $rootScope.request = request;
    $scope.request = request;
    $scope.password = '';
    $scope.showPasswordNotCorrect = false;
    $scope.ok = function() {
        Auth.login({
            email: $scope.foundemail,
            password: $scope.password
        }).then(function() {
            $scope.showPasswordNotCorrect = false;
            $uibModalInstance.close('success');
        }).catch(function(err) {
            $scope.showPasswordNotCorrect = true;
            console.log(err);
        });
    };
    $scope.cancelRequest = function() {
        $uibModalInstance.close('success');
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});