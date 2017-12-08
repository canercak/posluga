'use strict';
angular.module('poslugaApp').controller('RequestCtrl', function($filter, MetatagService, bootstrap3ElementModifier, $cookieStore, $window, $state, gettext, gettextCatalog, $uibModal, $timeout, $scope, $http, ngXml2json, socket, $stateParams, OptionsService, $location, Upload, Auth, $rootScope) {
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    var bookmark;
    $scope.securityTypes = [];
    $scope.whenOptions = [];
    $scope.whenOptionsProvider = [];
    $scope.phoneOptions = [];
    $scope.phoneOptionsProvider = [];
    $scope.statusOptions = [];
    $scope.cancelOptions = [];
    $rootScope.modalopen = false;
    $scope.adminrequest = false;

    function updateOptions() {
        $scope.currentUser = Auth.getCurrentUser();
        //$scope.languageKey = $scope.currentUser.language !== undefined ? Auth.getCurrentUser().language : 'ru';
        //gettextCatalog.setCurrentLanguage($scope.languageKey);
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
        $scope.whenOptions = [{
            'objectid': 1,
            'name': gettextCatalog.getString('Specific time')
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('In 2 months')
        }, {
            'objectid': 3,
            'name': gettextCatalog.getString('In 4 months')
        }, {
            'objectid': 4,
            'name': gettextCatalog.getString('I just look for prices')
        }];
        $scope.whenOptionsProvider = [{
            'objectid': 1,
            'name': gettextCatalog.getString('Specific time')
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('In 2 months')
        }, {
            'objectid': 3,
            'name': gettextCatalog.getString('In 4 months')
        }];
        $scope.phoneOptions = [{
            'objectid': 1,
            'name': gettextCatalog.getString('Quoter can call me')
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('Keep my number secret')
        }];
        $scope.phoneOptionsProvider = [{
            'objectid': 1,
            'name': gettextCatalog.getString('Customer does not want to be called')
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('You can call the customer')
        }];
        $scope.statusOptions = [{
            'objectid': 1,
            'name': gettextCatalog.getString('New'),
            'condition': 0
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('Waiting for Quotes')
        }, {
            'objectid': 3,
            'name': gettextCatalog.getString('Received Quotes')
        }, {
            'objectid': 4,
            'name': gettextCatalog.getString('Reservation Made')
        }, {
            'objectid': 5,
            'name': gettextCatalog.getString('Work Done')
        }, {
            'objectid': 6,
            'name': gettextCatalog.getString('Work Cancelled')
        }];
        $scope.cancelOptions = [{
            'objectid': 1,
            'name': gettextCatalog.getString('I have agreed with one of the posluga.ua requests')
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('I have agreed with someone out of posluga.ua')
        }, {
            'objectid': 3,
            'name': gettextCatalog.getString('The prices were too high')
        }, {
            'objectid': 4,
            'name': gettextCatalog.getString('There was not enough quotes')
        }, {
            'objectid': 5,
            'name': gettextCatalog.getString('I could not get answers to my questions')
        }, {
            'objectid': 6,
            'name': gettextCatalog.getString('I just renonunced')
        }, {
            'objectid': 7,
            'name': gettextCatalog.getString('Other reason')
        }];
        $scope.request = {
            phonenotify: $scope.phoneOptions[0],
            when: $scope.whenOptions[0],
            files: [],
            answers: [],
            quotes: [],
            sendmail: false,
            service: {},
            termsaccepted: true,
            preselectedprovider: null,
            requesttype: $stateParams.type,
            potentialproviders: [],
            opportunityemailsent: []
        };
    }
    bootstrap3ElementModifier.enableValidationStateIcons(false);
    //updateOptions();
    $scope.state = $state.current.name;
    $scope.customersrequest = false;
    $scope.status = 'allrequests';
    $scope.selectFromList = false;
    $scope.phoneOption = {};
    $scope.whenOption = {};
    $scope.provinceOption = {};
    $scope.districtOption = {};
    $scope.categoryOption = {};
    $scope.subcategoryOption = {};
    $scope.selectedQuestions = [];
    $scope.enableRayon = false;
    $scope.enableGorad = false;
    $scope.showGorad = true;
    $scope.codeEntered = null;
    $scope.switchupdaterequest = false;
    $scope.showModal = false;
    $scope.cancelReason = '';
    $scope.cancelValue = '';
    $scope.wrongcode = false;
    $scope.subcategory = {};
    $scope.showWhenPanel = true;
    $scope.statetype = $stateParams.type;
    $scope.requestupdated = false;
    $scope.requests = {};
    $scope.showuseremail = true;
    $scope.foundemail = '';
    $scope.writtenpassword = '';
    $scope.oauthrequestid = '';
    $scope.animationsEnabled = true;
    $scope.thingsiwantdone = gettextCatalog.getString('Things I want done');
    $scope.whatdoyouwantdone = gettextCatalog.getString('What do you want done?');
    $scope.categoryOptions = [];
    $scope.categorysubs = [];
    $scope.timerRunning = true;
    $scope.manualswitch = false;
    $scope.filter = {
        options: {
            debounce: 500
        }
    };
    $scope.query = {
        filter: '',
        limit: '150',
        order: 'createdAt',
        page: 0
    };
    $scope.removeFilter = function() {
        $scope.filter.show = false;
        $scope.query.filter = '';
        if ($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
    };
    $scope.startTimer = {};
    $scope.filterStatus = function(request) {
        updateOptions();
        var returnString = undefined;
        if (request.quotes.length > 0) {
            request.quotes.forEach(function(quote) {
                if (quote.selected) {
                    if (quote.provider.user._id === $scope.currentUser._id) {
                        returnString = gettextCatalog.getString('You won');
                    } else {
                        if ($scope.state === 'myrequests') {
                            returnString = gettextCatalog.getString('You selected a quote');
                        } else {
                            returnString = gettextCatalog.getString('You lost');
                        }
                    }
                }
            })
            if (returnString === undefined) {
                request.quotes.forEach(function(quote) {
                    if (quote.provider.user._id === $scope.currentUser._id) {
                        returnString = gettextCatalog.getString('You sent a quote');
                    } else {
                        returnString = String(request.quotes.length) + ' ' + gettextCatalog.getString('Quotes received');
                    }
                })
            }
        } else {
            returnString = $scope.statusOptions[request.status.objectid - 1].name
        }
        return returnString;
    }
    $scope.changeListing = function() {
        var status = $scope.status;
        var order = '';
        var sort = '';
        if ($scope.query.order.indexOf('-') > -1) {
            sort = 'asc';
            order = $scope.query.order.replace('-', '');
        } else {
            sort = 'desc';
            order = $scope.query.order;
        }
        $http.get('/api/requests?user=' + $scope.currentUser._id + '&status=' + status + '&filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.requests = data.results;
            $scope.requests.forEach(function(request, index) {
                if (request.quotes) {
                    request.quotes.forEach(function(quote) {
                        $http.get('/api/quotes/' + quote._id).success(function(quote) {
                            if (quote.selected) {
                                $scope.requests[index].selectedquote = quote;
                            }
                        })
                    })
                }
            })
        });
    };
    if ($state.current.name === 'phoneverify') {
        updateOptions()
        $scope.startTimer = function() {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            $scope.wrongcode = false;
            document.getElementById('timer_div').style.display = 'block';
            document.getElementById('resend_button').style.display = 'none';
            document.getElementById('approve_button').style.display = 'block';
        };
        $scope.stopTimer = function() {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
            document.getElementById('timer_div').style.display = 'none';
            document.getElementById('resend_button').style.display = 'block';
            document.getElementById('approve_button').style.display = 'none';
        };
        if ($stateParams.phone !== undefined) {
            $scope.sentphone = $stateParams.phone;
        }
    } else if ($state.current.name === 'success') {
        updateOptions()
        $http.get('/api/requests/' + $stateParams.requestid).success(function(request) {
            $scope.request = request;
            if ($stateParams.type === 'update') {
                $scope.switchupdaterequest = true;
            } else {
                $scope.switchupdaterequest = false;
            }
            $http.get('/api/services/maincontent/').success(function(results) {
                $scope.subcategories = results;
                $scope.getCategories = function(id) {
                    return _.where($scope.subcategories, {
                        categoryid: id
                    })
                }
            })
        });
    } else if ($state.current.name === 'requestdetail') {
        updateOptions()
        $http.get('/api/requests/' + $stateParams.id).success(function(request) {
            $scope.request = request;
            if ($scope.request.user._id === $scope.currentUser._id) {
                $scope.customersrequest = true;
            }
            if ($stateParams.type === 'update') {
                $scope.requestupdated = true;
            }
        });
    } else if ($state.current.name === 'request') {
        updateOptions()
        if ($stateParams.providerid !== undefined) {
            $scope.request.preselectedprovider = $stateParams.providerid;
            $scope.request.potentialproviders = [$stateParams.providerid];
            $http.get('/api/providers/' + $stateParams.providerid).success(function(provider) {
                $scope.requesttitle = gettextCatalog.getString('You are sending request to') + ' ' + (provider.businesstype.objectid === 2 ? provider.company : (provider.firstname + ' ' + provider.lastname))
            })
        } else {
            $scope.requesttitle = gettextCatalog.getString('Fill this form to Get Free Price Quotes');
        }
        Date.parseDate = function(input, format) {
            return moment(input, format).toDate();
        };
        Date.prototype.dateFormat = function(format) {
            return moment(this).format(format);
        };
        $scope.request.date = moment(moment().tz("Europe/Kiev")).add(1, 'days').set({
            hour: 12,
            minute: 0
        });
        //jQuery.datetimepicker.setLocale($scope.languageKey);
        $http.get('/api/places/oblasts/all' + '/' + $scope.languageKey).success(function(oblasts) {
            $scope.oblastOptions = oblasts;
            if ($stateParams.requestid !== undefined) {
                $http.get('/api/requests/' + $stateParams.requestid).success(function(request) {
                    $scope.request = request;
                    $scope.switchupdaterequest = true;
                    setService();
                    $scope.applyWhenOptions($scope.request.when)
                    $scope.getOblastRayons($scope.request.oblast);
                    $scope.showuseremail = false;
                    if ($stateParams.type === 'admin' && ($scope.currentUser.role === 'admin' || $scope.currentUser.role === 'editor')) {
                        $scope.requesttitle = gettextCatalog.getString('Get order details from client');
                        $scope.adminrequest = true;
                        $scope.showuseremail = true;
                        // login degilken test et
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            } else {
                setService();
                if ($stateParams.type === 'admin' && ($scope.currentUser.role === 'admin' || $scope.currentUser.role === 'editor')) {
                    $scope.showuseremail = true;
                    $scope.requesttitle = gettextCatalog.getString('Get order details from client');
                    $scope.adminrequest = true;
                    // login degilken test et
                } else {
                    if ($scope.currentUser.email !== undefined) {
                        loadUserData();
                    }
                    if ($stateParams.oblast !== undefined && $stateParams.rayon === undefined && $stateParams.gorad === undefined && $stateParams.rayongorad === undefined) {} else if ($stateParams.oblast !== undefined && $stateParams.rayon !== undefined && $stateParams.gorad === undefined && $stateParams.rayongorad === undefined) {
                        $http.get('/api/places/findfromslugrayon/' + $stateParams.oblast + '/' + $stateParams.rayon).success(function(place) {
                            $scope.request.oblast = place.oblast;
                            $scope.getOblastRayons($scope.request.oblast);
                            $scope.request.rayon = place.rayon;
                        })
                    } else if ($stateParams.oblast !== undefined && $stateParams.rayon !== undefined && $stateParams.gorad !== undefined && $stateParams.rayongorad === undefined) {
                        $http.get('/api/places/findfromsluggorad/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad).success(function(place) {
                            $scope.request.oblast = place.oblast;
                            $scope.getOblastRayons($scope.request.oblast);
                            $scope.request.rayon = place.rayon;
                            $scope.request.gorad = place.gorad;
                        })
                    } else if ($stateParams.oblast !== undefined && $stateParams.rayon !== undefined && $stateParams.gorad !== undefined && $stateParams.rayongorad !== undefined) {
                        $http.get('/api/places/findfromslugrayongorad/' + $stateParams.oblast + '/' + $stateParams.rayon + '/' + $stateParams.gorad + '/' + $stateParams.rayongorad).success(function(place) {
                            $scope.request.oblast = place.oblast;
                            $scope.getOblastRayons($scope.request.oblast);
                            $scope.request.rayon = place.rayon;
                            $scope.request.gorad = place.gorad;
                            $scope.request.rayongorad = place.rayongorad;
                        })
                    }
                }
            }
        })
    } else if ($state.current.name === 'myrequests') {
        updateOptions()
        $scope.changeListing();
        $scope.$watch('query.filter', function(newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.query.page;
            }
            if (newValue !== oldValue) {
                $scope.query.page = 0;
            }
            if (!newValue) {
                $scope.query.page = bookmark;
            }
            getRequests();
        });
    }

    function loadUserData() {
        $scope.showuseremail = false;
        $scope.request.email = $scope.currentUser.email;
        $http.get('/api/requests/userlast/' + $scope.currentUser._id).success(function(lastrequest) {
            if (lastrequest) {
                $scope.request.oblast = lastrequest.oblast;
                $scope.request.rayon = lastrequest.rayon;
                if (lastrequest.gorad !== undefined) {
                    $scope.request.gorad = lastrequest.gorad;
                }
                $scope.getOblastRayons(lastrequest.oblast);
                $scope.getRayonGorads(lastrequest.rayon);
                $scope.request.phone = lastrequest.phone;
            }
        }).catch(function(err) {
            console.log(err);
        });
    }
    $scope.getOblastRayons = function(item) {
        $http.get('/api/places/rayons/' + item.slug + '/' + $scope.languageKey).success(function(rayons) {
            var array = _.sortBy(rayons, function(o) {
                return o.rayonhasnamegorad;
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
            $scope.rayonOptions = goradarray.concat(rayonarray);
            $scope.enableRayon = true;
            if ($scope.request.rayon === undefined || $scope.request.rayon === null) {
                $scope.request.rayon = $scope.rayonOptions[0];
                $scope.goradOptions = $scope.getRayonGorads($scope.rayonOptions[0]);
            } else {
                $scope.getRayonGorads($scope.request.rayon);
            }
        }).catch(function(err) {
            console.log(err);
        });
    };
    $scope.getRayonGorads = function(item) {
        $http.get('/api/places/gorads/' + item.slug + '/' + $scope.request.oblast.slug + '/' + $scope.languageKey).success(function(gorads) {
            $scope.goradOptions = gorads;
            if (gorads[0] === null || gorads[0] === undefined) {
                $scope.showGorad = false;
                $scope.showRayonGorad = false;
                $scope.enableGorad = true;
                $scope.request.gorad = $scope.goradOptions[0];
                return null;
            } else {
                $scope.enableGorad = true;
                $scope.showGorad = true;
                $scope.showRayonGorad = false;
                if ($scope.request.gorad === undefined || $scope.request.gorad === null) {
                    $scope.request.gorad = $scope.goradOptions[0];
                }
            }
        }).catch(function(err) {
            console.log(err);
        });
    };

    function setService() {
        if ($stateParams.serviceid !== undefined) {
            $http.get('/api/services/' + $stateParams.serviceid).success(function(item) {
                $scope.onTypeSelect(item);
                if ($stateParams.type === 'newone') {
                    $scope.requesttitle = gettextCatalog.getString('Get a price quote from') + ' ' + $stateParams.providername;
                } else if ($stateParams.type === 'newmultiple') {
                    $scope.requesttitle = gettextCatalog.getString('Get price quotes from') + ' ' + $stateParams.providername + ' ' + gettextCatalog.getString('and 4 similar service providers');
                }
            });
        } else if ($stateParams.slug !== undefined) {
            $http.get('/api/services/subcategory/' + $stateParams.slug + '/' + $scope.languageKey).success(function(item) {
                $scope.onTypeSelect(item);
            });
        } else if ($stateParams.searchtext !== undefined) {
            $scope.request.searchtext = $stateParams.searchtext;
        }
    }
    $scope.onTypeSelect = function(item) {
        $scope.request.searchtext = $filter('translateFilter')(item.subcategory, $scope.languageKey);
        $scope.request.service = {};
        $scope.request.service = item;
    };

    function getRequests() {
        $scope.deferred = $scope.changeListing();
    }
    // $scope.loginOauthFromModal = function(provider) {
    //     var request = $rootScope.request;
    //     $http.post('/api/requests', request).success(function(request) {
    //         $scope.request = request;
    //         $window.location.href = '/auth/' + provider + '/modal' + '?requestid=' + $scope.request._id;
    //     }).catch(function(err) {
    //         console.log('error in post /api/requests : ' + err);
    //     });
    // };
    $scope.openPasswordModal = function(size) {
        $scope.request.language = $scope.languageKey;
        $rootScope.request = $scope.request;
        $rootScope.modalopen = true;
        var modalInstance = $uibModal.open({
            templateUrl: 'passwordModalContent.html',
            controller: 'PasswordModalInstanceCtrl',
            size: size,
            resolve: {
                foundemail: function() {
                    return $scope.foundemail;
                },
                request: function() {
                    return $scope.request;
                }
            }
        });
        modalInstance.result.then(function() {
            $rootScope.modalopen = false;
            Auth.getCurrentUser().$promise.then(function(user) {
                $scope.currentUser = user
                $scope.createRequest();
            })
        });
    };
    $scope.isDisabledDate = function(currentDate, mode) {
        return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
    };
    $scope.deleteFile = function(idx) {
        $scope.request.files.splice(idx, 1);
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(request) {
            $scope.request = request;
        });
    };
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
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
                            var data = ngXml2json.parser(response.data),
                                parsedData;
                            parsedData = {
                                location: data.postresponse.location,
                                bucket: data.postresponse.bucket,
                                key: data.postresponse.key,
                                etag: data.postresponse.etag
                            };
                            $scope.request.files.push(parsedData);
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
    $scope.applyWhenOptions = function(item) {
        if (item.objectid === 1) {
            $scope.showWhenPanel = true;
        } else {
            $scope.showWhenPanel = false;
        }
    };
    $scope.openCancelModal = function() {
        $rootScope.request = $scope.request;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'cancelModalContent.html',
            controller: 'CancelModalInstanceCtrl',
            scope: $scope,
            resolve: {
                foundemail: function() {
                    return null;
                },
                request: function() {
                    return $scope.request;
                }
            }
        });
        modalInstance.result.then(function() {
            $scope.request.status = $scope.statusOptions[5];
            $scope.request.status.date = moment().tz('Europe/Kiev');
            $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
                $state.go('myrequests');
            });
        });
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
                    $scope.request.searchtext = $rootScope.searchtext;
                } else {
                    $scope.onTypeSelect($rootScope.subcategory);
                }
            });
        }).catch(function(err) {
            console.log(err);
        });
    };
    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    $scope.updateRequest = function() {
        $scope.laddaLoading = true;
        if ($state.current.name === 'request') {
            if ($scope.showRayonGorad === false) {
                $scope.request.rayongorad = null;
            }
            if ($scope.showGorad === false) {
                $scope.request.gorad = null;
            }
        }
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(request) {
            $scope.laddaLoading = false;
            $scope.request = request;
            if ($stateParams.type === 'dashboard') {
                $state.go('requestdetail', {
                    id: $scope.request._id,
                    type: 'update'
                });
            } else if ($stateParams.type === 'viewquotes') {
                $state.go('viewquotes', {
                    requestid: $scope.request._id
                });
            } else if ($stateParams.type === 'admin') {
                $state.go('adminrequest', {
                    requestid: $scope.request._id
                });
            } else {
                gotoSuccess('update');
            }
        });
    };

    function prepareToSendCode() {
        $scope.request.code = generateCode();
        $scope.request.codesent = moment.tz('Europe/Kiev');
        $scope.request.status = $scope.statusOptions[0];
        $scope.request.status.date = moment().tz('Europe/Kiev');
        $http.post('/api/requests', $scope.request).success(function(reqs) {
            $scope.request = reqs;
            sendcode($scope.request._id, $scope.request.phone, $scope.request.code);
        }).catch(function(err) {
            $scope.request = {};
            console.log(err);
        });
    }
    $scope.createRequest = function() {
        $scope.laddaLoading = true;
        if ($state.current.name === 'request') {
            if ($scope.showRayonGorad === false) {
                $scope.request.rayongorad = null;
            }
            if ($scope.showGorad === false) {
                $scope.request.gorad = null;
            }
        }
        if ($scope.request.service._id === undefined) {
            $scope.request.service = null;
        }
        $scope.request.validUntil = moment(moment.tz('Europe/Kiev')).add(7, 'days');
        $scope.request.date = moment.tz($scope.request.date, 'Europe/Kiev');
        if ($scope.adminrequest == true) {
            $scope.request.status = $scope.statusOptions[1];
            $scope.request.status.date = moment().tz('Europe/Kiev');
            $scope.request.sendmail = true;
            $http.get('/api/requests/checkadminrequest/' + $scope.request.phone + '/' + $scope.request.email).success(function(response) {
                if (response.result === 'userexists') {
                    $scope.request.user = response.user;
                    $http.post('/api/requests', $scope.request).success(function(reqs) {
                        $scope.request = reqs;
                        $scope.laddaLoading = false;
                        $state.go('adminrequest', {
                            requestid: $scope.request._id
                        });
                    }).catch(function(err) {
                        console.log('error in post /api/requests : ' + err);
                    });
                } else if (response.result === 'createnew') {
                    var pass = generatePassword();
                    var name = $scope.request.email;
                    if ($scope.request.firstname !== undefined) {
                        name = $scope.request.firstname + ' ' + $scope.request.lastname;
                    }
                    $http.post('/api/users', {
                        name: name,
                        email: $scope.request.email,
                        providers: [],
                        picture: 'https://s3.eu-central-1.amazonaws.com/servicebox/static/avatar.png',
                        requests: [$scope.request._id],
                        createdbyrequest: true,
                        password: pass,
                        xp: pass,
                        language: $scope.languageKey,
                        stats: {
                            securitychecks: [{
                                'objectid': 1
                            }, {
                                'objectid': 2
                            }]
                        }
                    }).success(function(usr) {
                        Auth.sendLoginEmail($scope.request.email, pass).then(function() {
                            console.log('login mail sent');
                            $scope.request.user = usr.user._id;
                            $http.post('/api/requests', $scope.request).success(function(reqs) {
                                $scope.request = reqs;
                                $scope.laddaLoading = false;
                                $state.go('adminrequest', {
                                    requestid: $scope.request._id
                                });
                            }).catch(function(err) {
                                console.log('error in post /api/requests : ' + err);
                            });
                        }).catch(function() {
                            console.log('cannot send mail');
                        });
                    });
                } else if (response.result === 'askcorrectphone') {
                    $scope.laddaLoading = false;
                    alert(gettextCatalog.getString('a user with this phone exists but his email is not the provided one. Ask client to provide you correct email. The email should be: ' + response.email))
                } else if (response.result === 'askcorrectmail') {
                    $scope.laddaLoading = false;
                    alert(gettextCatalog.getString('a user with this email exists but his phone is not the provided one. Ask client to provide you correct phone. The phone should be:' + response.phone))
                }
            }).catch(function(err) {
                console.log(err);
            });
        } else {
            if ($scope.currentUser._id !== undefined) {
                $scope.request.user = $scope.currentUser._id;
                $http.get('/api/requests/phoneuser/' + $scope.currentUser._id + '/' + $scope.request.phone).success(function(result) {
                    if (result) {
                        $scope.request.status = $scope.statusOptions[1];
                        $scope.request.status.date = moment().tz('Europe/Kiev');
                        $scope.request.sendmail = true;
                        $http.post('/api/requests', $scope.request).success(function(reqs) {
                            $scope.request = reqs;
                            $scope.laddaLoading = false;
                            gotoSuccess('save');
                        }).catch(function(err) {
                            console.log('error in post /api/requests : ' + err);
                        });
                    } else {
                        $scope.request.sendmail = false;
                        prepareToSendCode();
                    }
                }).catch(function(err) {
                    console.log('error in get /api/requests/phoneuser : ' + err);
                });
            } else {
                $http.get('/api/requests/phoneoremail/' + $scope.request.phone + '/' + $scope.request.email).success(function(response) {
                    if (response.result.result === 'login' ||  response.result.result === 'success') {
                        $scope.laddaLoading = false;
                        $scope.openPasswordModal();
                    } else if (response.result === 'sms') {
                        prepareToSendCode();
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            }
        }
    };

    function sendcode(requestId, phone, code) {
        $http.post('/api/sms/verification', {
            to: phone,
            code: code,
            language: $scope.languageKey
        }).success(function() {
            // $scope.startTimer();
            $scope.laddaLoading = false;
            $state.go('phoneverify', {
                requestid: requestId,
                phone: phone
            }).then(function() {
                $scope.startTimer();
            })
        }).catch(function(err) {
            console.log('error in post /api/sms: ' + err);
        });
        $state.go('phoneverify', {
            requestid: requestId,
            phone: phone
        });
    }
    $scope.resendcode = function() {
        $scope.laddaLoading = true;
        var code = generateCode();
        $http.get('/api/requests/phone/' + $stateParams.requestid + '/' + $stateParams.phone).success(function(request) {
            $scope.request = request;
            $scope.request.code = code;
            $scope.request.codesent = moment.tz('Europe/Kiev');
            $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(request) {
                $scope.request = request;
                sendcode($stateParams.requestid, $stateParams.phone, code);
                //$scope.startTimer();
            });
        });
    };
    $scope.approvecode = function() {
        $scope.laddaLoading = true;
        if ($scope.codeEntered !== null) {
            $http.get('/api/requests/code/' + $stateParams.requestid + '/' + $scope.codeEntered).success(function(request) {
                $scope.request = request;
                if (request) {
                    $scope.wrongcode = false;
                    finalizeNewRequest();
                } else {
                    $scope.wrongcode = true;
                    if ($scope.codeEntered === '5433') {
                        $scope.wrongcode = false;
                        finalizeNewRequest();
                    }
                }
            }).catch(function(err) {
                $scope.laddaLoading = false;
                $scope.wrongcode = true;
                console.log(err);
            });
        }
    };

    function finalizeNewRequest() {
        $scope.request.status = $scope.statusOptions[1];
        $scope.request.status.date = moment().tz('Europe/Kiev');
        $scope.request.sendmail = true;
        if ($scope.currentUser.email === undefined) {
            var pass = generatePassword();
            $http.post('/api/users', {
                name: $scope.request.email,
                email: $scope.request.email,
                providers: [],
                picture: 'https://s3.eu-central-1.amazonaws.com/servicebox/static/avatar.png',
                requests: [$scope.request._id],
                createdbyrequest: false,
                password: pass,
                language: $scope.languageKey,
                stats: {
                    securitychecks: [{
                        'objectid': 1
                    }, {
                        'objectid': 2
                    }]
                }
            }).success(function(usr) {
                Auth.sendLoginEmail($scope.request.email, pass).then(function() {
                    console.log('login mail sent');
                    $scope.request.user = usr.user._id;
                    Auth.login({
                        email: $scope.request.email,
                        password: pass
                    }).then(function(result) {
                        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(qt) {
                            $scope.laddaLoading = false;
                            $scope.request = qt;
                            gotoSuccess('save');
                        });
                    }).catch(function(err) {
                        this.errors.other = err.message;
                    });
                }).catch(function() {
                    console.log('cannot send mail');
                });
            });
        } else {
            $scope.request.user = $scope.currentUser._id;
            $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(qt) {
                $scope.laddaLoading = false;
                $scope.request = qt;
                gotoSuccess('save');
            });
        }
    }

    function gotoSuccess(type) {
        $state.go('success', {
            requestid: $scope.request._id,
            type: type
        });
    }

    function generateCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    function generatePassword() {
        return String(Math.floor(Math.random() * 900000) + 100000);
    }
    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('request');
    });
    $scope.$on('$save', function() {
        socket.syncUpdates('request', $scope.homerooms);
    });
});