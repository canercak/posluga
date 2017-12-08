angular.module('poslugaApp').controller('CategoryModalInstanceCtrl', function($scope, $http, $uibModalInstance, $rootScope, subjectOptions, $filter, languageKey) {
    $scope.subjectOptions = subjectOptions.subjects;
    $scope.languageKey = languageKey;
    $scope.subject = $scope.subjectOptions[0];
    $scope.manualEntry = false;
    $scope.serviceinput = "";
    $scope.getCategories = function() {
        $http.get('/api/services/category/' + $scope.subject.subjectid).success(function(results) {
            $scope.categoryOptions = results;
            $scope.category = $scope.categoryOptions[0];
            $scope.getSubcategories();
        })
    };
    $scope.getSubcategories = function() {
        $http.get('/api/services/subcategories/' + $scope.category.categories[0].categoryid).success(function(results) {
            $scope.subcategoryOptions = results;
            $scope.subcategory = $scope.subcategoryOptions[0];
        })
    };
    $scope.enterManual = function() {
        $scope.manualEntry = true;
    }
    $scope.ok = function() {
        $rootScope.searchtext = undefined;
        $rootScope.subcategory = $scope.subcategory;
        $uibModalInstance.close('success');
    };
    $scope.cancelRequest = function() {
        $uibModalInstance.close('success');
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.loadManual = function() {
        $rootScope.subcategory = undefined;
        $rootScope.searchtext = $scope.serviceinput;
        $uibModalInstance.close('success');
    };
    $scope.getCategories();
    $scope.serviceType = 'request';
});