'use strict';
angular.module('poslugaApp').controller('AdminController', function($parse, MetatagService, $location, Auth, urlParser, string, toastr, gettext, bootstrap3ElementModifier, gettextCatalog, $state, $scope, $http, OptionsService, $filter, $stateParams, $speakingurl) {
    var bookmark;
    $scope.currentUser = Auth.getCurrentUser();
    MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
    $scope.saveservice = false;
    $scope.createsimilarservice = false;
    $scope.foundpreproviders = [];
    $scope.foundpreprovidersemail = [];
    $scope.locksave = false;
    $scope.foundpreprovidersphone = [];
    $scope.showServiceGroups = false;
    $scope.selectedservicegroups = [];
    $scope.servicegroups = [];
    $scope.useImagesFromFirstService = false;
    $scope.useremailexists = false;
    $scope.sentquoteid = undefined;
    $scope.filter = {
        options: {
            debounce: 10
        }
    };
    $scope.status = 'newpreproviders';
    $scope.query = {
        filter: '',
        limit: '10',
        order: 'updatedAt',
        page: 0
    };
    $scope.enableRayon = false;
    $scope.enableGorad = false;
    $scope.enableRayonGorad = false;
    $scope.showGorad = false;
    $scope.showRayonGorad = false;
    $scope.totalItems = 250;
    $scope.currentPage = 1;
    $scope.maxSize = 25;
    $scope.deletepreprovider = false;
    $scope.approvedpreprovider = false;
    $scope.updaterequest = false;
    $scope.deleterequest = false;
    $scope.saverequest = false;
    $scope.updateuser = false;
    $scope.updateprovider = false;
    $scope.updateaddfunds = false;
    $scope.saveaddfunds = false;
    $scope.request = {};
    $scope.checkquotesent = function(providerid) {
        var result = false;
        $scope.request.quotes.forEach(function(quote) {
            if (quote.provider._id === providerid) {
                result = true
            }
        })
        return result;
    }
    $scope.setPage = function(pageNo) {
        $scope.query.page = $scope.currentPage - 1;
    };
    $scope.pageChanged = function() {
        $scope.query.page = $scope.currentPage - 1;
        getPreproviders();
    };
    $scope.pageChangedRequest = function() {
        $scope.query.page = $scope.currentPage - 1;
        getRequests();
    };
    $scope.pageChangedProvider = function() {
        $scope.query.page = $scope.currentPage - 1;
        getProviders();
    };
    $scope.cancelRequest = function() {
        $scope.request.status = $scope.statusOptions[5];
        $scope.request.status.date = moment().tz('Europe/Kiev');
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
            $state.go('requestlist');
        });
    }
    $scope.selectQuoteAsClient = function(quote) {
        if ($scope.request.address === "" || $scope.request.address === undefined) {
            alert(gettextCatalog.getString('enter address'))
        } else if ($scope.request.firstname === "" || $scope.request.firstname === undefined) {
            alert(gettextCatalog.getString('enter firstname'))
        } else if ($scope.request.lastname === "" || $scope.request.lastname === undefined) {
            alert(gettextCatalog.getString('enter lastname'))
        } else {
            $scope.request.status = $scope.statusOptions[3];
            $scope.request.status.date = moment().tz('Europe/Kiev');
            $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
                quote.selected = true;
                quote.latestevent = "selectquote";
                $http.put('/api/quotes/' + quote._id, quote).success(function() {
                    toastr.success(gettextCatalog.getString('Successfully selected quote as client'));
                    $state.go('adminrequest', {
                        requestid: $scope.request._id
                    }, {
                        reload: true
                    });
                });
            });
        }
    }
    $scope.deselectQuoteAsClient = function(quote) {
        $scope.request.status = $scope.statusOptions[2];
        $scope.request.status.date = moment().tz('Europe/Kiev');
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
            quote.selected = false;
            quote.latestevent = "givequote";
            $http.put('/api/quotes/' + quote._id, quote).success(function() {
                toastr.success(gettextCatalog.getString('Successfully deselected quote as client'));
                $state.go('adminrequest', {
                    requestid: $scope.request._id
                }, {
                    reload: true
                });
            });
        });
    }
    $scope.completeQuoteAsProvider = function(quote) {
        $scope.request.status = $scope.statusOptions[4];
        $scope.request.status.date = moment().tz('Europe/Kiev');
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
            quote.servicecomplete = true;
            quote.latestevent = "providercompletequote";
            $http.put('/api/quotes/' + quote._id, quote).success(function() {
                toastr.success(gettextCatalog.getString('Successfully completed quote as provider'));
                $state.go('adminrequest', {
                    requestid: $scope.request._id
                }, {
                    reload: true
                });
            });
        });
    }
    $scope.markAsPaid = function(quote) {
        $scope.request.providerpaid = true;
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
            toastr.success(gettextCatalog.getString('Successfully marked as paid'));
            $state.go('adminrequest', {
                requestid: $scope.request._id
            }, {
                reload: true
            });
        });
    }
    $scope.addReviewAsClient = function(quote) {
        quote.comment.message = $scope.reviewPopover.message;
        quote.comment.rating = 5;
        quote.latestevent = "userreviewquote";
        $http.put('/api/quotes/' + quote._id, quote).success(function() {
            toastr.success(gettextCatalog.getString('Successfully added review as client'));
            $state.go('adminrequest', {
                requestid: $scope.request._id
            }, {
                reload: true
            });
        });
    }
    $scope.activateRequest = function() {
        $scope.request.status = $scope.statusOptions[2];
        $scope.request.status.date = moment().tz('Europe/Kiev');
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function() {
            $state.go('adminrequest', {
                requestid: $scope.request._id
            }, {
                reload: true
            });
        });
    }
    $scope.pageChangedService = function() {
        $scope.query.page = $scope.currentPage - 1;
        getServices();
    };
    $scope.visibleServiceGroups = function() {
        $scope.showServiceGroups = true;
        $http.get('/api/servicegroups/').success(function(servicegroups) {
            $scope.servicegroups = servicegroups;
        })
    };
    $scope.sendQuoteFromAdmin = function(provideruserid, providerid, requestid) {
        $scope.laddaLoading = true;
        $scope.quote = {
            latestevent: "givequote",
            price: {
                value: $scope.dynamicPopover.price,
                currency: 'грн.'
            },
            when: $scope.dynamicPopover.when,
            date: $scope.dynamicPopover.date,
            commission: {
                percentage: null,
                providerpercentage: null,
                providervalue: null,
                value: null,
                currency: 'грн.'
            },
            chat: [],
            comment: {
                paid: {
                    value: null,
                    currency: 'грн.'
                },
                files: []
            }
        };
        $http.get('/api/providers/' + providerid).success(function(provider) {
            $scope.provider = provider;
            var count = parseInt($scope.dynamicPopover.price);
            if ($scope.provider.hasincominglink) {
                $scope.quote.commission.percentage = 9;
                $scope.quote.commission.providerpercentage = 91;
            } else {
                $scope.quote.commission.percentage = 10;
                $scope.quote.commission.providerpercentage = 90;
            }
            var commission = ((count * $scope.quote.commission.percentage) / 100);
            var priceleft = (count - commission);
            $scope.quote.commission.value = commission;
            $scope.quote.commission.providervalue = priceleft;
            $scope.quote.comment.paid.value = $scope.quote.price.value;
            $scope.quote.provider = providerid;
            $scope.quote.request = requestid;
            $scope.quote.chat.push({
                id: $scope.quote.chat.length + 1,
                message: $scope.dynamicPopover.description,
                sentAt: moment().tz('Europe/Kiev'),
                sendertype: 'provider',
                sender: provideruserid
            })
            $http.post('/api/quotes/', $scope.quote).success(function(quote) {
                $scope.sentquoteid = quote._id;
                for (i = 0; i < document.getElementsByClassName("popover").length; ++i) {
                    document.getElementsByClassName("popover")[i].style.cssText = 'display:none !important';
                }
                $scope.laddaLoading = false;
                toastr.success(gettextCatalog.getString('Successfully sent quote as this provider.'));
                $state.reload();
            }).catch(function(err) {
                console.log('error in post /api/quotes : ' + err);
            });
        })
    };
    $scope.dynamicPopover = {
        // isOpen: false,
        // open: function open() {
        //     $scope.dynamicPopover.isOpen = true;
        // },
        // close: function close() {
        //     $scope.dynamicPopover.isOpen = false;
        // },
        templateUrl: 'myPopoverTemplate.html',
        title: gettextCatalog.getString('Give Price')
    };
    $scope.commentPopover = {
        templateUrl: 'addCommentTemplate.html',
        title: gettextCatalog.getString('Add Comment'),
        message: ""
    };
    $scope.reviewPopover = {
        templateUrl: 'reviewPopoverTemplate.html',
        title: gettextCatalog.getString('Add review as client'),
        message: ""
    };
    $scope.applyServiceGroups = function() {
        var preproviderServices = [];
        $scope.preprovider.services.forEach(function(service) {
            preproviderServices.push(service.name)
        })
        var firstservice = $scope.preprovider.services[0];
        $scope.selectedservicegroups.forEach(function(servicegroup) {
            servicegroup.services.forEach(function(sgservice) {
                if (preproviderServices.indexOf(sgservice.name) > -1) {
                    //console.log("dont do anything'")
                } else {
                    var service = {
                        id: $scope.preprovider.services.length + 1,
                        service: sgservice.service._id,
                        name: sgservice.service.subcategory.ru.text,
                        images: ($scope.useImagesFromFirstService === true ? firstservice.images : [{
                            url: $scope.preprovider.photo
                        }])
                    }
                    $scope.preprovider.services.push(service)
                }
            })
        })
        $scope.showServiceGroups = false;
    }
    $scope.removeFilter = function() {
        $scope.filter.show = false;
        $scope.query.filter = '';
        if ($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
    };
    $scope.changePreproviderListing = function() {
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
        $http.get('/api/preproviders?user=' + $scope.currentUser._id + '&role=' + $scope.currentUser.role + '&status=' + status + '&filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.preproviders = data.results;
            $scope.totalItems = data.total;
        });
    };
    $scope.changeServiceListing = function() {
        var order = '';
        var sort = '';
        if ($scope.query.order.indexOf('-') > -1) {
            sort = 'asc';
            order = $scope.query.order.replace('-', '');
        } else {
            sort = 'desc';
            order = $scope.query.order;
        }
        $http.get('/api/services?filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.services = data.results;
            $scope.totalItems = data.total;
        });
    };
    $scope.compareFn = function(obj1, obj2) {
        return obj1.id === obj2.id;
    };
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
    $scope.businessTypes = [{
        'objectid': 1,
        'name': gettextCatalog.getString('Personal')
    }, {
        'objectid': 2,
        'name': gettextCatalog.getString('Company')
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
    $scope.phoneOptions = [{
        'objectid': 1,
        'name': gettextCatalog.getString('Quoter can call me')
    }, {
        'objectid': 2,
        'name': gettextCatalog.getString('Keep my number secret')
    }];
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
    $scope.phoneOptionsProvider = [{
        'objectid': 1,
        'name': gettextCatalog.getString('Customer does not want to be called')
    }, {
        'objectid': 2,
        'name': gettextCatalog.getString('You can call the customer')
    }];
    $scope.addService = function() {
        $scope.preprovider.services.push({
            id: $scope.preprovider.services.length + 1,
            service: null,
            name: null,
            images: [{
                url: null
            }]
        });
    };
    $scope.addServiceGroupService = function() {
        $scope.servicegroup.services.push({
            id: $scope.servicegroup.services.length + 1,
            service: null,
            name: null
        });
    };
    $scope.addAddress = function() {
        $scope.preprovider.extraaddresses.push({
            id: $scope.preprovider.extraaddresses.length + 1,
            email: $scope.preprovider.email,
            phone: $scope.preprovider.phone,
            phone2: $scope.preprovider.phone2,
            resolvedaddress: $scope.preprovider.resolvedaddress,
            enableRayonGorad: $scope.enableRayonGorad,
            enableGorad: $scope.enableGorad,
            enableRayon: $scope.enableRayon,
            showGorad: $scope.showGorad,
            showRayonGorad: $scope.showRayonGorad,
            rayonOptions: $scope.rayonOptions,
            goradOptions: $scope.goradOptions,
            rayongoradOptions: $scope.rayongoradOptions,
            oblastOptions: $scope.oblastOptions,
            address: $scope.preprovider.address,
            oblast: $scope.preprovider.oblast,
            rayon: $scope.preprovider.rayon,
            gorad: ($scope.preprovider.gorad !== undefined ? $scope.preprovider.gorad : null),
            rayongorad: ($scope.preprovider.rayongorad !== undefined ? $scope.preprovider.rayongorad : null)
        });
    };
    $scope.removeAddress = function(address) {
        $scope.preprovider.extraaddresses.forEach(function(s, index) {
            if (s.rayon.en === address.rayon.en) {
                $scope.preprovider.extraaddresses.splice(index, 1);
            }
        });
    };

    function getProviders() {
        $scope.deferred = $scope.changeProviderListing();
    }

    function getPreproviders() {
        $scope.deferred = $scope.changePreproviderListing();
    }

    function getServices() {
        $scope.deferred = $scope.changeServiceListing();
    }

    function getUsers() {
        $scope.deferred = $scope.changeUserListing();
    }

    function getArticles() {
        $scope.deferred = $scope.changeArticleListing();
    }

    function getRequests() {
        $scope.deferred = $scope.changeRequestListing();
    }
    $scope.addAdminService = function() {
        $http.post('/api/services', $scope.service).success(function(service) {
            $scope.service = service;
            $state.go('servicelist', {
                type: 'save'
            })
        });
    };
    $scope.addAdminArticle = function() {
        $http.post('/api/articles', $scope.article).success(function(article) {
            $scope.article = article;
            $state.go('articlelist', {
                type: 'save'
            })
        });
    };
    $scope.updateAdminArticle = function(statego) {
        $http.put('/api/articles/' + $scope.article._id, $scope.article).success(function(article) {
            $scope.article = article;
            $state.go('articlelist', {
                type: 'update'
            })
        });
    };
    $scope.addComment = function(statego) {
        $scope.request.admincomments.push({
            message: $scope.commentPopover.message,
            sentAt: moment().tz('Europe/Kiev'),
            sender: $scope.currentUser._id
        })
        $http.put('/api/requests/' + $scope.request._id, $scope.request).success(function(request) {
            $scope.request = request;
            for (i = 0; i < document.getElementsByClassName("popover").length; ++i) {
                document.getElementsByClassName("popover")[i].style.cssText = 'display:none !important';
            }
            toastr.success(gettextCatalog.getString('Successfully added comment'));
            $state.go('adminrequest', {
                requestid: $scope.request._id
            }, {
                reload: true
            });
        });
    };
    $scope.addAdminServiceGroup = function() {
        var duparray = [];
        $scope.servicegroup.services.forEach(function(s) {
            duparray.push(s.name);
        })
        var check = checkIfArrayIsUnique(duparray);
        if (check.length === 0) {
            $http.post('/api/servicegroups', $scope.servicegroup).success(function(servicegroup) {
                $scope.servicegroup = servicegroup;
                $state.go('servicegroup', {
                    type: 'save'
                })
            })
        } else {
            alert(gettext('there are duplicate services, plese check the information you entered') + ': ' + check);
        }
    };
    $scope.updateAdminServiceGroup = function(statego) {
        var duparray = [];
        $scope.servicegroup.services.forEach(function(s) {
            duparray.push(s.name);
        })
        var check = checkIfArrayIsUnique(duparray);
        if (check.length === 0) {
            $http.put('/api/servicegroups/' + $scope.servicegroup._id, $scope.servicegroup).success(function(servicegroup) {
                $scope.servicegroup = servicegroup;
                $state.go('servicegroup', {
                    type: 'update'
                })
            })
        } else {
            alert(gettext('there are duplicate services, plese check the information you entered') + ': ' + check);
        }
    };
    $scope.updateAdminService = function(statego) {
        $http.put('/api/services/' + $scope.service._id, $scope.service).success(function(service) {
            $scope.service = service;
            $state.go('servicelist', {
                type: 'update'
            })
        });
    };
    $scope.removeService = function(service) {
        $scope.preprovider.services.forEach(function(s, index) {
            if (s.name === service.name) {
                $scope.preprovider.services.splice(index, 1);
            }
        });
    };
    $scope.removeServiceGroupService = function(service) {
        $scope.servicegroup.services.forEach(function(s, index) {
            if (s.name === service.name) {
                $scope.servicegroup.services.splice(index, 1);
            }
        });
    };
    $scope.addImage = function(service) {
        service.images.push({
            url: ''
        })
    };
    $scope.sendLoginInfo = function(user, requestid) {
        Auth.sendLoginProviderEmail(user.email, user.xp).then(function() {
            toastr.success(gettextCatalog.getString('Successfully sent login email to provider'));
            $state.go('adminrequest', {
                requestid: $scope.request._id
            }, {
                reload: true
            });
        })
    }
    $scope.sendOpportunityEmail = function(userid, providerid, requestid) {
        Auth.sendOpportunityEmail(userid, providerid, requestid).then(function() {
            toastr.success(gettextCatalog.getString('Successfully sent opportunity email to provider'));
            $state.go('adminrequest', {
                requestid: requestid
            }, {
                reload: true
            });
        })
    }
    $scope.addQuestion = function() {
        $scope.service.questions.push({
            id: $scope.service.questions.length + 1,
            order: null,
            qtype: "Singleselect",
            question: {
                en: null,
                ru: null,
                uk: null
            },
            options: [{
                order: 1,
                option: {
                    en: null,
                    ru: null,
                    uk: null
                },
            }]
        });
    };
    $scope.addKeyword = function() {
        $scope.service.keywords.push("a");
    };
    $scope.removeKeyword = function(keyword) {
        $scope.service.keywords.forEach(function(k, index) {
            if (k === keyword) {
                $scope.service.keywords.splice(index, 1)
            }
        })
    }
    $scope.getAddress = function(address, index) {
        var newaddress = undefined;
        if (address.indexOf(',') > -1) {
            newaddress = address.replace(/,/g, '')
        }
        if (address.indexOf('/') > -1) {
            newaddress = address.replace('/', ' ');
        }
        if (address.indexOf('.') > -1) {
            newaddress = address.replace('.', ' ');
        }
        $http.get('/api/preproviders/findaddress/' + newaddress).success(function(address1) {
            var neigb = address1[0].extra.neighborhood;
            var oblast = address1[0].administrativeLevels.level1long;
            var city = address1[0].city;
            if (index === null) {
                $scope.preprovider.resolvedaddress = oblast + ', ' + city + ', ' + neigb
                $scope.checkEmail()
                $scope.checkWebsite();
                $scope.checkPhone();
            } else {
                $scope.preprovider.extraaddresses[index].resolvedaddress = oblast + ', ' + city + ', ' + neigb
            }
        })
    }
    $scope.getDataAutomatically = function() {
        if ($scope.preprovider.website === undefined || $scope.preprovider.company === undefined || $scope.preprovider.phone === undefined || $scope.preprovider.address === undefined) {
            alert(gettext('please enter at least website,company,phone1 and address'));
        } else {
            $http.post('/api/preproviders/crawlpage', $scope.preprovider).success(function(metadata) {
                var metadata = metadata[$scope.preprovider.website];
                var services = [];
                metadata.services.forEach(function(service) {
                    var data = {
                        id: metadata.services.length + 1,
                        service: service.serviceid,
                        name: service.subcategoryRu,
                        images: []
                    }
                    if (service.matchedimages !== undefined) {
                        service.matchedimages.forEach(function(img) {
                            if (img.indexOf("http://") > -1) {
                                data.images.push({
                                    url: img
                                })
                            } else {
                                data.images.push({
                                    url: $scope.preprovider.website + img
                                })
                            }
                        })
                    } else {
                        data.images = [{
                            url: ''
                        }]
                    }
                    services.push(data);
                })
                $scope.preprovider.services = services;
                alert("success preprovider crawl")
            })
        }
    }
    $scope.addOption = function(index) {
        $scope.service.questions[index].options.push({
            id: $scope.service.questions[index].options + 1,
            order: null,
            option: {
                en: null,
                ru: null,
                uk: null
            }
        })
    };
    $scope.removeQuestion = function(question) {
        $scope.service.questions.splice(_.indexOf($scope.service.questions, _.find($scope.service.questions, function(item) {
            return item.id === question.id;
        })), 1)
    };
    $scope.removeOption = function(q, option) {
        $scope.service.questions.forEach(function(question) {
            if (question._id = q._id) {
                question.options.splice(_.indexOf(question.options, _.find(question.options, function(item) {
                    return item.id === option.id;
                })), 1)
            }
        })
    };
    $scope.onTypeSelect = function(item, index) {
        $scope.preprovider.services[index].service = item._id;
        $scope.preprovider.services[index].name = $filter('translateFilter')(item.subcategory, $scope.languageKey);
    };
    $scope.onTypeSelectGroup = function(item, index) {
        $scope.servicegroup.services[index].service = item._id;
        $scope.servicegroup.services[index].name = $filter('translateFilter')(item.subcategory, $scope.languageKey);
    };
    $scope.setCompany = function(item) {
        if (item.objectid === 2) {
            $scope.showCompany = true;
        } else {
            $scope.showCompany = false;
        }
    };
    $scope.removeText = function(service, index) {
        service.images.splice(index, 1)
    };

    function getitemLang(item) {
        if ($scope.languageKey === 'en') {
            return item.en;
        } else if ($scope.languageKey === 'ru') {
            return item.ru;
        } else if ($scope.languageKey === 'uk') {
            return item.uk;
        }
    }
    $scope.getOblastRayons = function(item, index) {
        if (index === null) {
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
                $scope.rayonOptions = goradarray.concat(rayonarray);
                $scope.enableRayon = true;
                if ($scope.preprovider.rayon === undefined || $scope.preprovider.rayon === null) {
                    $scope.preprovider.rayon = $scope.rayonOptions[0];
                    $scope.goradOptions = $scope.getRayonGorads($scope.rayonOptions[0], null);
                }
                $scope.getRayonGorads($scope.preprovider.rayon, null);
                // else {
                //     //$scope.preprovider.rayon = $scope.rayonOptions[0];
                //     $scope.getRayonGorads($scope.preprovider.rayon, null);
                // }
            })
        } else {
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
                $scope.preprovider.extraaddresses[index].rayonOptions = goradarray.concat(rayonarray);
                $scope.preprovider.extraaddresses[index].enableRayon = true;
                if ($scope.preprovider.extraaddresses[index].rayon === undefined || $scope.preprovider.extraaddresses[index].rayon === null) {
                    $scope.preprovider.extraaddresses[index].rayon = $scope.preprovider.extraaddresses[index].rayonOptions[0];
                    $scope.preprovider.extraaddresses[index].goradOptions = $scope.getRayonGorads($scope.preprovider.extraaddresses[index].rayonOptions[0], index);
                }
                $scope.getRayonGorads($scope.preprovider.extraaddresses[index].rayon, index);
                //  else {
                //     $scope.preprovider.extraaddresses[index].rayon = $scope.preprovider.extraaddresses[index].rayonOptions[0];
                // }
            })
        }
    };
    $scope.applyWhenOptions = function(item) {
        if (item.objectid === 1) {
            $scope.showWhenPanel = true;
        } else {
            $scope.showWhenPanel = false;
        }
    };
    $scope.getRayonGorads = function(item, index) {
        if (index === null) {
            $http.get('/api/places/gorads/' + item.slug + '/' + $scope.preprovider.oblast.slug + '/' + $scope.languageKey).success(function(gorads) {
                $scope.goradOptions = gorads;
                if ($scope.goradOptions[0] === null || $scope.goradOptions[0] === undefined) {
                    $scope.showGorad = false;
                    $scope.showRayonGorad = false;
                    $scope.enableGorad = true;
                    $scope.preprovider.gorad = $scope.goradOptions[0];
                    return null;
                } else {
                    $scope.enableGorad = true;
                    $scope.showGorad = true;
                    $scope.showRayonGorad = false;
                    if ($scope.preprovider.gorad === undefined || $scope.preprovider.gorad === null) {
                        $scope.preprovider.gorad = $scope.goradOptions[0];
                    }
                    $scope.getRayongoradGorads($scope.preprovider.gorad, null);
                }
            })
        } else {
            $http.get('/api/places/gorads/' + item.slug + '/' + $scope.preprovider.extraaddresses[index].oblast.slug + '/' + $scope.languageKey).success(function(gorads) {
                $scope.preprovider.extraaddresses[index].goradOptions = gorads;
                if ($scope.preprovider.extraaddresses[index].goradOptions[0] === null || $scope.preprovider.extraaddresses[index].goradOptions[0] === undefined) {
                    $scope.preprovider.extraaddresses[index].showGorad = false;
                    $scope.preprovider.extraaddresses[index].showRayonGorad = false;
                    $scope.preprovider.extraaddresses[index].enableGorad = true;
                    $scope.preprovider.extraaddresses[index].gorad = $scope.preprovider.extraaddresses[index].goradOptions[0];
                    return null;
                } else {
                    $scope.preprovider.extraaddresses[index].enableGorad = true;
                    $scope.preprovider.extraaddresses[index].showGorad = true;
                    $scope.preprovider.extraaddresses[index].showRayonGorad = false;
                    if ($scope.preprovider.extraaddresses[index].gorad === undefined || $scope.preprovider.extraaddresses[index].gorad === null) {
                        $scope.preprovider.extraaddresses[index].gorad = $scope.preprovider.extraaddresses[index].goradOptions[0];
                    }
                    $scope.getRayongoradGorads($scope.preprovider.extraaddresses[index].gorad, index);
                }
            })
        }
    };

    function toTitleCase(str) {
        return string(str).capitalize().s;
    }

    function toLowerCase(str) {
        return str.toLowerCase()
    }
    $scope.getRayongoradGorads = function(item, index) {
        if (index === null) {
            $http.get('/api/places/rayongorads/' + $scope.preprovider.oblast.slug + '/' + item.slug + '/' + $scope.preprovider.rayon.slug + '/' + $scope.languageKey).success(function(rayongorads) {
                $scope.rayongoradOptions = rayongorads;
                if (rayongorads[0] === null ||  rayongorads[0] === undefined) {
                    $scope.showRayonGorad = false;
                    $scope.enableRayonGorad = false;
                    $scope.preprovider.rayongorad = undefined;
                    return null;
                } else {
                    // $scope.provider.rayongorad = $scope.rayongoradOptions[0];
                    $scope.enableRayonGorad = true;
                    $scope.showRayonGorad = true;
                    if ($scope.preprovider.rayongorad === undefined || $scope.preprovider.rayongorad === null) {
                        $scope.preprovider.rayongorad = $scope.rayongoradOptions[0];
                    }
                }
            })
        } else {
            $http.get('/api/places/rayongorads/' + $scope.preprovider.extraaddresses[index].oblast.slug + '/' + item.slug + '/' + $scope.preprovider.extraaddresses[index].rayon.slug + '/' + $scope.languageKey).success(function(rayongorads) {
                $scope.preprovider.extraaddresses[index].rayongoradOptions = rayongorads;
                if (rayongorads[0] === null ||  rayongorads[0] === undefined) {
                    $scope.preprovider.extraaddresses[index].showRayonGorad = false;
                    $scope.preprovider.extraaddresses[index].enableRayonGorad = false;
                    $scope.preprovider.extraaddresses[index].rayongorad = undefined;
                    return null;
                } else {
                    $scope.preprovider.extraaddresses[index].enableRayonGorad = true;
                    $scope.preprovider.extraaddresses[index].showRayonGorad = true;
                    if ($scope.preprovider.extraaddresses[index].rayongorad === undefined || $scope.preprovider.extraaddresses[index].rayongorad === null) {
                        $scope.preprovider.extraaddresses[index].rayongorad = $scope.preprovider.extraaddresses[index].rayongoradOptions[0];
                    }
                }
            })
        }
    };
    $scope.applyTranslation = function() {
        $http.get('/api/preproviders/translate/' + $scope.service.subcategory.ru.text).success(function(data) {
            $scope.service.subcategory.uk.text = data.uk[0];
            $scope.service.subcategory.en.text = data.en[0];
            $scope.service.subcategory.en.slug = $speakingurl.getSlug($scope.service.subcategory.en.text);
            $scope.service.subcategory.ru.slug = $speakingurl.getSlug($scope.service.subcategory.ru.text);
            $scope.service.subcategory.uk.slug = $speakingurl.getSlug($scope.service.subcategory.uk.text);
        })
    }
    $scope.addPreprovider = function() {
        var duparray = [];
        var duplicatesExist = false;
        $scope.preprovider.services.forEach(function(s) {
            duparray.push(s.name);
        })
        var imageerror = false;
        var servicenullerror = false;
        var errorimageservice = "";
        var errornullservice = []
        $scope.preprovider.services.forEach(function(service) {
            if (service.images.length > 6 || service.images === undefined || service.images.length === 0 ||  service.images[0].url === "" ||  service.images[0].url === null) {
                imageerror = true;
                errorimageservice = service.name;
            }
            if (service.service === null) {
                servicenullerror = true;
                errornullservice.push(service.name);
            }
        })
        if (servicenullerror) {
            alert(errornullservice + ' is null please select again')
            return false;
        } else {
            if (imageerror && $scope.preprovider.deleted === false) {
                alert(errorimageservice + ' имеет более чем 6 или нет изображения')
                return false;
            } else {
                var check = checkIfArrayIsUnique(duparray);
                if (check.length === 0) {
                    if ($scope.showRayonGorad === false) {
                        $scope.preprovider.rayongorad = null;
                    }
                    if ($scope.showGorad === false) {
                        $scope.preprovider.gorad = null;
                    }
                    $http.post('/api/preproviders', $scope.preprovider).success(function(preprovider) {
                        $scope.preprovider = preprovider;
                        $state.go('preproviderlist', {
                            type: 'save'
                        }, {
                            reload: true
                        });
                    });
                } else {
                    alert(gettext('there are duplicate services, plese check the information you entered') + ': ' + check);
                }
            }
        }
    };
    $scope.checkEmail = function() {
        $scope.foundpreprovidersemail = [];
        if ($scope.preprovider.email !== undefined) {
            $http.get('/api/preproviders/admincheckemail/' + $scope.preprovider.email).success(function(data) {
                if (data.preproviders.length > 0) {
                    data.preproviders.forEach(function(p) {
                        if ($scope.preprovider._id !== p._id) {
                            if (p.deleted === false) {
                                $scope.foundpreprovidersemail.push(p);
                                $scope.locksave = true
                            }
                        }
                    })
                } else {
                    $scope.locksave = false;
                    $scope.useremailexists = false;
                }
                // if (data.users !== undefined) {
                //     $scope.useremailexists = true;
                //     $scope.locksave = true;
                // } else {
                //     if (data.preproviders.length < 1) {
                //         $scope.useremailexists = false;
                //         $scope.locksave = false;
                //     }
                // }
            })
        }
    }
    $scope.checkPhone = function() {
        $scope.foundpreprovidersphone = [];
        if ($scope.preprovider.phone !== undefined) {
            $http.get('/api/preproviders/admincheckphone/' + $scope.preprovider.phone).success(function(preproviders) {
                if (preproviders.length > 0) {
                    preproviders.forEach(function(p) {
                        if ($scope.preprovider._id !== p._id) {
                            if (p.deleted === false) {
                                $scope.foundpreprovidersphone.push(p);
                                $scope.locksave = true
                            }
                        }
                    })
                } else {
                    $scope.locksave = false;
                }
            })
        }
    }
    $scope.checkWebsite = function() {
        $scope.foundpreproviders = [];
        if ($scope.preprovider.website !== undefined) {
            var protocol = urlParser.getProtocol($scope.preprovider.website)
            var host = urlParser.getHost($scope.preprovider.website)
            $http.get('/api/preproviders/admincheckwebsite/' + protocol + '/' + host).success(function(preproviders) {
                if (preproviders.length > 0) {
                    preproviders.forEach(function(p) {
                        if ($scope.preprovider._id !== p._id) {
                            if (p.deleted === false) {
                                $scope.foundpreproviders.push(p);
                                $scope.locksave = true;
                            }
                        }
                    })
                } else {
                    $scope.locksave = false;
                }
            })
        }
    }

    function checkIfArrayIsUnique(myArray) {
        //return myArray.length === new Set(myArray).size;
        //var arr = [9, 9, 111, 2, 3, 4, 4, 5, 7];
        var sorted_arr = myArray.slice().sort(); // You can define the comparing function here.  
        var results = [];
        for (var i = 0; i < myArray.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
            }
        }
        return results;
    }
    $scope.updatePreprovider = function(statego) {
        var duparray = [];
        var duplicatesExist = false;
        $scope.preprovider.services.forEach(function(s) {
            duparray.push(s.name);
        })
        if (moment($scope.preprovider.createdAt).tz('Europe/Kiev') < moment().tz('Europe/Kiev')) {
            $scope.preprovider.updated = true;
            $scope.preprovider.updatedby = $scope.currentUser._id;
        }
        var imageerror = false;
        var servicenullerror = false;
        var errorimageservice = "";
        var errornullservice = [];
        $scope.preprovider.services.forEach(function(service) {
            if (service.images.length > 6 || service.images === undefined || service.images.length === 0 ||  service.images[0].url === "" ||  service.images[0].url === null) {
                imageerror = true;
                errorimageservice = service.name;
            }
            if (service.service === null) {
                servicenullerror = true;
                errornullservice.push(service.name);
            }
        })
        if (servicenullerror) {
            alert(errornullservice + ' is null please select again')
            return false;
        } else {
            if (imageerror && $scope.preprovider.deleted === false) {
                alert(errorimageservice + ' имеет более чем 6 или нет изображения')
                return false;
            } else {
                var check = checkIfArrayIsUnique(duparray);
                if (check.length === 0) {
                    if ($scope.showRayonGorad === false) {
                        $scope.preprovider.rayongorad = null;
                    }
                    if ($scope.showGorad === false) {
                        $scope.preprovider.gorad = null;
                    }
                    $http.put('/api/preproviders/' + $scope.preprovider._id, $scope.preprovider).success(function(preprovider) {
                        $scope.preprovider = preprovider;
                        $state.go('preproviderlist', {
                            type: 'update'
                        }, {
                            reload: true
                        });
                    });
                } else {
                    alert(gettext('there are duplicate services, plese check the information you entered') + ': ' + check);
                }
            }
        }
    };
    $scope.addFunds = function() {
        $scope.transaction.user = $stateParams.userid;
        $scope.transaction.transactionType = $scope.transactionTypes[3];
        $scope.transaction.amount.currency = 'грн.';
        $http.get('/api/transactions/user/' + $stateParams.userid).success(function(transactions) {
            var total = 0;
            transactions.forEach(function(transaction) {
                if (transaction.transactionType.add === false) {
                    total -= transaction.amount.value;
                } else {
                    total += transaction.amount.value;
                }
            })
            if ($scope.transaction.transactionType.add === false) {
                total -= Number($scope.transaction.amount.value);
            } else {
                total += Number($scope.transaction.amount.value);
            }
            $scope.transaction.balance = {};
            $scope.transaction.balance.value = total;
            $scope.transaction.balance.currency = 'грн.';
            $http.post('/api/transactions', $scope.transaction).success(function(transaction) {
                $scope.transaction = transaction;
                $state.go('userlist', {
                    type: 'saveaddfunds'
                })
            });
        });
    };
    $scope.updateFunds = function(statego) {
        $http.put('/api/transactions/' + $scope.transaction._id, $scope.transaction).success(function(transaction) {
            $scope.transaction = transaction;
            $state.go('userlist', {
                type: 'updateaddfunds'
            })
        });
    };
    $scope.deletePreprovider = function(id, golist) {
        $http.get('/api/preproviders/' + id).success(function(preprovider) {
            $scope.preprovider = preprovider;
            $scope.preprovider.updated = true;
            $scope.preprovider.updatedby = $scope.currentUser._id;
            $scope.preprovider.deleted = true;
            $scope.preprovider.deletedby = $scope.currentUser._id;
            $http.put('/api/preproviders/' + $scope.preprovider._id, $scope.preprovider).success(function(preprovider) {
                $scope.preprovider = preprovider;
                // $state.go($state.current, {}, {
                //     reload: true
                // });
                $state.go('preproviderlist', {
                    type: 'delete'
                }, {
                    reload: true
                });
            });
        });
    }
    $scope.deleteServicegroup = function(sgid) {
        $http.delete('/api/servicegroups/' + sgid).success(function(servicegroup) {
            $state.go('servicegroup', {
                type: 'delete'
            }, {
                reload: true
            });
        })
    };
    $scope.deleteArticle = function(sgid) {
        $http.delete('/api/articles/' + sgid).success(function(article) {
            $state.go('articlelist', {
                type: 'delete'
            }, {
                reload: true
            });
        })
    };

    function generatePassword() {
        return String(Math.floor(Math.random() * 900000) + 100000);
    }

    function createDomainFromUrl(url) {
        var domain;
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        } else {
            domain = url.split('/')[0];
        }
        domain = domain.split(':')[0];
        if (domain.indexOf('www.') >= 0) {
            domain = domain.replace('www.', '');
        }
        domain = domain.split('.')[0];
        return domain;
    }
    $scope.changeProviderListing = function() {
        var order = '';
        var sort = '';
        if ($scope.query.order.indexOf('-') > -1) {
            sort = 'asc';
            order = $scope.query.order.replace('-', '');
        } else {
            sort = 'desc';
            order = $scope.query.order;
        }
        $http.get('/api/providers?filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.providers = data.results;
            $scope.providers.forEach(function(a) {
                $http.get('/api/transactions/user/' + a.user._id).success(function(transactions) {
                    a.transactions = transactions;
                })
            })
        });
    };
    $scope.emailChange = function() {
        $scope.checkEmail();
    }
    $scope.phoneChange = function() {
        $scope.checkPhone();
    }
    $scope.websiteChange = function() {
        $scope.checkWebsite();
    }
    $scope.changeUserListing = function() {
        var order = '';
        var sort = '';
        if ($scope.query.order.indexOf('-') > -1) {
            sort = 'asc';
            order = $scope.query.order.replace('-', '');
        } else {
            sort = 'desc';
            order = $scope.query.order;
        }
        $http.get('/api/users/adminindex?filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.users = data.results;
            $scope.users.forEach(function(a) {
                $http.get('/api/transactions/user/' + a._id).success(function(transactions) {
                    a.transactions = transactions;
                })
            })
        });
    };
    $scope.changeArticleListing = function() {
        var order = '';
        var sort = '';
        if ($scope.query.order.indexOf('-') > -1) {
            sort = 'asc';
            order = $scope.query.order.replace('-', '');
        } else {
            sort = 'desc';
            order = $scope.query.order;
        }
        $http.get('/api/articles?filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.articles = data.results;
        });
    };
    $scope.changeRequestListing = function() {
        if ($scope.status === 'newpreproviders') {
            $scope.status = 'allrequests';
        }
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
        $http.get('/api/requests/adminindex?status=' + status + '&filter=' + $scope.query.filter + '+&order=sequence' + '&sort=desc' + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.requests = data.results;
            // $scope.requests.forEach(function(request, index) {
            //     request.statusname = $scope.statusOptions[request.status.objectid - 1].name
            //     if (request.quotes) {
            //         request.quotes.forEach(function(quote) {
            //             $http.get('/api/quotes/' + quote._id).success(function(quote) {
            //                 if (quote.selected) {
            //                     $scope.requests[index].selectedquote = quote;
            //                 }
            //             })
            //         })
            //     }
            // })
        });
    };
    $scope.changeRussianServiceToTitleCase = function() {
        $scope.service.subcategory.ru.text = toTitleCase($scope.service.subcategory.ru.text)
    }
    $scope.approvePreprovider = function(id, inside) {
        $http.get('/api/preproviders/' + id).success(function(preprovider) {
            var disabletext = "isDisabled" + preprovider._id
            var model = $parse(disabletext);
            model.assign($scope, true);
            var pass = generatePassword();
            if (preprovider.company === null) {
                alert(gettext('please fill company name'))
            } else {
                $http.post('/api/users', {
                    name: preprovider.company,
                    email: ((preprovider.email !== undefined && preprovider.email !== "" && preprovider.email !== null) ? preprovider.email : (createDomainFromUrl(preprovider.website) + generatePassword() + '@posluga.ua')),
                    password: pass,
                    xp: pass,
                    language: 'ru',
                    providers: [],
                    requests: [],
                    isprovider: true,
                    picture: preprovider.photo,
                    createdbyrequest: true,
                    stats: {
                        securitychecks: [{
                            objectid: 1
                        }, {
                            objectid: 2
                        }]
                    }
                }).success(function(usr) {
                    createProviderWithServices(preprovider, usr, null)
                    if (preprovider.extraaddresses.length > 0) {
                        preprovider.extraaddresses.forEach(function(address) {
                            createProviderWithServices(preprovider, usr, address)
                        })
                    }
                    preprovider.created = true;
                    preprovider.createdby = $scope.currentUser._id;
                    $http.put('/api/preproviders/' + preprovider._id, preprovider).success(function(preprovider) {
                        console.log('successfull created')
                        toastr.success(gettextCatalog.getString('Successfully created provider'));
                        // $state.go($state.current, {
                        //     type: "approve"
                        // }, {
                        //     reload: true
                        // });
                    });
                })
            }
        });
    }

    function createProviderWithServices(preprovider, usr, extraaddress) {
        preprovider.services.forEach(function(service, index) {
            var files = [];
            if (service.images !== undefined) {
                service.images.forEach(function(image) {
                    files.push({
                        location: image.url
                    })
                })
            }
            $http.get('/api/services/byruname/' + service.name).success(function(dbservice) {
                var provider = {
                    user: usr.user._id,
                    service: dbservice,
                    searchtext: dbservice.subcategory.ru.text,
                    files: files,
                    businesstype: $scope.businessTypes[1],
                    company: ((preprovider.company !== undefined && preprovider.company.length > 2) ? toTitleCase(preprovider.company) : null),
                    description: preprovider.description,
                    firstname: null,
                    lastname: null,
                    website: preprovider.website,
                    logo: {
                        location: (preprovider.photo !== undefined ? preprovider.photo : null)
                    },
                    address: (extraaddress !== null ? (extraaddress.address !== undefined ? extraaddress.address : null) : (preprovider.address !== undefined ? preprovider.address : null)),
                    phone: (extraaddress !== null ? (extraaddress.phone !== undefined ? extraaddress.phone : null) : (preprovider.phone !== undefined ? preprovider.phone : null)),
                    landline: (extraaddress !== null ? (extraaddress.phone2 !== undefined ? extraaddress.phone2 : null) : (preprovider.landline !== undefined ? preprovider.landline : null)),
                    phonelist: (extraaddress !== null ? (extraaddress.phonelist !== undefined ? extraaddress.phonelist : null) : (preprovider.phonelist !== undefined ? preprovider.phonelist : null)),
                    oblast: (extraaddress !== null ? extraaddress.oblast : preprovider.oblast),
                    rayon: (extraaddress !== null ? extraaddress.rayon : preprovider.rayon),
                    gorad: (extraaddress !== null ? extraaddress.gorad : preprovider.gorad),
                    rayongorad: (extraaddress !== null ? extraaddress.rayongorad : preprovider.rayongorad),
                    place: preprovider.placeid,
                    adminCreated: true,
                    documents: [],
                    established: {},
                    links: [],
                    quotes: [],
                    createdby: $scope.currentUser._id,
                    termsaccepted: true,
                    stats: {
                        securitychecks: [{
                            'objectid': 1
                        }, {
                            'objectid': 2
                        }],
                        recommended: false,
                        totalscore: 80,
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
                            completeness: 70,
                            issues: [{
                                objectid: 2,
                                name: "Add Profile Link to Your Website",
                                element: "links"
                            }, {
                                objectid: 3,
                                name: "Add Official Documents",
                                element: "documents"
                            }, {
                                objectid: 4,
                                name: "Add Established Date",
                                element: "established"
                            }]
                        }
                    }
                }
                $http.post('/api/providers', provider).success(function(provider) {
                    console.log("provider created")
                });
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
    if ($state.current.name === 'preproviderlist') {
        $scope.updatepreprovider = false;
        $scope.savepreprovider = false;
        $scope.deletepreprovider = false;
        if ($stateParams.type === 'update') {
            $scope.updatepreprovider = true;
        }
        if ($stateParams.type === 'save') {
            $scope.savepreprovider = true;
        }
        if ($stateParams.type === 'delete') {
            $scope.deletepreprovider = true;
        }
        if ($stateParams.type === 'approve') {
            $scope.approvedpreprovider = true;
            $scope.status = 'updatedpreproviders'
        }
        $scope.changePreproviderListing();
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
            getPreproviders();
        });
    } else if ($state.current.name === 'providerlist') {
        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.query = {
            filter: '',
            limit: '10',
            order: '-createdAt',
            page: 0
        };
        $scope.changeProviderListing();
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
            getProviders();
        });
        if ($stateParams.type === 'deleteprovider') {
            $scope.deletepreprovider = true;
        }
    } else if ($state.current.name === 'userlist') {
        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.query = {
            filter: '',
            limit: '10',
            order: '-createdAt',
            page: 0
        };
        $scope.changeUserListing();
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
            getUsers();
        });
        if ($stateParams.type === 'updateaddfunds') {
            $scope.updateaddfunds = true;
        }
        if ($stateParams.type === 'saveaddfunds') {
            $scope.saveaddfunds = true;
        }
    } else if ($state.current.name === 'articlelist') {
        $scope.updatearticle = false;
        $scope.savearticle = false;
        if ($stateParams.type === 'update') {
            $scope.updatearticle = true;
        }
        if ($stateParams.type === 'save') {
            $scope.savearticle = true;
        }
        $http.get('/api/services/').success(function(services) {
            $scope.services = services;
        })
        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.query = {
            filter: '',
            limit: '50',
            order: '-createdAt',
            page: 0
        };
        $scope.changeArticleListing();
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
            getArticles();
        });
    } else if ($state.current.name === 'requestlist') {
        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.query = {
            filter: '',
            limit: '10',
            order: '-createdAt',
            page: 0
        };
        $scope.changeRequestListing();
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
        if ($stateParams.type === 'updaterequest') {
            $scope.updaterequest = true;
        }
        if ($stateParams.type === 'deleterequest') {
            $scope.deleterequest = true;
        }
        if ($stateParams.type === 'saverequest') {
            $scope.saverequest = true;
        }
        if ($stateParams.type === 'updateprovider') {
            $scope.updateprovider = true;
        }
        if ($stateParams.type === 'updateuser') {
            $scope.updateuser = true;
        }
    } else if ($state.current.name === 'adminrequest') {
        // $scope.requesttitle = gettextCatalog.getString('Request');
        // Date.parseDate = function(input, format) {
        //     return moment(input, format).toDate();
        // };
        // Date.prototype.dateFormat = function(format) {
        //     return moment(this).format(format);
        // };
        // $scope.request.date = moment(moment().tz("Europe/Kiev")).add(1, 'days').set({
        //     hour: 12,
        //     minute: 0
        // });
        //jQuery.datetimepicker.setLocale($scope.languageKey);
        $http.get('/api/places/oblasts/all' + '/' + $scope.languageKey).success(function(oblasts) {
            $scope.oblastOptions = oblasts;
            if ($stateParams.requestid !== undefined) {
                $http.get('/api/requests/' + $stateParams.requestid).success(function(request) {
                    $scope.request = request;
                }).catch(function(err) {
                    console.log(err);
                });
            }
        })
    } else if ($state.current.name === 'addfunds') {
        $scope.switchupdatetransaction = false;
        $http.get('/api/users/' + $stateParams.userid).success(function(user) {
            $scope.user = user;
            if ($stateParams.transactionid !== null) {
                $http.get('/api/transactions/' + $stateParams.transactionid).success(function(transaction) {
                    $scope.transaction = transaction;
                    $scope.switchupdatetransaction = true;
                });
            }
        })
    } else if ($state.current.name === 'servicelist') {
        $scope.updateservice = false;
        $scope.saveservice = false;
        if ($stateParams.type === 'update') {
            $scope.updateservice = true;
        }
        if ($stateParams.type === 'save') {
            $scope.saveservice = true;
        }
        $http.get('/api/services/').success(function(services) {
            $scope.services = services;
        })
        $scope.changeServiceListing();
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
            getServices();
        });
    } else if ($state.current.name === 'adminservice') {
        if ($stateParams.serviceid !== null) {
            $scope.switchupdateservice = true;
            $http.get('/api/services/' + $stateParams.serviceid).success(function(service) {
                $scope.service = service;
                if ($stateParams.createsimilar) {
                    $scope.switchupdateservice = false;
                    $scope.createsimilarservice = true;
                    $scope.service.subcategory.ru.text = "";
                    $scope.service.subcategory.ru.slug = "";
                    $scope.service.subcategory.en.text = "";
                    $scope.service.subcategory.en.slug = "";
                    $scope.service.subcategory.uk.text = "";
                    $scope.service.subcategory.uk.slug = "";
                    $scope.service.subcategory.subcategoryid = Math.floor(Math.random() * 90000) + 10000;
                    $scope.service._id = undefined;
                }
            }).catch(function(err) {
                console.log(err);
            });
        } else {
            $scope.switchupdateservice = false;
            $scope.service = {
                popular: false,
                questions: []
            };
        }
    } else if ($state.current.name === 'adminarticle') {
        if ($stateParams.articleid !== null) {
            $scope.switchupdatearticle = true;
            $http.get('/api/articles/' + $stateParams.articleid).success(function(article) {
                $scope.article = article;
            })
        } else {
            $scope.switchupdatearticle = false;
            $scope.article = {
                user: $scope.currentUser._id
            };
        }
    } else if ($state.current.name === 'preprovider') {
        $scope.oblastOption = {};
        $scope.rayonOption = {};
        $scope.showRayonGorad = false;
        $scope.categoryOption = {};
        $scope.enableGorad = false;
        $scope.showGorad = false;
        $scope.enableRayonGorad = false;
        $scope.switchupdatepreprovider = false;
        $scope.showCompany = true;
        bootstrap3ElementModifier.enableValidationStateIcons(true);
        $scope.businessTypes = [{
            'objectid': 1,
            'name': gettextCatalog.getString('Personal')
        }, {
            'objectid': 2,
            'name': gettextCatalog.getString('Company')
        }];
        $http.get('/api/places/oblasts/all' + '/' + $scope.languageKey).success(function(oblasts) {
            $scope.oblastOptions = oblasts;
            if ($stateParams.preproviderid !== null) {
                $http.get('/api/preproviders/' + $stateParams.preproviderid).success(function(preprovider) {
                    $scope.preprovider = preprovider;
                    $scope.switchupdatepreprovider = true;
                    if ($scope.preprovider.oblast === null) {
                        $scope.preprovider.oblast = $scope.oblastOptions[0]
                    }
                    $scope.getOblastRayons($scope.preprovider.oblast, null);
                    $scope.getAddress($scope.preprovider.address, null);
                }).catch(function(err) {
                    console.log(err);
                });
            } else {
                $scope.switchupdatepreprovider = false;
                $scope.showCompany = true;
                $scope.preprovider = {
                    extraaddresses: [],
                    businesstype: $scope.businessTypes[1],
                    services: [{
                        id: 1,
                        service: null,
                        name: null,
                        images: [{
                            url: null
                        }]
                    }, {
                        id: 2,
                        service: null,
                        name: null,
                        images: [{
                            url: null
                        }]
                    }]
                };
            }
        });
    } else if ($state.current.name === 'adminservicegroup') {
        $scope.switchupdateservicegroup = false;
        if ($stateParams.servicegroupid !== null) {
            $http.get('/api/servicegroups/' + $stateParams.servicegroupid).success(function(servicegroup) {
                $scope.servicegroup = servicegroup;
                $scope.switchupdateservicegroup = true;
            }).catch(function(err) {
                console.log(err);
            });
        } else {
            $scope.switchupdateservicegroup = false;
            $scope.servicegroup = {
                services: [{
                    id: 1,
                    service: null,
                    name: null
                }, {
                    id: 2,
                    service: null,
                    name: null
                }, {
                    id: 3,
                    service: null,
                    name: null
                }, {
                    id: 4,
                    service: null,
                    name: null
                }, {
                    id: 5,
                    service: null,
                    name: null
                }]
            };
        }
    } else if ($state.current.name === 'servicegroup') {
        $http.get('/api/servicegroups/').success(function(servicegroups) {
            $scope.servicegroups = servicegroups;
        })
    }
    var allquoteslocals = {
        TITLE: gettext('All Quotes Received'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('You have received'),
        TEXT2: gettext('quotes for your'),
        TEXT3: gettext('request.'),
        TEXT4: gettext('If you need more information to decide, send message to quoters. You can click the button below to go quote selection page.'),
        TEXT5: gettext('Once you decide,'),
        TEXT5a: gettext('select that quote and make an appointment.'),
        TEXT6: gettext('After you take your service,'),
        TEXT6a: gettext('Write a review for the service you have taken because the world needs your review!'),
        TEXT6b: gettext('Your review helps other consumers and rewards the service providers who has done a good work.'),
        TEXT7: gettext('For your security and satisfaction, we recommend you to make a written aggreement with the service provider and not to pay any amount before the work done.'),
        TEXT8: gettext('If you have any questions, you can reach us from support@posluga.ua.'),
        TEXTBESTREGARDS: gettext('Best Regards'),
        TEXTPOSLUGATEAM: gettext('Posluga.ua Team'),
        QUOTEPAGE: gettext('View Quotes'),
        PHONENOTIFY: gettext('Contact'),
        REQUESTNO: gettext('Request No'),
        DETAILS: gettext('Details'),
        TIME: gettext('Time'),
        PLACE: gettext('Place')
    };
    var loginlocals = {
        TITLE: gettext('Your Login Details'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('Welcome to Posluga.ua. We have created an account for you to check the status of your service requests. Your login details are as follows.'),
        LOGIN: gettext('Login'),
        TEST1X: gettext('Welcome to Posluga.ua. We have created an account for you to give price quotes to the business opportunities we send to you. When you receive a business opportunity email from us, use the below login details to enter the system and give price quotes.'),
        PASSWORD: gettext('Password'),
        TEXT2: gettext('We recommend you to change your password from the settings page. If you do not want to remember it everytime, use Facebook or Vkontakte Login.'),
        LOGINBUTTON: gettext('Go To Settings Page')
    }
    var newquotelocals = {
        TITLE: gettext('You have received a quote'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('Congratulations! You have received a quote for your'),
        TEXT2: gettext('request. If you have any questions, send message to the quoter.'),
        TEXT3: gettext('What should I do?'),
        TEXT4: gettext('Read customer reviews of the quoter, check his profile. If there are other quotes, compare this quote with them. If not, wait for them to come until the quoting closes. If you think this quote is the best, select this quote.'),
        TEXT5: gettext('Best Regards'),
        TEXT6: gettext('Posluga.ua Team'),
        PRICE: gettext('Price'),
        QUOTEPAGE1: gettext('View Quote'),
        TIME: gettext('Time'),
        MESSAGE: gettext('Message to you')
    }
    var newrequestlocals = {
        TITLE: gettext('We have received your request'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('We have received your'),
        TEXT2: gettext('request. You will be receiving price quotes as soon as possible.'),
        PHONENOTIFY: gettext('Contact'),
        REQUESTNO: gettext('Request No'),
        DETAILS: gettext('Details'),
        TIME: gettext('Time'),
        PLACE: gettext('Place'),
        BUDGET: gettext('Budget'),
        TEXT3: gettext('What will happen now?'),
        TEXT4: gettext('We will first review your request. If we have any questions we will ask you by phone or email.'),
        TEXT7: gettext('You will be receiving notifications about price quotes with email and SMS in 24 hours. You can review these quotes in your account page and you can choose the one you prefer.'),
        TEXT8: gettext('Once you choose a quote, we recommend you to make a written aggreement with the firm about the work to be done.'),
        TEXT10: gettext('Best Regards'),
        TEXT11: gettext('Posluga.ua Team'),
        TEXT111: gettext('customer selected a quote for request'),
        LOOKATREQUEST: gettext('Go To Request Page'),
        TEXTBESTREGARDS: gettext('Best Regards'),
        ABOUTM: gettext('about'),
        ABOUTM2: gettext('the customer'),
        NEWMESSAGE: gettext('You have a new message from'),
        TEXTPOSLUGATEAM: gettext('Posluga.ua Team'),
        TERMSTEXT: gettext('Terms'),
        PRIVACYTEXT: gettext('Privacy'),
        UNSUBSCRIBETEXT: gettext('Unsubscribe'),
        CONNECTWITHUS: gettext('Connect with us'),
        CONTACTINFO: gettext('Contact info'),
        EMAIL: gettext('Email'),
        PHONE: gettext('Phone'),
        ASMINHINAME: gettext('created a request. Please login to your admin account to review it.'),
        ADMINGSTEXT1: gettext('customer created a request')
    }
    var opportunitylocals = {
        TITLE: gettext('New Business Opportunity'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('You have a new'),
        TEXT2: gettext('request. When this request reaches maximum quote count it will be closed for new quotes. If you are interested, give a quote now.'),
        PHONENOTIFY: gettext('Contact'),
        REQUESTNO: gettext('Request No'),
        DETAILS: gettext('Details'),
        TIME: gettext('Time'),
        PLACE: gettext('Place'),
        BUDGET: gettext('Budget'),
        GOPAGE: gettext('Go To Quote Page'),
        COMPLETEDQUOTE: gettext('Go to quote page and click the button to confirm that you have completed the service.'),
        TEXT3: gettext('Give a quote for this job now and have a better service profile.'),
        TEXT4: gettext('Give your quote fast. Customers tend to select the quotes that come in 24 hours. Make sure you have added your profile link to your webpage. Make sure you have nice photos and explanations about your services. A better profile leads to more earnings.'),
        TEXT6: gettext('Do you want more business opportunities?'),
        TEXT7: gettext('It is important to win at least 1 of the first 15 quotes you give. The number of job opportunities we send to you will increase as you win. There are many ways to win a business opportunity. Create a complete profile page, reply to business opurtunities on time and give reasonable price quotes.'),
        TEXT8: gettext('How can we give you a better service? Please send your comments to: support@posluga.ua'),
        TEXT9: gettext('Best Regards'),
        TEXT10: gettext('Posluga.ua Team'),
        GIVEQUOTENOW: gettext('There is a new business opportunity, give quote now'),
        LOOKATREQUEST: gettext('Give Quote'),
        CALLED1: gettext('Customer does not want to be called'),
        CALLED2: gettext('You can call the customer')
    }
    var passwordlocals = {
        TITLE: gettext('Password Reset'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('A request has been made to reset your password. You can change your password by clicking this button:'),
        TEXT2: gettext('If you did not request us to reset and email you your password, please email contact@posluga.ua and let us know.'),
        RESETMYPASS: gettext('Reset my Password')
    }
    var profilelocals = {
        MTITLE: gettext('You have a new message'),
        REPLYMESSAGE: gettext('Reply to Message'),
        TITLE: gettext('New Service Profile'),
        TITLEz: gettext('You created a service profile'),
        TEXT1: gettext('Congrats! You have created your'),
        TEXT1a: gettext('profile. As we find eligible customers and business opportunities, we will send you SMS and emails. New customers will come to your feet.'),
        TEXT1x: gettext('When we determine your eligibility for new business opportunities, we look at various success and trust criteria. If you want more business oppurtunities, you can do these things:'),
        TEXT2: gettext('Add your profile link to your webpage'),
        TEXT3: gettext('If you have a website, add the link of your profile to your webpage. When you do it, not only you will get more business oppurtunities but you will also increase your rating in google and yandex searches.'),
        TEXT4: gettext('Win business oppurtunities'),
        TEXT6: gettext('Make your customers happy'),
        TEXT7: gettext('Your customers and the number of job opportunities we send to you will increase as you get 5 star customer reviews. To get more business, do your job best and ask your customers to give you 5 star reviews.'),
        TEXT8: gettext('How can we give you a better service? Please send your comments to: support@posluga.ua'),
        TEXTBESTREGARDS: gettext('Best Regards'),
        TEXTPOSLUGATEAM: gettext('Posluga.ua Team'),
        ADDLINK: gettext('Start by Adding your profile link')
    }
    var selectquotelocals = {
        TITLE: gettext('You have selected a quote'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('Congratulations! you have selected a quote for your'),
        TEXTSELECT: gettext('You have selected a quote for your'),
        TEXT2: gettext('request.'),
        TEXT3: gettext('After you select a quote, we recommend you to'),
        TEXT3a: gettext('decide with the quote owner about the details of the work to be done.'),
        TEXT3b: gettext('Especially for the tasks that are more than 10000 грн., we strongly recommend you to make a written and signed agreement about the details of the work to make it official.'),
        TEXT4: gettext('In addition to that, we recommend you not to pay for the work beforehand. In cases where materials have to be bought or task has been completed partly, we recommend you only to pay for those materials or that part. Especially, if you have selected a service provider with less or no customer reviews, we recommend you to be more careful.'),
        TEXT5: gettext('What will happen now?'),
        TEXT6: gettext('The winning quoter will contact you as soon as possible about the details. You can also contact the quoter.'),
        TEXT7: gettext('Posluga.ua is with you in every step.'),
        TEXT7b: gettext('For any comments or questions please contact us with the email support@posluga.ua or phone 0850 333 22 00'),
        TEXT8: gettext('Do not forget that the quoter has to ensure your satisfaction; because after you take the service, you can write a review on Posluga.ua and this will affect his future business.'),
        TEXT8b: gettext('The power is in you, write a review!'),
        TEXTBESTREGARDS: gettext('Best Regards'),
        TEXTPOSLUGATEAM: gettext('Posluga.ua Team'),
        LOOKATREQUEST: gettext('Go To Request Page'),
        PHONENOTIFY: gettext('Contact'),
        REQUESTNO: gettext('Request No'),
        DETAILS: gettext('Details'),
        TIME: gettext('Time'),
        PLACE: gettext('Place'),
        SMSMESSAGE: gettext('You have received a quote of {{body.price}} for your {{body.service}} service. Look at:')
    }
    var winquotelocals = {
        REQEUSTA: gettext('request'),
        REQEUSTUSERSENT: gettext('User sent a message for the request'),
        TITLE: gettext('You have won a new business'),
        TEXT1: gettext('Congratulations! you have won the'),
        TEXT2: gettext('request you have quoted.'),
        TEXT3a: gettext('Contact the customer and decide about the details of the work to be done.'),
        TEXT3b: gettext('Especially for the tasks that are more than 10000 грн., we strongly recommend you to make a written and signed agreement about the details of the work to make it official.'),
        TEXT4: gettext('When you complete your service, go to the quote page and'),
        TEXT4a: gettext('confirm that you have completed the service - so we will send a notification to customer to write a review.'),
        TEXT4b: gettext('Customer review is critical for your future business in Posluga.ua so we strongly recommend you to provide your best service and ask the customer to write you a good review.'),
        TEXT5: gettext('What should I do now?'),
        TEXT6: gettext('Contact the customer and decide about the details of the work to be done.'),
        TEXT7: gettext('Complete the service and mark that you have given the service.'),
        TEXT8: gettext('Ensure the satisfaction of the customer and ask to write a good review.'),
        TEXT8a: gettext('For any comments or questions please contact us on support@posluga.ua or phone 0850 333 22 00'),
    }
    var writereviewlocals = {
        TITLE: gettext('Write a review to help others'),
        TEXT1: gettext('Your service provider'),
        TEXT2: gettext('notified us that they have completed providing your'),
        TEXT3: gettext('service.'),
        WRITEREVIEW: gettext('Write Review Now'),
        TEXT4: gettext('Write a review for the service you have received, because it will help immensely to other users, to your service provider and to us.'),
        TEXT5: gettext('It takes just 20 seconds to help people. Click the button below to use your power now.'),
        EMAILUSE: gettext('The specified email address is already in use.')
    }
    var welcomelocals = {
        TITLE: gettext('Welcome'),
        HINAME: gettext('Hi'),
        TEXT1: gettext('Welcome to Posluga.ua. Our goal is to make hiring a local service providers simple and efficient. If you want to get some work done around the house, learn something new, stage a great event or need any other of the 100s of services that we offer, then get started here.'),
        TEXT2: gettext('If you have any questions, please email contact@posluga.ua and let us know.'),
        TEXTBESTREGARDS: gettext('Best Regards'),
        TEXTPOSLUGATEAM: gettext('Posluga.ua Team'),
        GETQUOTE: gettext('Get a Free Quote'),
        admintext1: gettext('sent a quote for request'),
        admintext2: gettext('Provider sent a quote to a customer for request'),
        admintext3: gettext('All Quotes Received for request'),
        admintext4: gettext('Go To Request Page'),
        admintext5: gettext('Provider completed giving service. Make sure we get the payment and customer writes a review.'),
        admintext6: gettext('customer created a request, login your account to check it.'),
        admintext7: gettext('User updated a request, login your account to check it.'),
        admintext8: gettext('Customer wrote a review for your service'),
        admintext9: gettext('Your customer'),
        admintext10: gettext('wrote a review for your'),
        admintext11: gettext('You can read your review by clicking on button below'),
        READREVIEW: gettext('Read Review')
    }
    var sms = {
        message1: gettext('New business opportunity!'),
        message2: gettext('A client in {{body.distict}} is looking for {{body.servicetext}} service. Give quote at: '),
        message3: gettext('You have received a quote for your {{servicetext}} service. Look at: '),
        message4: gettext('is the code to complete your verification on Posluga.ua'),
    }
});
// $scope.approvePreproviderBulk = function(id, inside) {
//     $http.get('/api/preproviders/' + id).success(function(preprovider) {
//         var pass = generatePassword();
//         if (preprovider.company == null) {
//             alert(gettext('please fill company name'))
//         } else {
//             $http.post('/api/users', {
//                 name: preprovider.company,
//                 email: (preprovider.email != undefined ? preprovider.email : (createDomainFromUrl(preprovider.website) + '@posluga.ua')),
//                 password: pass,
//                 xp: pass,
//                 language: 'ru',
//                 isprovider: true,
//                 createdbyrequest: true,
//                 stats: {
//                     securitychecks: [{
//                         objectid: 1
//                     }, {
//                         objectid: 2
//                     }]
//                 }
//             }).success(function(usr) {
//                 var successLoaded = false
//                 var providers = []
//                 preprovider.services.forEach(function(service) {
//                     var files = [];
//                     if (service.images !== undefined) {
//                         service.images.forEach(function(image) {
//                             files.push({
//                                 location: image.url
//                             })
//                         })
//                     }
//                     $http.get('/api/services/byruname/' + service.name).success(function(dbservice) {
//                         var provider = {
//                             user: usr.user._id,
//                             service: dbservice,
//                             searchtext: dbservice.subcategory.ru.text,
//                             files: files,
//                             businesstype: $scope.businessTypes[1],
//                             company: ((preprovider.company !== undefined && preprovider.company.length > 2) ? toTitleCase(preprovider.company) : null),
//                             description: preprovider.description,
//                             firstname: null,
//                             lastname: null,
//                             website: preprovider.website,
//                             logo: {
//                                 location: (preprovider.photo !== undefined ? preprovider.photo : null)
//                             },
//                             address: (preprovider.address !== undefined ? preprovider.address : null),
//                             phone: (preprovider.phone !== undefined ? preprovider.phone : null),
//                             landline: preprovider.landline,
//                             phonelist: (preprovider.phonelist !== undefined ? preprovider.phonelist : null),
//                             oblast: preprovider.oblast,
//                             rayon: preprovider.rayon,
//                             gorad: preprovider.gorad,
//                             rayongorad: preprovider.rayongorad,
//                             place: preprovider.placeid,
//                             adminCreated: true,
//                             documents: [],
//                             established: {},
//                             links: [],
//                             quotes: [],
//                             createdby: $scope.currentUser._id,
//                             termsaccepted: true,
//                             stats: {
//                                 securitychecks: [{
//                                     'objectid': 1
//                                 }, {
//                                     'objectid': 2
//                                 }],
//                                 recommended: false,
//                                 totalscore: 80,
//                                 scorefive: '0',
//                                 quotecount: 0,
//                                 quotewincount: 0,
//                                 happycount: 0,
//                                 reviewcount: 0,
//                                 turnover: {
//                                     currency: 'грн.',
//                                     value: 0,
//                                 },
//                                 finishedcount: 0,
//                                 prices: {
//                                     currency: 'грн.',
//                                     lowprice: 0,
//                                     highprice: 0
//                                 },
//                                 priority: {
//                                     initial: 0,
//                                     profilecomplete: 0
//                                 },
//                                 profile: {
//                                     completeness: 70,
//                                     issues: [{
//                                         objectid: 2,
//                                         name: "Add Profile Link to Your Website",
//                                         element: "links"
//                                     }, {
//                                         objectid: 3,
//                                         name: "Add Official Documents",
//                                         element: "documents"
//                                     }, {
//                                         objectid: 4,
//                                         name: "Add Established Date",
//                                         element: "established"
//                                     }]
//                                 }
//                             }
//                         }
//                         providers.push(provider);
//                     })
//                 })
//                 $http.post('/api/providers/bulk', providers).success(function(provider) {
//                     preprovider.created = true;
//                     $http.put('/api/preproviders/' + preprovider._id, preprovider).success(function(preprovider) {
//                         if (successLoaded == false) {
//                             successLoaded = true
//                             toastr.success(gettextCatalog.getString('Successfully created provider'));
//                             $state.go($state.current, {
//                                 type: "approve"
//                             }, {
//                                 reload: true
//                             });
//                         }
//                     });
//                 });
//             });
//         }
//     });
// }