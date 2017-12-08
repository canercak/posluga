'use strict';
angular.module('poslugaApp').controller('SettingsCtrl', function($scope, $http, MetatagService, ngXml2json, User, Auth, gettextCatalog, Upload, $state, $stateParams) {
    $scope.user = Auth.getCurrentUser();
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    $scope.savemessage = "";
    $scope.errors = {};
    $scope.hasError = 'false';
    $scope.userhasprovider = true;
    $scope.adminview = false;
    if ($state.current.name === 'settings') {
        if ($stateParams.adminuser !== null && Auth.isAdmin) {
            $scope.adminview = true;
            $http.get('/api/users/' + $stateParams.adminuser).success(function(user) {
                $scope.user = user;
            })
        }
    }
    $scope.changePassword = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            this.submitted = true;
            Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword).then(function() {
                $scope.hasError = 'false';
                $scope.message = gettextCatalog.getString('Password successfully changed.');
            }).catch(function() {
                $scope.hasError = 'true';
                $scope.message = gettextCatalog.getString('Error in changing password. Please check your current password.');
            });
        }
    };
    $scope.changeNotifications = function() {
        Auth.changeNotifications($scope.user.notifications).then(function() {
            $scope.hasError = 'false';
            $scope.savemessage = gettextCatalog.getString('Notifacation settings successfully changed.');
        }).catch(function() {
            $scope.hasError = 'true';
            $scope.errors.other = gettextCatalog.getString('Error in saving notification settings');
        });
    };
    $scope.changeName = function() {
        if ($stateParams.adminuser !== null && Auth.isAdmin) {
            $http.put('/api/users/' + $scope.user._id + '/name', $scope.user).success(function(user) {
                if ($stateParams.type === 'editfromadminrequests') {
                    $state.go('adminrequest', {
                        requestid: $stateParams.requestid
                    });
                }
            })
        } else {
            Auth.changeName($scope.user.name, $scope.user.email, $scope.user.picture).then(function() {
                $scope.hasErroruser = 'false';
                $scope.savemessageuser = gettextCatalog.getString('User Profile successfully changed.');
            }).catch(function() {
                $scope.hasErroruser = 'true';
                $scope.errors.other = gettextCatalog.getString('Error in saving user profile settings');
            });
        }
    };
    $scope.onFileSelect = function($files) {
        $scope.files = $files;
        $scope.upload = [];
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            file.progress = parseInt(0);
            (function(file, i) {
                $http.get('/api/aws/getS3Policy?mimeType=' + file.type).success(function(response) {
                    var s3Params = response;
                    $scope.upload[i] = Upload.upload({
                        url: 'https://poslugaua.s3.amazonaws.com/',
                        method: 'POST',
                        transformRequest: function(data, headersGetter) {
                            //Headers change here
                            var headers = headersGetter();
                            delete headers['Authorization'];
                            return data;
                        },
                        data: {
                            'key': 'uploadedfiles/' + Math.round(Math.random() * 10000) + '$$' + file.name,
                            'acl': 'public-read',
                            'Content-Type': file.type,
                            'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                            'success_action_status': '201',
                            'Policy': s3Params.s3Policy,
                            'Signature': s3Params.s3Signature
                        },
                        file: file,
                    });
                    $scope.upload[i].then(function(response) {
                        file.progress = parseInt(100);
                        if (response.status === 201) {
                            var data = ngXml2json.parser(response.data);
                            $scope.user.picture = data.postresponse.location;
                        } else {
                            //alert('Upload Failed');
                        }
                    }, null, function(evt) {
                        file.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
                });
            }(file, i));
        }
    };
});