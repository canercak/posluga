'use strict';
angular.module('poslugaApp').controller('PwdResetCtrl', function($scope, Auth, $stateParams, MetatagService) {
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    var passwordResetToken = $stateParams.passwordResetToken;
    $scope.pwdResetState = 'mailform';
    $scope.submitted = false;
    $scope.pwdResetMailSend = false;
    $scope.addressnotknown = false;
    if (passwordResetToken) {
        Auth.confirmResetedPassword(passwordResetToken).then(function() {
            $scope.pwdResetState = 'valid_token';
        }).catch(function() {
            $scope.pwdResetState = 'invalid_token';
        });
    }
    $scope.sendPwdResetMail = function(form) {
        if (form.$valid) {
            //form.email.$setValidity('unknownMailAddress', true);
            $scope.addressnotknown = false;
            $scope.submitted = true;
            $scope.pwdResetMailSend = true;
            Auth.sendPwdResetMail($scope.reset.email, $scope.reset.newPassword).then(function() {
                $scope.pwdResetState = 'mailsent';
            }).catch(function() {
                //form.email.$setValidity('unknownMailAddress', false);
                $scope.addressnotknown = true;
                $scope.pwdResetMailSend = false;
                $scope.submitted = false;
            });
        }
    };
    $scope.resetStateIs = function(state) {
        return $scope.pwdResetState === state;
    };
});