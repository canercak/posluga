'use strict';
angular.module('poslugaApp').controller('ServicesCtrl', function(gettext, MetatagService, gettextCatalog, $sce, $state, $uibModal, $scope, $http, $stateParams, Auth, $filter) {
    $scope.state = $state.current.name;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.subject = {};
    $scope.subjectDetails = {};
    $scope.subjectimage = undefined;
    $scope.serviceid = undefined;
    $scope.desc = undefined;
    if ($state.current.name === 'subject') {
        $http.get('api/services/subjectdetail/' + $stateParams.slug + '/' + $scope.languageKey).success(function(results) {
            $scope.allSubcategories = results.all;
            $scope.popularSubcategories = results.popular;
            $scope.subjectid = results.all[0].categories[0].subjectid;
            $scope.subject = $filter('translateFilter')(results.all[0].categories[0].subject, $scope.languageKey);
            $scope.subjectimage = results.all[0].categories[0].subjectimage;
            if ($scope.subjectid === 1) {
                $scope.desc = gettextCatalog.getString('Compare constructors to renovate your home with the right professionals.');
            } else if ($scope.subjectid === 2) {
                $scope.desc = gettextCatalog.getString("Life is too short to clean your own house! Contact us and we find best people to do it for you.");
            } else if ($scope.subjectid === 3) {
                $scope.desc = gettextCatalog.getString('We are here to help you outsource the services that will save time (and your sanity).');
            } else if ($scope.subjectid === 4) {
                $scope.desc = gettextCatalog.getString('Regain control of your life with our services to help with all your personal needs.');
            } else if ($scope.subjectid === 5) {
                $scope.desc = gettextCatalog.getString('A truly successful event starts way before the linens, flowers and lighting. We help you organise that.');
            } else if ($scope.subjectid === 6) {
                $scope.desc = gettextCatalog.getString('From finding the perfect teacher to managing scheduling, we take care the details so you can focus on learning.');
            } else if ($scope.subjectid === 7) {
                $scope.desc = gettextCatalog.getString('Anything related with transport? We are here find you best people to do it!');
            }
            var title = $scope.subject + ' | Posluga.ua';
            var description = $scope.desc;
            MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
        });
    } else if ($state.current.name === 'allservices') {
        $http.get('api/services/allservices/' + $scope.languageKey).success(function(results) {
            $scope.allservices = results;
            var title = gettextCatalog.getString('All Services') + ' | Posluga.ua';
            var description = gettextCatalog.getString('From house painting to yoga training, we bring you the right service providers for all your needs.');
            MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
        });
    }
    $scope.changePop = function(serviceid) {
        $scope['popoverIsOpen' + s._id] = !$scope['popoverIsOpen' + s._id]
        $scope.serviceid = serviceid;
    }
    $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
});