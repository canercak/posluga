'use strict';
angular.module('poslugaApp').controller('FinancesCtrl', function($state, MetatagService, gettextCatalog, OptionsService, $uibModal, $scope, $http, $stateParams, Auth) {
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    $scope.state = $state.current.name;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.transactionTypes = [{
        objectid: 1,
        name: gettextCatalog.getString('Credit Card Payment'),
        add: true
    }, {
        objectid: 2,
        name: gettextCatalog.getString('Quote Commission to Pay'),
        add: false
    }, {
        objectid: 3,
        name: gettextCatalog.getString('Service Taken'),
        add: false
    }, {
        objectid: 4,
        name: gettextCatalog.getString('Bank Payment'),
        add: true
    }];
    $scope.transactions = {};
    $scope.finalbalance = 0;
    $scope.commtopay = 0;
    $scope.payments = 0;
    $scope.commissions = 0;
    $http.get('/api/transactions/user/' + $scope.currentUser._id).success(function(transactions) {
        $scope.transactions = transactions;
        if (transactions.length > 0) {
            $scope.finalbalance = String($scope.transactions[$scope.transactions.length - 1].balance.value)
            transactions.forEach(function(transaction) {
                if (transaction.transactionType.add === false) {
                    $scope.commtopay += transaction.amount.value;
                    $scope.commissions += transaction.amount.value;
                }
                if (transaction.transactionType.add === true) {
                    $scope.payments += transaction.amount.value;
                }
            })
            if (($scope.payments - $scope.commtopay) < 0) {
                $scope.commtopay = $scope.commtopay - $scope.payments;
            } else {
                $scope.commtopay = 0;
            }
        }
    });
});