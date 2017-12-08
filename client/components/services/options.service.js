 'use strict';
 angular.module('poslugaApp').factory('OptionsService', ['$filter', '$http', '$rootScope', 'gettext', 'gettextCatalog', '$location', 'urlParser', function($filter, $http, $rootScope, gettext, gettextCatalog, $location, urlParser) {
     var service = {};
     var businessTypes = [{
         'objectid': 1,
         'name': gettextCatalog.getString('Personal')
     }, {
         'objectid': 2,
         'name': gettextCatalog.getString('Company')
     }];
     var profileIssues = [gettextCatalog.getString('Add Profile Images'),
         gettextCatalog.getString('Add Profile Link to Your Website'),
         gettextCatalog.getString('Add Official Documents'),
         gettextCatalog.getString('Add Established Date')
     ];
     var transactionTypes = [{
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
     var documentTypes = [{
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
     var securityTypes = [{
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
     var linkTypes = [{
         'objectid': 1,
         'linktype': 'getquotetext',
         'name': "Получи цены", //gettext('Get My Free Quote'),
         'incominglink': '',
         'outgoinglink': '',
         'image': ''
     }, {
         'objectid': 2,
         'linktype': 'viewprofiletext',
         'name': "Просмотреть мой профиль", //gettext('View My Profile'),
         'incominglink': '',
         'outgoinglink': '',
         'image': ''
     }, {
         'objectid': 3,
         'linktype': 'getquotelinkru',
         'name': 'Получи цены',
         'incominglink': '',
         'outgoinglink': '',
         'image': "https://s3-eu-west-1.amazonaws.com/poslugaua/addlink/poluchitseniru.png"
     }, {
         'objectid': 4,
         'linktype': 'getquotelinkuk',
         'name': 'Отримати ціни',
         'incominglink': '',
         'outgoinglink': '',
         'image': "https://s3-eu-west-1.amazonaws.com/poslugaua/addlink/poluchitseniuk.png"
     }];
     var years = [{
         objectid: 2016,
         name: 2016
     }, {
         objectid: 2015,
         name: 2015
     }, {
         objectid: 2014,
         name: 2014
     }];
     var statusOptions = [{
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
     var cancelOptions = [{
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
     var whenOptionsTr = [{
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
     var whenOptionsProvider = [{
         'objectid': 1,
         'name': gettextCatalog.getString('Specific time')
     }, {
         'objectid': 2,
         'name': gettextCatalog.getString('In 2 months')
     }, {
         'objectid': 3,
         'name': gettextCatalog.getString('In 4 months')
     }];
     var dateOptionsTr = [{
         'objectid': 1,
         'name': gettextCatalog.getString('Today')
     }, {
         'objectid': 2,
         'name': gettextCatalog.getString('Tomorrow')
     }];
     var phoneOptions = [{
         'objectid': 1,
         'name': gettextCatalog.getString('Quoter can call me')
     }, {
         'objectid': 2,
         'name': gettextCatalog.getString('Keep my number secret')
     }];
     var phoneOptionsProvider = [{
         'objectid': 1,
         'name': gettextCatalog.getString('Customer does not want to be called')
     }, {
         'objectid': 2,
         'name': gettextCatalog.getString('You can call the customer')
     }];
     var timeOptions = [{
         'objectid': 1,
         'name': '07:00'
     }, {
         'objectid': 2,
         'name': '07:30'
     }, {
         'objectid': 3,
         'name': '08:00'
     }];
     service.getSubCategories = function() {
         return subcategoryList;
     };
     service.getTransactionTypes = function() {
         return transactionTypes;
     };
     service.getWhenOptions = function() {
         return whenOptionsTr;
     };
     service.getWhenOptionsProvider = function() {
         return whenOptionsProvider;
     };
     service.getDateOptions = function() {
         return dateOptionsTr;
     };
     service.getTimeOptions = function() {
         return timeOptions;
     };
     service.getPhoneOptions = function() {
         return phoneOptions;
     };
     service.getPhoneOptionsProvider = function() {
         return phoneOptionsProvider;
     };
     service.getStatusOptions = function() {
         return statusOptions;
     };
     service.getCancelOptions = function() {
         return cancelOptions;
     };
     service.getQuestions = function(subcategoryId) {
         var questions = ($filter('filter')(questionList, {
             subcategoryId: subcategoryId
         }));
         return (questions.length > 0) ? questions[0].questions : null;
     };
     service.getSubcategoryByName = function(name) {
         var subcategories = ($filter('filter')(subcategoryList, {
             name: name
         }));
         return (subcategories.length > 0) ? subcategories[0].objectid : null;
     };
     service.getBusinessTypes = function() {
         return businessTypes;
     };
     service.getProfileIssues = function() {
         return profileIssues;
     };
     service.getLinkTypes = function(provider, language) {
         linkTypes.forEach(function(link) {
             if (link.linktype === 'getquotetext') {
                 link.outgoinglink = "<a target='_blank' href='" + getDomain() + "/request?providerid=" + provider._id + "&serviceid=" + provider.service._id + "'>" + link.name + " </a>";
             } else if (link.linktype === 'viewprofiletext') {
                 link.outgoinglink = "<a target='_blank' href='" + getDomain() + "/profile/" + setSlugLink(provider.slug, language) + "'>" + link.name + " </a>";
             } else if (link.linktype === 'getquotelinkru') {
                 link.outgoinglink = "<a target='_blank' href='" + getDomain() + "/request?providerid=" + provider._id + "&serviceid=" + provider.service._id + "'>" + "<img src='http://d12gbqriwgmg5d.cloudfront.net/addlink/poluchitseniru.png' " + "alt='" + ((provider.service !== undefined && provider.service !== null) ? $filter('translateFilter')(provider.service.subcategory, language) : provider.searchtext) + ' ' + provider.oblast.ru + ' ' + provider.rayon.ru + ' ' + ((provider.gorad !== undefined && provider.gorad !== null) ? provider.gorad.ru : '') + ' ' + ((provider.rayongorad !== undefined && provider.rayongorad !== null) ? provider.rayongorad.ru : '') + "' border='0'></a>";
             } else if (link.linktype === 'getquotelinkuk') {
                 link.outgoinglink = "<a target='_blank' href='" + getDomain() + "/request?providerid=" + provider._id + "&serviceid=" + provider.service._id + "'>" + "<img src='http://d12gbqriwgmg5d.cloudfront.net/addlink/poluchitseniuk.png' " + "alt='" + ((provider.service !== undefined && provider.service !== null) ? $filter('translateFilter')(provider.service.subcategory, language) : provider.searchtext) + ' ' + provider.oblast.uk + ' ' + provider.rayon.uk + ' ' + ((provider.gorad !== undefined && provider.gorad !== null) ? provider.gorad.uk : '') + ' ' + ((provider.rayongorad !== undefined && provider.rayongorad !== null) ? provider.rayongorad.uk : '') + "' border='0'></a>";
             }
         });
         return linkTypes;
     }

     function setSlugLink(slug, language) {
         if (language === 'uk') {
             return slug.latin.uk;
         } else if (language === 'ru') {
             return slug.latin.ru;
         } else if (language === 'en') {
             return slug.latin.en;
         }
     }

     function getDomain() {
         var a = urlParser.getProtocol($location.absUrl())
         var b = urlParser.getHost($location.absUrl())
         return a + '//' + b
     }
     service.getDocumentTypes = function() {
         return documentTypes;
     };
     service.getPaymentTypes = function() {
         return paymentTypes;
     };
     service.getSecurityTypes = function() {
         return securityTypes;
     };
     service.getYears = function() {
         return years;
     };
     return service;
 }]);