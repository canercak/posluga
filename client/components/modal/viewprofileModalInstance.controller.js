angular.module('poslugaApp').controller('ViewProfileModalInstanceCtrl', function($scope, $http, $uibModalInstance, $rootScope, $filter) {
    $scope.provider = $scope.provider;
    $scope.providername = $scope.provider.businesstype.objectid === 2 ? $scope.provider.company : ($scope.provider.firstname + ' ' + $scope.provider.lastname);
    $scope.ok = function() {
        $rootScope.provider = $scope.provider;
        $uibModalInstance.close('success');
    };
    $scope.cancelRequest = function() {
        $uibModalInstance.close('success');
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});