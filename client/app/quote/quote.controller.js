  angular.module('poslugaApp').controller('QuoteCtrl', function(angularLoad, MetatagService, $filter, $controller, bootstrap3ElementModifier, $state, ngXml2json, $uibModal, Upload, $scope, $http, socket, $stateParams, OptionsService, $location, Auth, $uibPosition, $sce, gettext, gettextCatalog) {
      bootstrap3ElementModifier.enableValidationStateIcons(true);
      MetatagService.setMetaTags("Posluga.ua", 'Posluga.ua', 'Posluga.ua', "", true);
      $controller('RequestCtrl', {
          $scope: $scope
      })
      $scope.securityTypes = [];
      $scope.whenOptions = [];
      $scope.whenOptionsProvider = [];
      $scope.phoneOptions = [];
      $scope.phoneOptionsProvider = [];
      $scope.statusOptions = [];
      $scope.cancelOptions = [];

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
          $scope.profileIssues = [gettextCatalog.getString('Add Profile Images'),
              gettextCatalog.getString('Add Profile Link to Your Website'),
              gettextCatalog.getString('Add Official Documents'),
              gettextCatalog.getString('Add Established Date')
          ];
      }
      $scope.showWhenPanel = false;
      $scope.switchupdatequote = false;
      $scope.newmessage = undefined;
      $scope.customersrequest = false;
      $scope.providersquote = false;
      $scope.providerwon = false;
      $scope.readonlycomment = false;
      $scope.showreview = true;
      $scope.relatedprovider = undefined;
      $scope.quote = {
          latestevent: "givequote",
          price: {
              value: null,
              currency: 'грн.'
          },
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
      $scope.otherquotes = [];
      $scope.request = {};
      $scope.count = 0;
      $scope.selectedQuote = '';
      $scope.initialmessage = '';
      $scope.status = 'allworks';
      var bookmark;
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
      $scope.$watch('languageKey', function(newValue, oldValue) {
          if (angular.equals(newValue, oldValue)) {
              console.log("changedd111")
              return;
          }
      }, true);
      $scope.changeListing = function() {
          var order = '';
          var sort = '';
          if ($scope.query.order.indexOf('-') > -1) {
              sort = 'asc';
              order = $scope.query.order.replace('-', '');
          } else {
              sort = 'desc';
              order = $scope.query.order;
          }
          $http.get('/api/requests/userproviders/' + $scope.currentUser._id + '?status=' + $scope.status + '&filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).success(function(requeststoquote) {
              $scope.requeststoquote = requeststoquote.results;
              $http.get('/api/providers/user/' + $scope.currentUser._id).success(function(providers) {
                  $scope.userproviders = providers;
                  if ($scope.status !== 'allworks' || $scope.status !== 'oldquoted') {
                      var requeststoremove = [];
                      $scope.requeststoquote.forEach(function(req, index) {
                          $scope.userproviders.forEach(function(usrp) {
                              if (req.quotes.length !== 0) {
                                  req.quotes.forEach(function(quote) {
                                      if (quote.selected === true) {
                                          if (quote.provider._id === usrp._id) {
                                              if (quote.selected === false) {
                                                  requeststoremove.push(index);
                                              }
                                          }
                                      }
                                  })
                              }
                          });
                      });
                      requeststoremove.forEach(function(index) {
                          $scope.requeststoquote.splice(index, 1);
                      })
                  }
                  $scope.requeststoquote.forEach(function(req) {
                      var stoprecurring = false;
                      $scope.userproviders.forEach(function(usrp) {
                          if (stoprecurring === false) {
                              if (req.quotes.length !== 0) {
                                  var returndata = {
                                      id: undefined,
                                      result: false,
                                      selected: false,
                                      selectedquote: null,
                                      providerselected: false
                                  }
                                  req.quotes.forEach(function(quote) {
                                      if (quote.provider._id === usrp._id) {
                                          returndata["result"] = true;
                                          returndata["id"] = quote._id;
                                          returndata["providerselected"] = quote.selected;
                                          returndata['selectedquote'] = quote;
                                          stoprecurring = true;
                                      }
                                      if (quote.selected) {
                                          returndata["selected"] = true
                                      }
                                  })
                                  req.providerquoted = returndata
                              } else {
                                  req.providerquoted = {
                                      id: undefined,
                                      result: false,
                                      selected: false,
                                      selectedquote: null
                                  };
                              }
                              setProfileCompleteness(usrp);
                              if (req.potentialproviders.indexOf(usrp._id) > -1) {
                                  req.providerid = usrp._id;
                              }
                          }
                      });
                  });
              });
          });
      };

      function setProfileCompleteness(usrp) {
          var complete = usrp.stats.priority.profilecomplete;
          var initial = usrp.stats.priority.initial;
          usrp.servicegiven = (usrp.service === undefined ? usrp.searchtext : $filter('translateFilter')(usrp.service.subcategory, $scope.languageKey));
          if ((complete === initial) && complete !== 100) {
              usrp.rankingtext = gettextCatalog.getString('Complete below issues in your profile to get better results.');
          } else if ((complete !== initial) && complete !== 100) {
              usrp.rankingtext = gettextCatalog.getString('You can get to ' + usrp.stats.priority.profilecomplete + ' just by completing below issues in your profile. Giving quotes will increase your priority too.');
          } else if (complete === 100) {
              usrp.rankingtext = gettextCatalog.getString('Your profile is complete. Give quotes and win them to increase your priority.');
          }
      }
      $scope.deleteFile = function(idx) {
          $scope.quote.comment.files.splice(idx, 1);
          $http.put('/api/requests/' + $scope.quote._id, $scope.quote).success(function(quote) {
              $scope.quote = quote;
          });
      };
      $scope.removeFilter = function() {
          $scope.filter.show = false;
          $scope.query.filter = '';
          if ($scope.filter.form.$dirty) {
              $scope.filter.form.$setPristine();
          }
      };
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

      function getRequests() {
          $scope.deferred = $scope.changeListing();
      }

      function checkquoteclosed() {
          $scope.requestclosed = $scope.request.requestclosed;
      }
      if ($scope.state === 'viewquotes') {
          updateOptions();
          $http.get('/api/requests/' + $stateParams.requestid).success(function(request) {
              $scope.request = request;
              $scope.providersquote = false;
              if ($scope.request.user._id === $scope.currentUser._id) {
                  $scope.customersrequest = true;
              } else {
                  $state.go('main')
              }
          });
      } else if ($scope.state === 'myquotes') {
          updateOptions();
          $scope.profileIssues = [gettextCatalog.getString('Add Profile Images'),
              gettextCatalog.getString('Add Profile Link to Your Website'),
              gettextCatalog.getString('Add Official Documents'),
              gettextCatalog.getString('Add Established Date')
          ];
          $scope.changeListing();
      } else if ($scope.state === 'givequote') {
          updateOptions();
          $http.get('/api/requests/' + $stateParams.requestid).success(function(request) {
              $scope.request = request;
              var potentialprovider = false;
              checkquoteclosed();
              $http.get('/api/providers/findexistinguser/' + request._id + '/' + $scope.currentUser._id).success(function(result) {
                  if (result === true) {
                      jQuery.datetimepicker.setLocale($scope.languageKey);
                      jQuery('#datetimepicker').keypress(function(event) {
                          event.preventDefault();
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
                      $http.get('/api/quotes/otherquotes/' + $stateParams.requestid + '/' + $stateParams.providerid).success(function(otherquotes) {
                          $scope.otherquotes = otherquotes;
                          $scope.relatedprovider = $stateParams.providerid;
                          if ($stateParams.id) {
                              $scope.switchupdatequote = true;
                              $http.get('/api/quotes/' + $stateParams.id).success(function(quote) {
                                  $scope.quote = quote;
                                  $scope.applyWhenOptions(quote.when);
                                  // $scope.quote.price.value = ($scope.quote.price.value / 100);
                                  $scope.quote.price.value = $scope.quote.price.value;
                                  $scope.setCommissionlabel($scope.quote.price.value);
                              });
                          }
                      });
                  } else {
                      $state.go('/')
                  }
              })
          });
      } else if ($scope.state === 'quotedetail') {
          updateOptions();
          $http.get('/api/quotes/' + $stateParams.id).success(function(quote) {
              $scope.quote = quote;
              $http.get('/api/requests/' + quote.request._id).success(function(request) {
                  $scope.request = request;
                  $scope.request.providerwon = false;
                  if ($scope.request.user._id === $scope.currentUser._id) {
                      $scope.customersrequest = true;
                  }
                  $http.get('/api/providers/user/' + $scope.currentUser._id).success(function(providers) {
                      if (providers.length > 0) {
                          providers.forEach(function(usrp) {
                              if ($scope.request.quotes.length !== 0) {
                                  $scope.request.quotes.forEach(function(quote) {
                                      if (quote.provider._id === usrp._id) {
                                          if (quote.selected === true) {
                                              $scope.request.providerwon = true;
                                          }
                                          $scope.providersquote = true;
                                      }
                                  })
                              }
                          });
                      }
                      $http.get('/api/quotes/otherquotes/' + $scope.request._id + '/' + $scope.quote.provider._id).success(function(otherquotes) {
                          $scope.otherquotes = otherquotes;
                          if ($stateParams.type === 'new') {
                              $scope.switchupdatequote = false;
                          } else {
                              $scope.switchupdatequote = true
                          }
                      });
                  })
              });
          });
      } else if ($scope.state === 'quotesuccess') {
          updateOptions();
          $http.get('/api/quotes/' + $stateParams.id).success(function(quote) {
              $scope.quote = quote;
              $scope.request = quote.request;
              if (($scope.quote.date && ($scope.quote.date < moment().tz('Europe/Kiev'))) ||  $scope.quote.when.objectid === 2 ||  $scope.quote.when.objectid === 3) {
                  $scope.showreview = true;
              } else {
                  $scope.showreview = false;
              }
              $scope.message = "";
              if ($stateParams.type === 'new') {
                  $scope.switchupdatequote = false;
              } else {
                  $scope.switchupdatequote = true
              }
              $http.get('/api/providers/user/' + $scope.currentUser._id).success(function(providers) {
                  if (providers.length > 0) {
                      providers.forEach(function(usrp) {
                          if ($scope.quote.provider._id === usrp._id) {
                              if (quote.selected === true) {
                                  $scope.request.providerwon = true;
                              }
                              $scope.providersquote = true;
                          }
                      });
                  }
                  if ($scope.request.user._id === $scope.currentUser._id) {
                      $scope.customersrequest = true;
                  }
                  if (!$scope.providersquote && !$scope.customersrequest) {
                      $state.go('/');
                  }
              });
          });
      } else if ($scope.state === 'comment') {
          updateOptions();
          $http.get('/api/quotes/' + $stateParams.id).success(function(quote) {
              $scope.quote = quote;
              $scope.request = quote.request;
              if ($scope.quote.request.user._id !== $scope.currentUser._id) {
                  $scope.readonlycomment = true
              }
          });
      } else {
          updateOptions();
      }
      $scope.applyWhenOptions = function(item) {
          if (item.objectid === 1) {
              $scope.showWhenPanel = true;
          } else {
              $scope.showWhenPanel = false;
          }
      };

      function addChatMessage(quote) {
          var message = document.getElementById('messagex' + quote._id).value
          document.getElementById('messagex' + quote._id).value = ''
          quote.chat.push({
              id: quote.chat.length + 1,
              message: message,
              notsaved: true,
              sentAt: moment().tz('Europe/Kiev'),
              sendertype: $scope.request.user._id === $scope.currentUser._id ? 'user' : 'provider',
              sender: $scope.currentUser._id
          });
          return quote;
      }
      $scope.createChatMessage = function(quote) {
          var xquote = addChatMessage(quote);
          $scope.updateQuote("addchatmessage", xquote);
      }
      $scope.openQuoteSelectModal = function(quoteid) {
          $scope.selectedQuote = quoteid;
          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'quoteModalContent.html',
              controller: 'QuoteModalCtrl',
              scope: $scope,
              resolve: {
                  request: function() {
                      return $scope.request;
                  }
              }
          });
          modalInstance.result.then(function() {
              $http.get('/api/quotes/' + $scope.selectedQuote).success(function(q) {
                  $scope.updateQuote("selectquote", q);
              })
          }, function() {});
      };
      $scope.doNoting = function() {}
      $scope.createQuote = function() {
          $scope.quote.provider = $stateParams.providerid;
          $scope.quote.request = $scope.request._id;
          //var newQuote = quoteWithPriceAndComm();
          $scope.quote.chat.push({
              id: $scope.quote.chat.length + 1,
              message: $scope.initialmessage,
              sentAt: moment().tz('Europe/Kiev'),
              sendertype: 'provider',
              sender: $scope.currentUser._id
          })
          $http.post('/api/quotes/', $scope.quote).success(function(quote) {
              $state.go('quotedetail', {
                  id: quote._id,
                  type: 'new'
              });
          }).catch(function(err) {
              console.log('error in post /api/quotes : ' + err);
          });
      };
      $scope.updateQuote = function(event, quote) {
          var returnstate = undefined
          if (event === "givequote") {
              returnstate = "quotedetail"
              $scope.quote.latestevent = "givequote";
          } else if (event === "selectquote") {
              $scope.quote = quote;
              $scope.quote.latestevent = "selectquote";
              returnstate = "quotesuccessnew"
          } else if (event === "addchatmessage") {
              $scope.quote = quote;
              $scope.quote.latestevent = "addchatmessage";
              returnstate = "addchatmessage"
          } else if (event === "providercompletequote") {
              $scope.quote.latestevent = "providercompletequote";
              returnstate = "servicesuccess"
          } else if (event === "userreview") {
              if ($scope.quote.servicecomplete === false) {
                  $scope.quote.latestevent = "userreviewcompletequote";
              } else {
                  $scope.quote.latestevent = "userreviewquote";
              }
              returnstate = "commentsuccess"
          } else if (event === "updateuserreview") {
              returnstate = "commentsuccess";
              $scope.quote.latestevent = "updateuserreviewquote";
          }
          $http.put('/api/quotes/' + $scope.quote._id, $scope.quote).success(function(quote) {
              if (returnstate === "quotesuccessupdate") {
                  $state.go('quotesuccess', {
                      id: quote._id,
                      type: 'update'
                  });
              } else if (returnstate === "addchatmessage") {
                  if ($scope.state === 'viewquotes') {
                      $http.get('/api/requests/' + $scope.request._id).success(function(request) {
                          $scope.request = request;
                          $scope.request.quotes.forEach(function(q, index) {
                              if (q._id === quote._id) {
                                  q.chat = quote.chat;
                              }
                          })
                          // $state.go($state.current, {}, {
                          //     reload: true
                          // });
                      })
                  } else {
                      $scope.quote = quote;
                      $scope.newmessage = "";
                      // $state.go($state.current, {}, {
                      //     reload: true
                      // });
                  }
              } else if (returnstate === "quotesuccessnew") {
                  $state.go('quotesuccess', {
                      id: quote._id,
                      type: 'new'
                  });
              } else if (returnstate === "quotedetail") {
                  $state.go('quotedetail', {
                      id: quote._id,
                      type: 'update'
                  });
              } else if (returnstate === "servicesuccess") {
                  angularLoad.loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-585f468486e95396');
                  $state.go('servicesuccess', {
                      id: quote._id
                  });
              } else if (returnstate === "commentsuccess") {
                  angularLoad.loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-585f468486e95396');
                  $state.go('commentsuccess', {
                      id: quote._id
                  });
              }
          }).catch(function(err) {
              console.log('error in put /api/quotes : ' + err);
          });
      };
      // function quoteWithPriceAndComm() {
      //     var newquote = $.extend(true, {}, $scope.quote);
      //     // var priceincents = parseInt(newquote.price.value * 100)
      //     var priceincents = parseInt(newquote.price.value);
      //     newquote.commission.value = priceincents * 5 / 100;
      //     newquote.commission.providervalue = priceincents - newquote.commission.value;
      //     newquote.price.value = priceincents;
      //     newquote.comment.paid.value = priceincents
      //     return newquote;
      // }
      function calculateProvideprofiles() {
          $scope.currentUser.providers
      }
      $scope.addComment = function() {
          if ($scope.quote.comment.rating !== undefined) {
              if ($scope.readonlycomment === false) {
                  if ($stateParams.type !== 'edit') {
                      $scope.updateQuote('userreview', $scope.quote)
                  } else {
                      $scope.updateQuote('updateuserreview', $scope.quote)
                  }
              }
          } else {
              alert(gettextCatalog.getString("Please give a star rating for this service."));
          }
      }
      $scope.setCommissionlabel = function(data) {
          $http.get('/api/providers/' + $stateParams.providerid).success(function(provider) {
              $scope.provider = provider;
              if (data === 0 || data === '' || data === undefined) {
                  var givebest = gettextCatalog.getString('Give the best price offer you can with the information user provided.')
                  if ($scope.provider.hasincominglink) {
                      $scope.commissionLabel = givebest + ' ' + gettextCatalog.getString('If the user accepts your quote, you will pay %9 commission to us.');
                  } else {
                      $scope.commissionLabel = givebest + ' ' + gettextCatalog.getString('If the user accepts your quote, you will pay %10 commission to us.');
                  }
              } else {
                  var count = parseInt(data);
                  if ($scope.provider.hasincominglink) {
                      $scope.quote.commission.percentage = 9;
                      $scope.quote.commission.providerpercentage = 91;
                  } else {
                      $scope.quote.commission.percentage = 10;
                      $scope.quote.commission.providerpercentage = 90;
                  }
                  var commission = ((count * $scope.quote.commission.percentage) / 100);
                  var priceleft = (count - commission);
                  $scope.commissionLabel = gettextCatalog.getString('If the user accepts your quote, you will pay us') + ' ' + String(commission) + ' ' + 'грн ' + '(%' + $scope.quote.commission.percentage + ').' + ' ' + gettextCatalog.getString('You will earn') + ' ' + String(priceleft) + ' ' + $scope.quote.commission.currency;
                  $scope.quote.commission.value = commission;
                  $scope.quote.commission.providervalue = priceleft;
                  $scope.quote.comment.paid.value = $scope.quote.price.value;
              }
          })
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
                              $scope.quote.comment.files.push(parsedData);
                          } else { //alert('Upload Failed');
                          }
                      }, null, function(evt) {
                          file.progress = parseInt(100.0 * evt.loaded / evt.total);
                      });
                  });
              }(file, i));
          }
      };
      $scope.$on('$destroy', function() {
          socket.unsyncUpdates('quote');
      });
      $scope.$on('$save', function() {
          socket.syncUpdates('quote', $scope.homerooms);
      });
  });
  angular.module('poslugaApp').controller('QuoteModalCtrl', function($scope, MetatagService, $uibModalInstance, request, $http) {
      $scope.request = request;
      $scope.updateQuoteRequest = function(quoterequest) {
          $http.put('/api/requests/' + quoterequest._id, quoterequest).success(function(request) {
              $scope.request = request;
              $uibModalInstance.close('success');
          });
      };
      $scope.cancel = function() {
          $uibModalInstance.dismiss('cancel');
      };
  });