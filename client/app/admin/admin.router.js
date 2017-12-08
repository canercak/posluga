'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin'
    }).state('preprovider', {
        url: '/admin/preprovider?preproviderid',
        templateUrl: 'app/admin/preprovider.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            preproviderid: null
        }
    }).state('adminservice', {
        url: '/admin/adminservice?serviceid',
        templateUrl: 'app/admin/adminservice.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            serviceid: null,
            createsimilar: null
        }
    }).state('adminrequest', {
        url: '/admin/adminrequest?requestid',
        templateUrl: 'app/admin/adminrequest.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            requestid: undefined
        }
    }).state('adminarticle', {
        url: '/admin/adminarticle?articleid',
        templateUrl: 'app/admin/adminarticle.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            articleid: null
        }
    }).state('adminservicegroup', {
        url: '/admin/adminservicegroup?servicegroupid',
        templateUrl: 'app/admin/adminservicegroup.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            servicegroupid: null
        }
    }).state('addfunds', {
        url: '/admin/addfunds?userid&transactionid',
        templateUrl: 'app/admin/addfunds.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            userid: null,
            transactionid: null
        }
    }).state('preproviderlist', {
        url: '/admin/preproviderlist?type',
        templateUrl: 'app/admin/preproviderlist.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    }).state('providerlist', {
        url: '/admin/providerlist?type',
        templateUrl: 'app/admin/providerlist.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    }).state('userlist', {
        url: '/admin/userlist?type',
        templateUrl: 'app/admin/userlist.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    }).state('requestlist', {
        url: '/admin/requestlist?type',
        templateUrl: 'app/admin/requestlist.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    }).state('servicelist', {
        url: '/admin/servicelist?type',
        templateUrl: 'app/admin/servicelist.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    }).state('articlelist', {
        url: '/admin/articlelist?type',
        templateUrl: 'app/admin/articlelist.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    }).state('servicegroup', {
        url: '/admin/servicegroup?type',
        templateUrl: 'app/admin/servicegroup.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin',
        params: {
            type: null
        }
    });
});