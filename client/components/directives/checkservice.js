angular.module('poslugaApp').directive('uniqueIdChecker', ['$http', 'Auth',
    function($http, Auth) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                uniqueIdChecker: '=uniqueIdChecker'
            },
            link: function(scope, elm, attrs, ctrl, ngModel) {
                var currentUser = Auth.getCurrentUser();
                var validateFn = function(viewValue, oblastslug) {
                    $http.get('/api/providers/checkservice/' + viewValue + '/' + currentUser._id + '/' + oblastslug).success(function(provider) {
                        if (provider) {
                            ctrl.$setValidity('nonUniqueId', false);
                        } else {
                            ctrl.$setValidity('nonUniqueId', true);
                        }
                    }, function() {
                        ctrl.$setValidity('nonUniqueId', false);
                    });
                    return viewValue;
                };
                ctrl.$parsers.push(validateFn);
                ctrl.$formatters.push(validateFn);
            }
        }
    }
]);