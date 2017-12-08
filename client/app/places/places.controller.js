'use strict';
angular.module('poslugaApp').controller('PlacesCtrl', function($sce, $state, $uibModal, $scope, $http, $stateParams, Auth, $filter, angularLoad, MetatagService, gettextCatalog, $window, ngMeta) {
    $scope.state = $state.current.name;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.oblasts = [];
    $scope.servicelist = [];
    $scope.providercount = undefined;
    $scope.providerlist = [];
    $scope.oblast = undefined;
    $scope.rayon = undefined;
    $scope.gorad = undefined;
    $scope.quotesWithReviews = []
    $scope.switchview = "";
    var widget = this;
    $scope.$watch(function() {
        return widget.href;
    }, function() {
        widget.rendered = false;
    });

    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }
    $scope.comments = [{
        firstname: "Георгий",
        place: "Киев",
        service: "Бухгалтерские услуги",
        price: "1200",
        leftAt: moment("11.04.2016"),
        message: "Хорошая компания, буду работать с ними постоянно. Во-первых значительно дешевле,чем нанимать бухгалтера на постоянную работу, во вторых компания очень совестно выполнила свою работу,не нужен контроль."
    }, {
        firstname: "Віталіна",
        place: "Київ",
        service: "Услуги сантехника",
        price: "300",
        leftAt: moment("11.01.2016"),
        message: "Ви мене просто врятували від потопу! Спасибі,що швидко приїхали! Дуже задоволена роботою і швидкістю."
    }, {
        firstname: "Анатолий",
        place: "Днепр",
        service: "Ремонт квартир",
        price: "12500",
        leftAt: moment("10.23.2016"),
        message: "Очень хорошо сделали, хоть и по срокам чуть-чуть подвели, но зато качественно."
    }, {
        firstname: "Василий",
        place: "Черкассы",
        service: "Услуги плотника",
        price: "1100",
        leftAt: moment("10.08.2016"),
        message: "Закал стол из дуба - красота неописуемая! Буду еще заказывать."
    }, {
        firstname: "Анастасия",
        place: "Днепр",
        service: "Услуги визажиста",
        price: "600",
        leftAt: moment("08.28.2016"),
        message: "Свадебный макияж просто супер! Чувствовала себя самой красивой. Визажист приятная девушка, на годовщину свадьбы тоже пойду к ней."
    }, {
        firstname: "Алина",
        place: "Киев",
        service: "Дерматолог",
        price: "250",
        leftAt: moment("08.24.2016"),
        message: "Сделали механическую чистку, мне понравилось. Недавно переехала в город, даже не знала где искать косметолога."
    }, {
        firstname: "Елена",
        place: "Харьков",
        service: "Стрижка кошек",
        price: "220",
        leftAt: moment("07.19.2016"),
        message: "Очень прикольно постригли! Теперь у меня не кот, а целый лев! И кот не царапался почти, видать хороший человек стриг))"
    }]
    if ($state.current.name === 'katalog') {
        if ($stateParams.oblast === null && $stateParams.rayon === null && $stateParams.gorad === null && $stateParams.rayongorad === null) {
            $scope.switchview = "strana";
            $http.get('/api/places/oblasts/all' + '/' + 'ru').success(function(oblasts) {
                $scope.oblasts = oblasts;
                findservices("strana", false);
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon === null && $stateParams.gorad === null && $stateParams.rayongorad === null) {
            $scope.switchview = "oblast";
            $http.get('/api/places/rayons/' + $stateParams.oblast + '/' + 'ru').success(function(result) {
                $scope.rayons = result;
                if (result.length > 0) {
                    $scope.oblast = result[0].oblast;
                    findservices("oblast", false);
                } else {
                    $http.get('/api/places/findfromslugoblast/' + $stateParams.oblast).success(function(place) {
                        $scope.oblast = place.oblast;
                        findservices("oblast", false);
                    })
                }
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon !== null && $stateParams.gorad === null && $stateParams.rayongorad === null) {
            $scope.switchview = "rayon";
            $http.get('/api/places/gorads/' + $stateParams.rayon + '/' + $stateParams.oblast + '/' + 'ru').success(function(results) {
                $scope.gorads = results;
                if (results.length > 0) {
                    $scope.rayon = results[0].rayon;
                    $scope.oblast = results[0].oblast;
                    findservices("rayon", false);
                } else {
                    $http.get('/api/places/findfromslugrayon/' + $stateParams.oblast + '/' + $stateParams.rayon).success(function(place) {
                        $scope.rayon = place.rayon;
                        $scope.oblast = place.oblast;
                        findservices("rayon", false);
                    })
                }
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon !== null && $stateParams.gorad !== null && $stateParams.rayongorad === null) {
            $scope.switchview = "gorad";
            $http.get('/api/places/rayongorads/' + $stateParams.oblast + '/' + $stateParams.gorad + '/' + $stateParams.rayon + '/' + 'ru').success(function(results) {
                $scope.rayongorads = results;
                if (results.length > 0) {
                    $scope.rayon = results[0].rayon;
                    $scope.gorad = results[0].gorad;
                    $scope.oblast = results[0].oblast;
                    findservices("gorad", false);
                } else {
                    $http.get('/api/places/findfromsluggorad/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad).success(function(place) {
                        $scope.rayon = place.rayon;
                        $scope.oblast = place.oblast;
                        $scope.gorad = place.gorad;
                        findservices("gorad", false);
                    })
                }
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon !== null && $stateParams.gorad !== null && $stateParams.rayongorad !== null) {
            $scope.switchview = "rayongorad";
            $http.get('/api/places/findfromslugrayongorad/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(place) {
                $scope.rayon = place.rayon;
                $scope.oblast = place.oblast;
                $scope.gorad = place.gorad;
                $scope.rayongorad = place.rayongorad;
                findservices("rayongorad", false);
            })
        }
    } else if ($state.current.name === 'top10') {
        if ($stateParams.oblast === null && $stateParams.rayon === null && $stateParams.gorad === null && $stateParams.rayongorad === null) {
            $scope.switchview = "strana";
            $http.get('/api/services/findbyslug/' + $stateParams.service).success(function(service) {
                $scope.service = service;
                $http.get('/api/providers/providersbyserviceplace/' + 'strana' + '/' + service._id + '/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(results) {
                    $scope.providerlist = results.providers;
                    $scope.providercount = results.count;
                    findBestReviews("stranacompanies");
                });
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon === null && $stateParams.gorad === null && $stateParams.rayongorad === null) {
            $scope.switchview = "oblast";
            $http.get('/api/services/findbyslug/' + $stateParams.service).success(function(service) {
                $scope.service = service;
                $http.get('/api/providers/providersbyserviceplace/' + 'oblast' + '/' + service._id + '/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(results) {
                    $scope.providerlist = results.providers;
                    $scope.providercount = results.count;
                    // if ($scope.providerlist.length > 0) {
                    //     $scope.oblast = $scope.providerlist[0].oblast;
                    //     findBestReviews("oblastcompanies");
                    // } else {
                    $http.get('/api/places/findfromslugoblast/' + $stateParams.oblast).success(function(place) {
                        $scope.oblast = place.oblast;
                        findBestReviews("oblastcompanies");
                    })
                    // }
                });
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon !== null && $stateParams.gorad === null && $stateParams.rayongorad === null) {
            $scope.switchview = "rayon";
            $http.get('/api/services/findbyslug/' + $stateParams.service).success(function(service) {
                $scope.service = service;
                $http.get('/api/providers/providersbyserviceplace/' + 'rayon' + '/' + service._id + '/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(results) {
                    $scope.providerlist = results.providers;
                    $scope.providercount = results.count;
                    // if ($scope.providerlist.length > 0) {
                    //     $scope.oblast = $scope.providerlist[0].oblast;
                    //     $scope.rayon = $scope.providerlist[0].rayon;
                    //     findBestReviews("rayoncompanies");
                    // } else {
                    $http.get('/api/places/findfromslugrayon/' + $stateParams.oblast + '/' + $stateParams.rayon).success(function(place) {
                        $scope.rayon = place.rayon;
                        $scope.oblast = place.oblast;
                        findBestReviews("rayoncompanies");
                    })
                    // }
                });
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon !== null && $stateParams.gorad !== null && $stateParams.rayongorad === null) {
            $scope.switchview = "gorad";
            $http.get('/api/services/findbyslug/' + $stateParams.service).success(function(service) {
                $scope.service = service;
                $http.get('/api/providers/providersbyserviceplace/' + 'gorad' + '/' + service._id + '/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(results) {
                    $scope.providerlist = results.providers;
                    $scope.providercount = results.count;
                    // if ($scope.providerlist.length > 0) {
                    //     $scope.oblast = $scope.providerlist[0].oblast;
                    //     $scope.rayon = $scope.providerlist[0].rayon;
                    //     $scope.gorad = $scope.providerlist[0].gorad;
                    //     findBestReviews("goradcompanies");
                    // } else {
                    $http.get('/api/places/findfromsluggorad/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad).success(function(place) {
                        $scope.rayon = place.rayon;
                        $scope.oblast = place.oblast;
                        $scope.gorad = place.gorad;
                        findBestReviews("goradcompanies");
                    })
                    //}
                })
            });
        } else if ($stateParams.oblast !== null && $stateParams.rayon !== null && $stateParams.gorad !== null && $stateParams.rayongorad !== null) {
            $scope.switchview = "rayongorad";
            $http.get('/api/services/findbyslug/' + $stateParams.service).success(function(service) {
                $scope.service = service;
                $http.get('/api/providers/providersbyserviceplace/' + 'rayongorad' + '/' + service._id + '/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(results) {
                    $scope.providerlist = results.providers;
                    $scope.providercount = results.count;
                    // if ($scope.providerlist.length > 0) {
                    //     $scope.oblast = $scope.providerlist[0].oblast;
                    //     $scope.rayon = $scope.providerlist[0].rayon;
                    //     $scope.gorad = $scope.providerlist[0].gorad;
                    //     $scope.rayongorad = $scope.providerlist[0].rayongorad;
                    //     findBestReviews("rayongoradcompanies");
                    // } else {
                    $http.get('/api/places/findfromslugrayongorad/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(place) {
                        $scope.rayon = place.rayon;
                        $scope.oblast = place.oblast;
                        $scope.gorad = place.gorad;
                        $scope.rayongorad = place.rayongorad;
                        findBestReviews("rayongoradcompanies");
                    })
                    //}
                });
            });
        }
    }

    function findBestReviews(placetype) {
        var nofollow = true
        if ($scope.providerlist.length > 0 && (placetype === 'rayoncompanies')) {
            if ($scope.rayon.ru.indexOf(' город') > -1) {
                nofollow = false;
            }
        }
        assignMetaTags(placetype, false, $scope.service, nofollow);
        angularLoad.loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-585f468486e95396');
    }

    function findservices(placetype, hasservice) {
        $http.get('/api/providers/listservices/' + placetype + '/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(results) {
            $scope.servicelist = _.sortBy(results, function(o) {
                if ($scope.languageKey === 'ru') {
                    return o.subcategory.ru.text
                } else if ($scope.languageKey === 'uk') {
                    return o.subcategory.uk.text
                } else if ($scope.languageKey === 'en') {
                    return o.subcategory.en.text
                }
            });
            var nofollow = true;
            assignMetaTags(placetype, hasservice, null, nofollow)
        });
    }

    function assignMetaTags(placetype, hasservice, service, nofollow) {
        var title = gettextCatalog.getString('Company Directory') + ' | Posluga.ua';
        var h1 = title;
        var description = gettextCatalog.getString("Click on a place or a service to view it's details");
        var h2 = description;
        var image = 'https://s3-eu-west-1.amazonaws.com/poslugaua/pictures/poslugactafacebook.png';
        var title1 = ' - ' + gettextCatalog.getString('Services we provide') + ' | Posluga.ua';
        var title2 = ' | Posluga.ua';
        var desc1 = gettextCatalog.getString('Get Free Price Quotes For Services.') + '. ';
        var desc2 = ' - ' + gettextCatalog.getString('Places we operate') + ', ' + gettextCatalog.getString('Services we provide');
        var topten = ' ' + gettextCatalog.getString('Top 10 companies');
        var servicetext1 = gettextCatalog.getString('Get 5')
        var servicetext2 = gettextCatalog.getString('price quotes and compare.')
        var nedorogo = " Недорого и самая низкая цена вы можете найти, потому что компании конкурируют между собой, чтобы дать вам самую лучшую."
        if (placetype === 'strana') {
            //conolse
        } else if (placetype === 'oblast') {
            var obl = $filter('translatePlaceFilter')($scope.oblast, $scope.languageKey);
            title = obl + title1;
            description = desc1 + obl + desc2
        } else if (placetype === 'rayon') {
            var oblray = $filter('translatePlaceFilter')($scope.oblast, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey);
            title = oblray + title1;
            description = desc1 + oblray + desc2
        } else if (placetype === 'gorad') {
            var oblraygor = $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey);
            title = oblraygor + title1;
            description = desc1 + oblraygor + desc2
        } else if (placetype === 'rayongorad' && hasservice === false) {
            var oblraygorrad = $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey);
            title = oblraygorrad + title1;
            description = desc1 + oblraygorrad + desc2
        } else if (placetype === 'rayongorad' && hasservice === true) {
            var oblraygorrad = $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.rayongorad, $scope.languageKey);
            title = oblraygorrad + title1;
            description = desc1 + oblraygorrad + desc2
        } else if (placetype === 'stranacompanies') {
            var serv = $filter('translateFilter')(service.subcategory, $scope.languageKey);
            title = serv + title2;
            h1 = serv
            h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
            description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
        } else if (placetype === 'oblastcompanies') {
            var obl = ' ' + $filter('translatePlaceFilter')($scope.oblast, $scope.languageKey);
            var oblinform = ' ' + $filter('translatePlaceInformFilter')($scope.oblast, $scope.languageKey);
            var serv = $filter('translateFilter')(service.subcategory, $scope.languageKey);
            title = serv + obl + title2;
            h1 = serv + oblinform
            h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
            description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
        } else if (placetype === 'rayoncompanies') {
            var serv = $filter('translateFilter')(service.subcategory, $scope.languageKey);
            var obl = $filter('translatePlaceFilter')($scope.oblast, $scope.languageKey);
            var oblinform = ' ' + $filter('translatePlaceInformFilter')($scope.oblast, $scope.languageKey);
            var ryn = $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey);
            var ryninform = ' ' + $filter('translatePlaceInformFilter')($scope.rayon, $scope.languageKey);
            if ($scope.rayon.ru.indexOf(" город") > -1) {
                var str = ryn.replace(" город", "");
                title = serv + ' ' + str + title2;
                h1 = serv + ryninform
                h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
            } else {
                title = serv + ' ' + obl + ' - ' + ryn + title2;
                h1 = serv + oblinform + ' - ' + ryn
                h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
            }
        } else if (placetype === 'goradcompanies') {
            var serv = $filter('translateFilter')(service.subcategory, $scope.languageKey);
            var grd = $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey);
            var ryn = $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey);
            var ryninform = ' ' + $filter('translatePlaceInformFilter')($scope.rayon, $scope.languageKey);
            if ($scope.rayon.ru.indexOf(" город") > -1) {
                var str = ryn.replace(" город", "");
                if (str === grd) {
                    title = serv + ' ' + ryn + ' - ' + grd + title2;
                    h1 = serv + ryn + ' - ' + grd
                    h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                    description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                } else {
                    title = serv + ' ' + str + ' - ' + grd + title2;
                    h1 = serv + ryninform + ' - ' + grd
                    h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                    description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                }
            } else {
                title = serv + ' ' + ryn + ' - ' + grd + title2;
                h1 = serv + ryninform + ' - ' + grd
                h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
                description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
            }
        } else if (placetype === 'rayongoradcompanies') {
            var raygorad = $filter('translatePlaceFilter')($scope.rayongorad, $scope.languageKey);
            var serv = $filter('translateFilter')(service.subcategory, $scope.languageKey);
            var grd = $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey);
            var ryn = $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey);
            var ryninform = $filter('translatePlaceInformFilter')($scope.rayon, $scope.languageKey);
            title = serv + ' ' + ryn + ' - ' + raygorad + title2;
            h1 = serv + ' ' + ryninform + ' - ' + raygorad
            h2 = servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
            description = h1 + '. ' + servicetext1 + ' ' + serv + ' ' + servicetext2 + nedorogo;
        } else {}
        $scope.title = title;
        $scope.h1 = h1;
        $scope.h2 = h2;
        $scope.description = description;
        MetatagService.setMetaTags("Posluga.ua", title, description, image, nofollow);
    }
    $scope.changePop = function(serviceid) {
        $scope['popoverIsOpen' + s._id] = !$scope['popoverIsOpen' + s._id]
        $scope.serviceid = serviceid;
    }
    $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
});