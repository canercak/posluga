'use strict';
angular.module('poslugaApp').controller('DashboardCtrl', function(OptionsService, MetatagService, $state, $speakingurl, $uibModal, $scope, $http, Auth) {
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
});