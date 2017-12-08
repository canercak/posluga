'use strict';
angular.module('poslugaApp').controller('ProviderCtrl', function(angularLoad, $timeout, $window, gettext, gettextCatalog, $filter, $rootScope, OptionsService, $state, $speakingurl, $uibModal, $scope, $http, bootstrap3ElementModifier, ngXml2json, socket, $stateParams, $location, Upload, Auth, MetatagService) {
    bootstrap3ElementModifier.enableValidationStateIcons(true);
    $scope.currentUser = Auth.getCurrentUser();
    $scope.createsimilarprovider = false;
    $scope.businessTypes = [{
        'objectid': 1,
        'name': gettextCatalog.getString('Personal')
    }, {
        'objectid': 2,
        'name': gettextCatalog.getString('Company')
    }];
    $scope.documentTypes = [{
        'objectid': 1,
        'name': gettextCatalog.getString('Certificate')
    }, {
        'objectid': 2,
        'name': gettextCatalog.getString('Licence')
    }, {
        'objectid': 3,
        'name': gettextCatalog.getString('Diploma')
    }, {
        'objectid': 4,
        'name': gettextCatalog.getString('Other')
    }];
    $scope.securityTypes = [{
        'objectid': 1,
        'name': gettextCatalog.getString('Valid Email')
    }, {
        'objectid': 2,
        'name': gettextCatalog.getString('Valid Mobile Phone')
    }, {
        'objectid': 3,
        'name': gettextCatalog.getString('Valid Credit Card')
    }, {
        'objectid': 4,
        'name': gettextCatalog.getString('Friends in Facebook')
    }, {
        'objectid': 5,
        'name': gettextCatalog.getString('Friends in Vkontakte')
    }];
    $scope.years = [{
        objectid: 2016,
        name: 2016
    }, {
        objectid: 2015,
        name: 2015
    }, {
        objectid: 2014,
        name: 2014
    }];
    $scope.isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
    }
    $scope.profileIssues = [gettextCatalog.getString('Add Profile Images'),
        gettextCatalog.getString('Add Profile Link to Your Website'),
        gettextCatalog.getString('Add Official Documents'),
        gettextCatalog.getString('Add Established Date')
    ];
    $scope.categoryOptions = [];
    $scope.selectFromList = false;
    $scope.showCompany = false;
    $scope.oblastOption = {};
    $scope.rayonOption = {};
    $scope.showRayonGorad = false;
    $scope.categoryOption = {};
    $scope.enableGorad = false;
    $scope.showGorad = false;
    $scope.enableRayonGorad = false;
    $scope.enableRayon = false;
    $scope.subcategoryOption = {};
    $scope.codeEntered = null;
    $scope.switchupdateprovider = false;
    $scope.tmpdocument = {};
    $scope.selectedfile = null;
    $scope.upload = [];
    $scope.providerupdated = false;
    $scope.switchgetquote = false;
    $scope.usergotquote = false;
    $scope.quotesWithComments = '';
    $scope.documentImages = [];
    $scope.linkTypes = [];
    $scope.outgoinglink = '';
    $scope.incominglink = '';
    $scope.image = '';
    $scope.selectedlink = {};
    $scope.focusCopy = false;
    $scope.statetype = $stateParams.type;
    $scope.share_url = 'https://url-to-share.com';
    if ($state.current.name === 'addlink') {
        $http.get('/api/providers/' + $stateParams.providerid).success(function(provider) {
            $window.scrollTo(0, 0);
            $scope.provider = provider;
            $scope.linkTypes = OptionsService.getLinkTypes($scope.provider, $scope.languageKey);
            $scope.showInlineLink($scope.linkTypes[0]);
            $scope.incomingplaceholder = gettextCatalog.getString('for example:') + ' ' + businessPlaceholder($scope.provider);
            MetatagService.setMetaTags("Posluga.ua", gettextCatalog.getString('Add your profile link to your website'), gettextCatalog.getString('First, copy and paste the gray colored link into the HTML of your website. Then, paste the web page address you placed the link in blue colored textbox. Finally, press Save button.'), $scope.provider.logo.location, true);
        });
    } else if ($state.current.name === 'pronounce') {
        $http.get('/api/providers/' + $stateParams.providerid).success(function(provider) {
            $scope.provider = provider;
            $window.scrollTo(0, 0);
            MetatagService.setMetaTags("Posluga.ua", gettextCatalog.getString('Promote Your Profile'), gettextCatalog.getString('Share your profile with your friends!'), $scope.provider.logo.location, true);
            angularLoad.loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-585f468486e95396');
        });
    } else if ($state.current.name === 'provider') {
        $http.get('/api/providers/slug/' + $stateParams.slug).success(function(provider) {
            $scope.provider = provider;
            $scope.service = provider.service;
            $scope.rayon = provider.rayon;
            $scope.oblast = provider.oblast;
            $scope.rayongorad = provider.rayongorad || undefined;
            $scope.gorad = provider.gorad || undefined;
            $scope.providerrating = parseFloat(provider.stats.scorefive);
            var businessname = $scope.provider.businesstype.objectid === 2 ? $scope.provider.company : ($scope.provider.firstname + ' ' + $scope.provider.lastname) + ' '
            var place = '';
            if ($scope.rayongorad !== undefined) {
                place = $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.rayongorad, $scope.languageKey);
            } else if ($scope.rayongorad === undefined && $scope.gorad === undefined) {
                place = $filter('translatePlaceFilter')($scope.oblast, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey);
            } else {
                place = $filter('translatePlaceFilter')($scope.rayon, $scope.languageKey) + ', ' + $filter('translatePlaceFilter')($scope.gorad, $scope.languageKey);
            }
            var description = businessname + ' - ' + $filter('translateFilter')($scope.service.subcategory, $scope.languageKey) + ' - ' + place
            var title = description + ' | Posluga.ua';
            MetatagService.setMetaTags("Posluga.ua", title, description, $scope.provider.logo.location, false);
            $http.get('/api/quotes/comments/' + $scope.provider._id).success(function(quotes) {
                $scope.quotesWithComments = quotes;
                if (provider.user._id !== $scope.currentUser._id) {
                    $scope.switchgetquote = true;
                    if ($scope.currentUser._id !== undefined) {
                        $http.get('/api/quotes/userhasquote/' + $scope.provider._id + '/' + $scope.currentUser._id).success(function(quote) {
                            $scope.usergotquote = quote.result;
                        })
                    }
                } else {
                    $scope.usergotquote = true;
                    $scope.switchgetquote = false;
                }
            });
        });
    } else if ($state.current.name === 'providers') {
        $http.get('/api/providers/user/' + $scope.currentUser._id).success(function(providers) {
            $scope.providers = providers;
            MetatagService.setMetaTags("Posluga.ua", gettextCatalog.getString('Profiles'), gettextCatalog.getString('Profiles'), "", true);
        });
    } else if ($state.current.name === 'profile') {
        $http.get('/api/services/categories/all').success(function(results) {
            $scope.categoryOptions = results;
            $http.get('/api/places/oblasts/all' + '/' + $scope.languageKey).success(function(oblasts) {
                $scope.oblastOptions = oblasts;
                if ($stateParams.providerid !== undefined) {
                    $http.get('/api/providers/' + $stateParams.providerid).success(function(provider) {
                        $scope.provider = provider;
                        $scope.provider.searchtext = setSearchText(provider.service)
                        $scope.switchupdateprovider = true;
                        $scope.setCompany($scope.provider.businesstype);
                        $scope.enableRayon = true;
                        $scope.enableNeighbor = true;
                        jQuery.datetimepicker.setLocale($scope.languageKey);
                        jQuery('#datetimepicker').datetimepicker({
                            timepicker: false,
                            format: 'd-M-Y',
                            maxDate: (moment(moment()).add(1, 'hours').format('YYYY/MM/DD'))
                        });
                        if ($scope.provider.oblast === null) {
                            $scope.provider.oblast = $scope.oblastOptions[0]
                        }
                        $scope.getOblastRayons($scope.provider.oblast);
                        if ($stateParams.createsimilar === "true") {
                            $scope.switchupdateprovider = false;
                            $scope.createsimilarprovider = true;
                            $scope.provider.searchtext = undefined;
                            $scope.provider.service = undefined;
                            $scope.provider.sequence = undefined;
                            $scope.provider.admincreated = true;
                            $scope.provider._id = undefined;
                        }
                        // $scope.rayonOptions = OptionsService.getOblastRayon($scope.provider.rayon.objectid);
                        // $scope.goradOptions = OptionsService.getRayongorad($scope.provider.gorad.objectid);
                    }).catch(function(err) {
                        console.log(err);
                    });
                } else {
                    $scope.provider = {
                        documents: [],
                        established: null,
                        links: [],
                        files: [],
                        quotes: [],
                        termsaccepted: true,
                        stats: {
                            securitychecks: [],
                            recommended: false,
                            totalscore: 0,
                            scorefive: '0',
                            quotecount: 0,
                            quotewincount: 0,
                            happycount: 0,
                            reviewcount: 0,
                            turnover: {
                                currency: 'грн.',
                                value: 0,
                            },
                            finishedcount: 0,
                            prices: {
                                currency: 'грн.',
                                lowprice: 0,
                                highprice: 0
                            },
                            priority: {
                                initial: 0,
                                profilecomplete: 0
                            },
                            profile: {
                                completeness: 0,
                                issues: []
                            }
                        }
                    }
                }
                MetatagService.setMetaTags("Posluga.ua", gettextCatalog.getString('Create your profile page'), gettextCatalog.getString('Create your profile page'), "", true);
            }).catch(function(err) {
                console.log(err);
            });
        }).catch(function(err) {
            console.log(err);
        });
    }
    $scope.getDomain = function() {
        var a = urlParser.getProtocol($location.absUrl())
        var b = urlParser.getHost($location.absUrl())
        return a + '//' + b
    }
    $scope.addLink = function() {
        $scope.laddaLoading = true;
        var link = _.findWhere($scope.provider.links, {
            objectid: $scope.selectedlink.objectid
        });
        var encodedOutgoinglink = encodeURIComponent($scope.selectedlink.outgoinglink);
        var encodedIncominglink = encodeURIComponent($scope.selectedlink.incominglink || $scope.incominglink);
        if (encodedIncominglink !== "") {
            $http.get('/api/providers/checklink/' + encodedIncominglink + "/" + encodedOutgoinglink).success(function(haslink) {
                if (haslink !== true) {
                    $scope.laddaLoading = false;
                    alert("нам удалось найти ваш профиль ссылку на Вашу страницу") //we could find your profile link in your webpage
                } else {
                    var foundlink = false;
                    $scope.provider.links.forEach(function(plink, index) {
                        if (plink.objectid === $scope.selectedlink.objectid) {
                            var foundlink = true;
                            $scope.provider.links[index] = {
                                objectid: $scope.selectedlink.objectid,
                                name: $scope.selectedlink.name,
                                image: $scope.selectedlink.image,
                                incominglink: $scope.incominglink,
                                outgoinglink: $scope.selectedlink.outgoinglink
                            }
                        }
                    })
                    if (foundlink === false) {
                        $scope.provider.links.push({
                            objectid: $scope.selectedlink.objectid,
                            name: $scope.selectedlink.name,
                            image: $scope.selectedlink.image,
                            incominglink: $scope.incominglink,
                            outgoinglink: $scope.selectedlink.outgoinglink
                        })
                    }
                    if ($scope.provider.links.length > 0) {
                        $scope.provider.hasincominglink = true;
                    } else {
                        $scope.provider.hasincominglink = false;
                    }
                    $scope.updateProvider();
                }
            });
        } else {
            $scope.laddaLoading = false;
            alert("нам удалось найти ваш профиль ссылку на Вашу страницу")
        }
    }

    function setSearchText(service) {
        if ($scope.languageKey === 'ru') {
            return service.subcategory.ru.text;
        } else if ($scope.languageKey === 'en') {
            return service.subcategory.en.text;
        } else if ($scope.languageKey === 'uk') {
            return service.subcategory.uk.text;
        }
    }
    $scope.showInlineLink = function(item) {
        var link = _.findWhere($scope.provider.links, {
            objectid: item.objectid
        });
        $scope.providerupdated = false;
        if (link !== undefined) {
            $scope.selectedlink = link;
            $scope.incominglink = link.incominglink;
            $scope.outgoinglink = link.outgoinglink;
        } else {
            $scope.selectedlink = item;
            $scope.outgoinglink = item.outgoinglink;
            $scope.incominglink = "";
        }
    }
    $scope.setCompany = function(item) {
        if (item.objectid === 2) {
            $scope.showCompany = true;
        } else {
            $scope.showCompany = false;
        }
    };
    $scope.openSelectListModal = function(size) {
        $http.get('/api/services/subjects/all').success(function(results) {
            $scope.subjectOptions = results;
            var modalInstance = $uibModal.open({
                templateUrl: 'categoryModalContent.html',
                controller: 'CategoryModalInstanceCtrl',
                size: 'lg',
                scope: $scope,
                resolve: {
                    subjectOptions: function() {
                        return $scope.subjectOptions;
                    },
                    languageKey: function() {
                        return $scope.languageKey;
                    }
                }
            });
            modalInstance.result.then(function() {
                if ($rootScope.searchtext !== undefined) {
                    $scope.provider.searchtext = $rootScope.searchtext;
                } else {
                    $scope.onTypeSelect($rootScope.subcategory);
                }
            });
        }).catch(function(err) {
            console.log(err);
        });
    };
    $scope.openviewprofileModal = function(size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'viewprofileModalContent.html',
            controller: 'ViewProfileModalInstanceCtrl',
            size: 'md',
            scope: $scope
        });
        modalInstance.result.then(function() {});
    };
    $scope.getOblastRayons = function(item) {
        $http.get('/api/places/rayons/' + item.slug + '/' + $scope.languageKey).success(function(rayons) {
            var array = _.sortBy(rayons, function(o) {
                return o.rayonhasgorad;
            })
            var goradarray = [];
            var rayonarray = [];
            array.forEach(function(elm) {
                if (elm.en.indexOf(' gorod') >= 0) {
                    goradarray.push(elm);
                } else {
                    rayonarray.push(elm);
                }
            })
            $scope.enableRayon = true;
            $scope.rayonOptions = goradarray.concat(rayonarray);
            if ($scope.provider.rayon === undefined || $scope.provider.rayon === null) {
                $scope.provider.rayon = $scope.rayonOptions[0];
                $scope.goradOptions = $scope.getRayonGorads($scope.rayonOptions[0]);
            } else {
                $scope.getRayonGorads($scope.provider.rayon);
            }
        }).catch(function(err) {
            console.log(err);
        });
    };
    $scope.getRayonGorads = function(item) {
        $http.get('/api/places/gorads/' + item.slug + '/' + $scope.provider.oblast.slug + '/' + $scope.languageKey).success(function(gorads) {
            $scope.goradOptions = gorads;
            if ($scope.goradOptions[0] === null || $scope.goradOptions[0] === undefined) {
                $scope.showGorad = false;
                $scope.showRayonGorad = false;
                $scope.enableGorad = true;
                $scope.provider.gorad = $scope.goradOptions[0];
                return null;
            } else {
                $scope.enableGorad = true;
                $scope.showGorad = true;
                $scope.showRayonGorad = false;
                if ($scope.provider.gorad === undefined || $scope.provider.gorad === null) {
                    $scope.provider.gorad = $scope.goradOptions[0];
                }
                $scope.getRayongoradGorads($scope.provider.gorad);
            }
        }).catch(function(err) {
            console.log(err);
        });
        // $http.get('/api/places/gorads/' + item.slug + '/' + $scope.provider.oblast.slug + '/' + $scope.languageKey).success(function(gorads) {
        //     $scope.goradOptions = gorads;
        //     if (gorads[0] === null || gorads[0] === undefined) {
        //         $scope.showGorad = false;
        //         $scope.showRayonGorad = false;
        //         $scope.enableGorad = true;
        //         $scope.provider.gorad = $scope.goradOptions[0];
        //         return null;
        //     } else {
        //         $scope.enableGorad = true;
        //         $scope.showGorad = true;
        //         $scope.showRayonGorad = false;
        //         // $scope.provider.gorad = $scope.goradOptions[0];
        //         if ($scope.provider.gorad === undefined || $scope.provider.gorad === null) {
        //             $scope.provider.gorad = $scope.goradOptions[0];
        //             $scope.goradOptions = $scope.getRayongoradGorads($scope.goradOptions[0]);
        //         } else {
        //             $scope.provider.gorad = $scope.goradOptions[0];
        //             $scope.getRayongoradGorads($scope.provider.gorad);
        //         }
        //     }
        // }).catch(function(err) {
        //     console.log(err);
        // });
    };
    $scope.getRayongoradGorads = function(item) {
        $http.get('/api/places/rayongorads/' + $scope.provider.oblast.slug + '/' + item.slug + '/' + $scope.provider.rayon.slug + '/' + $scope.languageKey).success(function(rayongorads) {
            $scope.rayongoradOptions = rayongorads;
            if (rayongorads[0] === null ||  rayongorads[0] === undefined) {
                $scope.showRayonGorad = false;
                $scope.enableRayonGorad = false;
                $scope.provider.rayongorad = undefined;
                return null;
            } else {
                $scope.enableRayonGorad = true;
                $scope.showRayonGorad = true;
                // $scope.provider.rayongorad = $scope.rayongoradOptions[0];
                if ($scope.provider.rayongorad === undefined || $scope.provider.rayongorad === null) {
                    $scope.provider.rayongorad = $scope.rayongoradOptions[0];
                }
            }
        }).catch(function(err) {
            console.log(err);
        });
    };
    $scope.onTypeSelect = function(item) {
        $scope.provider.searchtext = $filter('translateFilter')(item.subcategory, $scope.languageKey);
        $scope.provider.service = item;
    };
    $scope.deleteFile = function(idx, type) {
        if (type !== 'logo') {
            $scope.provider.files.splice(idx, 1);
        } else {
            $scope.provider.logo = '';
        }
        $http.put('/api/providers/' + $scope.provider._id, $scope.provider).success(function(provider) {
            $scope.provider = provider;
        });
    };
    $scope.deleteDoc = function(idx) {
        $scope.provider.documents.splice(idx, 1);
        $http.put('/api/providers/' + $scope.provider._id, $scope.provider).success(function(provider) {
            $scope.provider = provider;
        });
    };
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
    $scope.onFileSelect = function($files, type) {
        $scope.upload = [];
        uploadFiles($files, type);
    };
    $scope.onDocFileSelect = function($files) {
        $scope.upload = [];
        $scope.selectedfile = $files;
    };

    function uploadFiles(files, type) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            file.progress = parseInt(0);
            (function(file, i) {
                $http.get('/api/aws/getS3Policy?mimeType=' + file.type).success(function(response) {
                    var s3Params = response;
                    $scope.upload[i] = Upload.upload({
                        url: 'https://poslugaua.s3.amazonaws.com/',
                        method: 'POST',
                        headers: {
                            'Authorization': undefined
                        },
                        transformRequest: function(data, headersGetter) { //Headers change here
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
                            var data = ngXml2json.parser(response.data),
                                parsedData;
                            parsedData = {
                                location: data.postresponse.location,
                                bucket: data.postresponse.bucket,
                                key: data.postresponse.key,
                                etag: data.postresponse.etag
                            };
                            if (type === 'document') {
                                $scope.tmpdocument.docfile = parsedData.location;
                                $scope.tmpdocument.docdate = moment($scope.tmpdocument.docdate, 'MM-DD-YYYY');
                                $scope.provider.documents.push($scope.tmpdocument);
                                $scope.tmpdocument = {};
                                $scope.selectedfile = undefined;
                            } else if (type === 'logo') {
                                $scope.provider.logo = {
                                    location: parsedData.location
                                };
                            } else {
                                $scope.provider.files.push({
                                    location: parsedData.location
                                });
                            }
                        } else { //alert('Upload Failed');
                        }
                    }, null, function(evt) {
                        file.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
                });
            }(file, i));
        }
    }
    $scope.updateProvider = function(statego) {
        $scope.laddaLoading = true;
        if ($state.current.name === 'profile') {
            if ($scope.showRayonGorad === false) {
                $scope.provider.rayongorad = null;
            }
            if ($scope.showGorad === false) {
                $scope.provider.gorad = null;
            }
        }
        $http.put('/api/providers/' + $scope.provider._id, $scope.provider).success(function(provider) {
            $scope.provider = provider;
            $scope.laddaLoading = false;
            if ($stateParams.type === 'editfromproviders') {
                $state.go('providers');
            }
            if ($stateParams.type === 'editfromquotes') {
                $state.go('myquotes');
            }
            if ($stateParams.type === 'editfromadminrequests') {
                $state.go('adminrequest', {
                    requestid: $stateParams.requestid
                });
            }
            if ($stateParams.type === 'editfromadminproviders') {
                $state.go('providerlist', {
                    type: 'updateprovider'
                });
            }
            if ($stateParams.type === 'addlinkfromquotes') {
                $scope.providerupdated = true;
                $state.go('myquotes');
            }
            if ($stateParams.type === 'addlinkfromproviders') {
                $state.go('providers');
            }
        });
    };
    $scope.addDocument = function() {
        uploadFiles($scope.selectedfile, 'document');
    };
    $scope.addProvider = function() {
        $scope.laddaLoading = true;
        if ($state.current.name === 'profile') {
            if ($scope.showRayonGorad === false) {
                $scope.provider.rayongorad = null;
            }
            if ($scope.showGorad === false) {
                $scope.provider.gorad = null;
            }
        }
        if ($scope.provider.service === null) {
            $scope.provider.service = undefined;
        }
        if ($scope.provider.logo === undefined) {
            $scope.provider.logo = {
                'location': 'https://s3.eu-central-1.amazonaws.com/servicebox/static/1461620795_user.png'
            }
        }
        if ($stateParams.type !== 'editfromadminproviders') {
            $scope.provider.user = $scope.currentUser._id;
        }
        setNewProviderStats();
        $http.post('/api/services/search/' + $scope.provider.searchtext + '/' + $scope.languageKey).success(function(results) {
            if (results.hits.total === 0) {
                $scope.laddaLoading = false;
                alert(gettextCatalog.getString('Cannot find the service you have written. Please select a service by typing or from the list.'));
            } else {
                $http.get('/api/providers/checkservice/' + $scope.provider.searchtext + '/' + $scope.currentUser._id + '/' + $scope.provider.oblast.slug).success(function(pvd) {
                    if (pvd) {
                        $scope.laddaLoading = false;
                        alert(gettextCatalog.getString('You already provide this service. You can only create it again if you provide it in another oblast.'));
                    } else {
                        $http.post('/api/providers', $scope.provider).success(function(provider) {
                            $scope.provider = provider;
                            $scope.laddaLoading = false;
                            if ($stateParams.type === 'editfromadminproviders' && $scope.createsimilarprovider === true) {
                                $state.go('providerlist', {
                                    type: 'updateprovider'
                                });
                            } else {
                                $state.go('addlink', {
                                    providerid: $scope.provider._id,
                                    type: 'new'
                                });
                                $rootScope.$broadcast('msgid', true);
                            }
                        });
                    }
                });
            }
        })
    }

    function setNewProviderStats() {
        $scope.provider.stats.securitychecks = [];
        $scope.provider.stats.securitychecks.push({
            'objectid': 1
        }, {
            'objectid': 2
        });
        if ($scope.currentUser.provider === 'facebook') {
            $scope.provider.stats.securitychecks.push({
                'objectid': 4,
                'value': $scope.currentUser.facebook.friends
            });
        } else if ($scope.currentUser.provider === 'vkontakte') {
            $scope.provider.stats.securitychecks.push({
                'objectid': 5,
                'value': $scope.currentUser.vkontakte.counters.friends
            });
        }
        var score = {
            files: 10,
            documents: 10,
            links: 15,
            established: 5,
            securitycheck: 5,
            recommended: 10
        }
        var startscore = 100;
        var issues = [];
        if ($scope.provider.files.length === 0) {
            startscore -= score.files;
            issues.push({
                objectid: 1,
                name: "Add Profile Images",
                element: "files"
            });
        }
        if ($scope.provider.links.length === 0) {
            startscore -= score.links;
            issues.push({
                objectid: 2,
                name: "Add Profile Link to Your Website",
                element: "links"
            });
        }
        if ($scope.provider.documents.length === 0) {
            startscore -= score.documents
            issues.push({
                objectid: 3,
                name: "Add Official Documents",
                element: "documents"
            });
        }
        if ($scope.provider.established === null ||  $scope.provider.established === undefined) {
            startscore -= score.established
            issues.push({
                objectid: 4,
                name: "Add Established Date",
                element: "established"
            });
        }
        $scope.provider.stats.profile.completeness = startscore;
        $scope.provider.stats.profile.issues = issues;
        var totalScore = 0
        totalScore += ($scope.provider.stats.securitychecks.length * score.securitycheck);
        totalScore += ($scope.provider.stats.recommended === true ? score.recommended : 0);
        totalScore += $scope.provider.stats.profile.completeness;
        $scope.provider.stats.totalscore = totalScore;
    }

    function businessPlaceholder(provider) {
        var company = '';
        if (provider.businesstype.objectid === 1) {
            company = provider.firstname + provider.lastname;
        } else {
            company = provider.company
        }
        return 'http://www.' + $speakingurl.getSlug(company) + '.ua/uslugi';
    }
    $scope.deleteProvider = function(providerId, index) {
        $http.delete('/api/providers/' + providerId);
        $scope.providers.splice(index, 1);
    };
    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('provider');
    });
    $scope.$on('$save', function() {
        socket.syncUpdates('provider', $scope.homerooms);
    });
    // jQuery.datetimepicker.parseDate = function(format, value) {
    //     return moment(value, format).toDate();
    // };
    // jQuery.datetimepicker.formatDate = function(format, value) {
    //     return moment(value).format(format);
    // };
    // jQuery('#datetimepicker').datetimepicker({
    //     timepicker: false,
    //     format: 'd-M-Y',
    //     maxDate: (moment(moment()).add(1, 'hours').format('YYYY/MM/DD'))
    // });
});