'use strict';
angular.module('poslugaApp').config(function($stateProvider) {
    $stateProvider.state('katalog', {
            url: '/katalog/:oblast/:rayon/:gorad/:rayongorad',
            templateUrl: 'app/places/katalog.html',
            controller: 'PlacesCtrl',
            controllerAs: 'places',
            params: {
                oblast: {
                    squash: true,
                    value: null
                },
                rayon: {
                    squash: true,
                    value: null
                },
                gorad: {
                    squash: true,
                    value: null
                },
                rayongorad: {
                    squash: true,
                    value: null
                }
            }
        }).state('top10', {
            url: '/top-10/:service/:oblast/:rayon/:gorad/:rayongorad',
            templateUrl: 'app/places/top10.html',
            controller: 'ProviderCtrl',
            controllerAs: 'places',
            params: {
                service: {
                    squash: true,
                    value: null
                },
                oblast: {
                    squash: true,
                    value: null
                },
                rayon: {
                    squash: true,
                    value: null
                },
                gorad: {
                    squash: true,
                    value: null
                },
                rayongorad: {
                    squash: true,
                    value: null
                }
            }
        })
        // .state('rayon', {
        //     url: '/katalog/:oblastslug',
        //     templateUrl: 'app/places/rayon.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined
        //     }
        // }).state('gorad', {
        //     url: '/katalog/gorad/:oblastslug/:rayonslug',
        //     templateUrl: 'app/places/gorad.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined
        //     }
        // }).state('rayongorad', {
        //     url: '/katalog/rayongorad/:oblastslug/:rayonslug/:goradslug',
        //     templateUrl: 'app/places/rayongorad.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined,
        //         goradslug: undefined
        //     }
        // }).state('goradservices', {
        //     url: '/uslugii-gorad/:oblastslug/:rayonslug/:goradslug',
        //     templateUrl: 'app/places/goradservices.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined,
        //         goradslug: undefined
        //     }
        // }).state('rayonservices', {
        //     url: '/uslugii-rayon/:oblastslug/:rayonslug',
        //     templateUrl: 'app/places/rayonservices.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined
        //     }
        // }).state('rayongoradservices', {
        //     url: '/uslugii-rayongorad/:oblastslug/:rayonslug/:goradslug/:rayongoradslug',
        //     templateUrl: 'app/places/rayongoradservices.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined,
        //         goradslug: undefined
        //     }
        // }).state('stranacompanies', {
        //     url: '/kompanii-strana/:serviceslug',
        //     templateUrl: 'app/places/stranacompanies.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         serviceslug: undefined
        //     }
        // }).state('oblastcompanies', {
        //     url: '/kompanii-oblast/:oblastslug/:serviceslug',
        //     templateUrl: 'app/places/oblastcompanies.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         serviceslug: undefined
        //     }
        // }).state('rayoncompanies', {
        //     url: '/kompanii-rayon/:oblastslug/:rayonslug/:serviceslug',
        //     templateUrl: 'app/places/rayoncompanies.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined,
        //         serviceslug: undefined
        //     }
        // }).state('goradcompanies', {
        //     url: '/kompanii-gorad/:oblastslug/:rayonslug/:goradslug/:serviceslug',
        //     templateUrl: 'app/places/goradcompanies.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined,
        //         goradslug: undefined,
        //         serviceslug: undefined
        //     }
        // }).state('rayongoradcompanies', {
        //     url: '/kompanii-rayongorad/:oblastslug/:rayonslug/:goradslug/:rayongoradslug/:serviceslug',
        //     templateUrl: 'app/places/rayongoradcompanies.html',
        //     controller: 'ProviderCtrl',
        //     controllerAs: 'places',
        //     params: {
        //         oblastslug: undefined,
        //         rayonslug: undefined,
        //         goradslug: undefined,
        //         rayongoradslug: undefined,
        //         serviceslug: undefined
        //     }
        // })
});