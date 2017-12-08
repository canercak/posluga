'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
// 'use strict';
var NavbarController = function NavbarController(Auth, $cookieStore, OptionsService, amMoment, $state, gettext, $scope, gettextCatalog, $http, $filter, $rootScope, $uibModal, $window) {
    _classCallCheck(this, NavbarController);
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.isEditor = Auth.isEditor;
    this.isProvider = Auth.isProvider;
    this.getCurrentUser = Auth.getCurrentUser;
    $rootScope.modalopen = false;
    if (this.isProvider === true) {
        $scope.showprovider = true;
    } else {
        $scope.showprovider = false;
    }
    var user = Auth.getCurrentUser();
    $scope.getSearchtext = function(val) {
        return $http.post('/api/services/search/' + val + '/' + $scope.languageKey).then(function(response) {
            response.data.hits.hits.forEach(function(data) {
                if (data !== null) {
                    //why null?
                    data.subcat = $filter('translateFilter')(data.subcategory, $scope.languageKey);
                }
            });
            return response.data.hits.hits;
        });
    };
    $scope.$on('msgid', function(event, newprovider) {
        if (newprovider) {
            $scope.showprovider = true;
        } else {
            $scope.showprovider = Auth.isProvider();
        }
    });
    $scope.gotoSelected = function() {
        $state.go(Auth.isLoggedIn() === true ? 'profile' : 'giveservice');
    };

    function setLanguageValues(reload) {
        jQuery.datetimepicker.setLocale($scope.languageKey);
        gettextCatalog.setCurrentLanguage($scope.languageKey);
        amMoment.changeLocale($scope.languageKey);
        if (reload) {
            $state.reload();
        }
    }
    $rootScope.updateLanguage = function(usingnavbar, reload) {
        setLanguage(usingnavbar, reload);
    }
    $scope.setRayonText = function(text) {
        if (text !== undefined) {
            var ryn = $filter('translatePlaceFilter')(text, $scope.languageKey);
            if (ryn.indexOf(" город") > -1) {
                ryn = ryn.replace(" город", "");
            }
            return ryn;
        }
    }

    function setLanguage(usingnavbar, reload) {
        if (Auth.isLoggedIn() === true) {
            var user = Auth.getCurrentUser();
            if (usingnavbar) {
                user.language = $scope.languageKey;
                $http.put('/api/users/' + user._id + '/language', user).success(function(user) {
                    setLanguageValues(reload);
                    $cookieStore.put('language', $scope.languageKey);
                });
            } else {
                $scope.languageKey = user.language;
                $cookieStore.put('language', $scope.languageKey);
                setLanguageValues(reload);
            }
        } else {
            if (usingnavbar) {
                setLanguageValues(reload)
                $cookieStore.put('language', $scope.languageKey);
            } else {
                var language = $cookieStore.get('language');
                if (!language) {
                    $cookieStore.put('language', $scope.languageKey);
                } else {
                    $scope.languageKey = language;
                }
                setLanguageValues(reload)
            }
        }
    };
    $scope.subjects = [];
    $scope.menu = [];
    $http.get('/api/services/subjects/all').success(function(result) {
        $scope.subjects = result.subjects;
        $scope.topservices = result.topservices;
        $scope.languageKey = (Auth.getCurrentUser().language !== undefined && Auth.getCurrentUser().language !== null) ? Auth.getCurrentUser().language : 'ru';
        setLanguage(false, true);
        ///!!!!!!!! you can set the language here
    });
};
angular.module('poslugaApp').controller('NavbarController', NavbarController);