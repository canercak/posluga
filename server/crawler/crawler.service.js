  // 'use strict';
  // require("babel-core/register");
  // process.env.NODE_ENV = 'production'
  // var config = require('../config/environment');
  // var Preprovider = require('../api/preprovider/preprovider.model');
  // var User = require('../api/user/user.model');
  // var Service = require('../api/service/service.model');
  // var Place = require('../api/place/place.model');
  // var NodeGeocoder = require('node-geocoder');
  // var cheerio = require('cheerio');
  // var jschardet = require("jschardet")
  // var iconv = require('iconv-lite');
  // var request = require('request');
  // var encoding = 'windows-1251';
  // var async = require("async");
  // var Nightmare = require('nightmare');
  // var Extractor = require('phone-number-extractor');
  // var _ = require('underscore-node');
  // var fs = require('fs');
  // var util = require('util');
  // var S = require('string');
  // var contactKeys = ['контакты', 'контакт', 'наши контакты'];
  // var hrefContactKeys = ['contact', 'kontakt'];
  // var aboutKeys = ['о нас', 'о компании', 'наши контакты', 'информация о нас'];
  // var hrefAboutKeys = ['about', 'o-nas', 'o_nas', 'about_us', 'about-us', 'o-kompanii', 'o_kompanii', 'kompaniya'];
  // var serviceKeys = ['наши услуги', 'услуги', 'наши контакты', 'все услуги']; //'наши работы',
  // var hrefServiceKeys = ['nashi-uslugi', 'services', 'uslugi', 'vse-uslugi']; //'nashi-raboty',
  // var imageNoKeys = ['facebook', 'twitter', 'google', 'yandex', 'rambler', 'c.hit', 'language', 'instagram', 'vks', 'arrow', 'logo']
  // var MongoClient = require('mongodb').MongoClient;
  // var url = 'mongodb://localhost:27017/posluga-dev';
  // //var kievarray = ["http://cleaning-services.kiev.ua", "http://uborka-premium.kiev.ua", "http://uborka-posle-remonta.kiev.ua", "http://www.galaclean.com.ua", "http://novaclean.kiev.ua", "http://cleaningservice.kiev.ua", "http://www.mister-clin.com.ua", "http://x-clean.com.ua", "http://cleaningstar.com.ua", "http://www.dankeschon.com.ua", "http://himko.com.ua", "http://bleck.kiev.ua", "http://kiev.cleaning", "http://dobrodel.in.ua", "http://zzcleaning.com", "http://armyclean.com.ua", "http://cleanup.kiev.ua", "http://svit-chystoty.ua", "http://www.uborka-kiev.com.ua", "http://kk-zolushka.kiev.ua", "http://cleaningservices.kiev.ua", "http://mister-cleaner.com.ua", "http://www.queen-service.kiev.ua", "http://uborka-center.kiev.ua", "http://technosilaplus.com.ua", "http://www.firmaden.com.ua", "http://i-clean.com.ua", "http://allon-cleaning.kiev.ua", "http://www.clq.com.ua"]
  // var kievarray = ["http://cleaning-services.kiev.ua"]
  // var serviceslinkdata = [];
  // var serviceList = [];
  // var metadata = {};
  // var landinglinkdata = [];
  // //var kievarray = ["http://mister-cleaner.com.ua"]
  // function findEmailInText(text) {
  //     var searchInThisString = text;
  //     var foundEmails = [];
  //     var emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  //     var gotcha;
  //     var match;
  //     while (match = emailRegex.exec(searchInThisString)) {
  //         foundEmails.push(match[0]);
  //         searchInThisString = searchInThisString.replace(match[0], "")
  //     }
  //     return foundEmails;
  // }
  // function validateEmail(email) {
  //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     return re.test(email);
  // }
  // function checkStringContainsArray(string, array) {
  //     var string = string;
  //     var substrings = array;
  //     var length = substrings.length;
  //     var doesContain = false;
  //     while (length--) {
  //         if (string.indexOf(substrings[length]) != -1) {
  //             doesContain = true
  //         }
  //     }
  //     return doesContain
  // }
  // function getHighestOccuringElement(arr) {
  //     return arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
  // }
  // function crawlAboutPage() {
  //     async.each(Object.keys(metadata), function(key, callback) {
  //         var link = metadata[key].aboutlink;
  //         if (!link) {
  //             link = key;
  //         }
  //         var companyRegexHash = [{
  //             exp: "ооо «([^\\s]+.*?)\\»",
  //             startPattern: "ооо ",
  //             endPattern: "»",
  //             confidence: 5
  //         }, {
  //             exp: "ооо ”([^\\s]+.*?)\\”",
  //             startPattern: "ооо ”",
  //             endPattern: "”",
  //             confidence: 5
  //         }, {
  //             exp: 'ооо "(.*?.*)\\"',
  //             startPattern: 'ооо "',
  //             endPattern: '"',
  //             confidence: 5
  //         }, {
  //             exp: "компании «([^\\s]+.*?)\\»",
  //             startPattern: "компании «",
  //             endPattern: "»",
  //             confidence: 5
  //         }, {
  //             exp: "компанию «([^\\s]+.*?)\\»",
  //             startPattern: "компанию «",
  //             endPattern: "»",
  //             confidence: 5
  //         }, {
  //             exp: "компания «([^\\s]+.*?)\\»",
  //             startPattern: "компания «",
  //             endPattern: "»",
  //             confidence: 5
  //         }, {
  //             exp: "компании “(.*?.*)\\”",
  //             startPattern: "компании ”",
  //             endPattern: "”",
  //             confidence: 5
  //         }, {
  //             exp: "компания “(.*?.*)\\”",
  //             startPattern: "компания ”",
  //             endPattern: "”",
  //             confidence: 5
  //         }, {
  //             exp: "компанию “(.*?.*)\\”",
  //             startPattern: "компанию ”",
  //             endPattern: "”",
  //             confidence: 5
  //         }, {
  //             exp: 'компании "(.*?.*)\\"',
  //             startPattern: 'компании "',
  //             endPattern: '"',
  //             confidence: 5
  //         }, {
  //             exp: 'компания "(.*?.*)\\"',
  //             startPattern: 'компания "',
  //             endPattern: '"',
  //             confidence: 5
  //         }, {
  //             exp: 'компанию "(.*?.*)\\"',
  //             startPattern: 'компанию "',
  //             endPattern: '"',
  //             confidence: 5
  //         }, {
  //             exp: "компания\\s+([^\\s]+)",
  //             startPattern: "компания ",
  //             endPattern: "",
  //             confidence: 2
  //         }, {
  //             exp: "компании\\s+([^\\s]+)",
  //             startPattern: "компании ",
  //             endPattern: "",
  //             confidence: 2
  //         }, {
  //             exp: "компанию\\s+([^\\s]+)",
  //             startPattern: "компанию ",
  //             endPattern: "",
  //             confidence: 2
  //         }]
  //         request(link, function(error, response, html) {
  //             if (!error && response.statusCode == 200) {
  //                 var aboutpageEncoding = jschardet.detect(html).encoding;
  //                 if (aboutpageEncoding === 'ascii') {
  //                     request.get({
  //                         url: link,
  //                         encoding: null
  //                     }, function(err, res, body) {
  //                         if (body !== undefined) {
  //                             var asciihtml = iconv.decode(body, 'windows-1251');
  //                             if (!asciihtml.includes("Џ") && !asciihtml.includes("љ") && !asciihtml.includes("µ")) {
  //                                 getCompanyAndDescription(key, asciihtml, companyRegexHash, callback)
  //                             } else {
  //                                 getCompanyAndDescription(key, html, companyRegexHash, callback)
  //                             }
  //                         } else {
  //                             getCompanyAndDescription(key, html, companyRegexHash, callback)
  //                         }
  //                     });
  //                 } else {
  //                     getCompanyAndDescription(key, html, companyRegexHash, callback)
  //                 }
  //             }
  //         })
  //     });
  // }
  // function searchInTagArray(type, array, regexHash, companyname) {
  //     var possibleMatches = [];
  //     array.forEach(function(pt) {
  //         var confidence;
  //         var exitLoop = false;
  //         for (var i in regexHash) {
  //             if (exitLoop === false) {
  //                 var regex = new RegExp(regexHash[i].exp, "g");
  //                 var matched = pt.match(regex);
  //                 confidence = regexHash[i].confidence;
  //                 if (matched !== null && confidence > 3) {
  //                     exitLoop = true;
  //                     var matchedArray = _.uniq(matched)
  //                     matchedArray.forEach(function(m) {
  //                         var company;
  //                         if (regexHash[i].endPattern) {
  //                             company = S(m).between(regexHash[i].startPattern, regexHash[i].endPattern).s
  //                         } else {
  //                             company = S(m).between(regexHash[i].startPattern).s
  //                         }
  //                         if (company !== null) {
  //                             var finalcompanyname = company;
  //                             if (companyname !== undefined) {
  //                                 finalcompanyname = companyname;
  //                             }
  //                             possibleMatches.push({
  //                                 companyname: finalcompanyname,
  //                                 description: pt,
  //                                 confidence: confidence
  //                             })
  //                         }
  //                     })
  //                 } else {
  //                     if (matched !== null) {
  //                         exitLoop = true;
  //                         var matchedArray = _.uniq(matched)
  //                         matchedArray.forEach(function(m) {
  //                             var company;
  //                             if (regexHash[i].endPattern) {
  //                                 company = S(m).between(regexHash[i].startPattern, regexHash[i].endPattern).s
  //                             } else {
  //                                 company = S(m).between(regexHash[i].startPattern).s
  //                             }
  //                             if (company !== null) {
  //                                 var finalcompanyname = company;
  //                                 if (companyname !== undefined) {
  //                                     finalcompanyname = companyname;
  //                                 }
  //                                 possibleMatches.push({
  //                                     companyname: finalcompanyname,
  //                                     description: pt,
  //                                     confidence: confidence
  //                                 })
  //                             }
  //                         })
  //                     }
  //                 }
  //             }
  //         }
  //     })
  //     possibleMatches.forEach(function(match, x) {
  //         if (match.companyname.length > 25) {
  //             possibleMatches.splice(x, 1);
  //         }
  //     })
  //     possibleMatches.sort(function(a, b) {
  //         return b.description.length - a.description.length;
  //     });
  //     var checkHasBetterConfidence = _.some(possibleMatches, function(el) {
  //         return el.confidence > 3;
  //     });
  //     var match;
  //     var stoploop = false;
  //     var foundCorrect = false;
  //     possibleMatches.forEach(function(mtc, i) {
  //         if (stoploop === false) {
  //             if (checkHasBetterConfidence) {
  //                 if (mtc.confidence > 3) {
  //                     match = mtc;
  //                     stoploop = true;
  //                     foundCorrect = true;
  //                 }
  //             } else {
  //                 match = possibleMatches[0];
  //                 var searchArray = [('компания ' + match.companyname), ('компании ' + match.companyname), ('компанию ' + match.companyname)]
  //                 searchArray.forEach(function(element) {
  //                     if (foundCorrect === false) {
  //                         if (match.description.indexOf(element) > -1) {
  //                             stoploop = true;
  //                             foundCorrect = true;
  //                         }
  //                     }
  //                 })
  //             }
  //         }
  //     })
  //     return {
  //         match: match,
  //         foundCorrect: foundCorrect
  //     };
  // }
  // function getCompanyAndDescription(key, html, companyRegexHash, callback) {
  //     var lowercasehtml = html.toLowerCase();
  //     var $ = cheerio.load(lowercasehtml);
  //     var h1Texts = $("h1");
  //     var h1Array = [];
  //     $(h1Texts).each(function(i, h1text) {
  //         h1Array.push($(this).text());
  //     });
  //     var h1Match = searchInTagArray("h1", h1Array, companyRegexHash, undefined);
  //     if (!h1Match.foundCorrect) {
  //         var lowercasehtml = html.toLowerCase();
  //         var $ = cheerio.load(lowercasehtml);
  //         var h2Texts = $("h2");
  //         var h2Array = [];
  //         $(h2Texts).each(function(i, h2text) {
  //             h2Array.push($(this).text());
  //         });
  //         var h2Match = searchInTagArray("h2", h2Array, companyRegexHash, undefined);
  //         if (!h2Match.foundCorrect) {
  //             var lowercasehtml = html.toLowerCase();
  //             var $ = cheerio.load(lowercasehtml);
  //             var h3Texts = $("h3");
  //             var h3Array = [];
  //             $(h3Texts).each(function(i, h3text) {
  //                 h3Array.push($(this).text());
  //             });
  //             var h3Match = searchInTagArray("h3", h3Array, companyRegexHash, undefined);
  //             if (!h3Match.foundCorrect) {
  //                 var pTexts = $("p");
  //                 var pArray = [];
  //                 $(pTexts).each(function(i, ptext) {
  //                     pArray.push($(this).text());
  //                 });
  //                 var pMatch = searchInTagArray("p", pArray, companyRegexHash, undefined);
  //                 writeCompanyData(key, pMatch.match, callback);
  //             } else {
  //                 var pTexts = $("p");
  //                 var pArray = [];
  //                 $(pTexts).each(function(i, ptext) {
  //                     pArray.push($(this).text());
  //                 });
  //                 var pMatch = searchInTagArray("p", pArray, companyRegexHash, h3Match.match.companyname);
  //                 writeCompanyData(key, pMatch.match, callback);
  //             }
  //         } else {
  //             var pTexts = $("p");
  //             var pArray = [];
  //             $(pTexts).each(function(i, ptext) {
  //                 pArray.push($(this).text());
  //             });
  //             var pMatch = searchInTagArray("p", pArray, companyRegexHash, h2Match.match.companyname);
  //             writeCompanyData(key, pMatch.match, callback);
  //         }
  //     } else {
  //         var pTexts = $("p");
  //         var pArray = [];
  //         $(pTexts).each(function(i, ptext) {
  //             pArray.push($(this).text());
  //         });
  //         var pMatch = searchInTagArray("p", pArray, companyRegexHash, h1Match.match.companyname);
  //         writeCompanyData(key, pMatch.match, callback);
  //     }
  // }
  // function writeCompanyData(key, match, callback) {
  //     metadata[key]['companyname'] = match.companyname;
  //     metadata[key]['description'] = match.description;
  //     metadata[key]['confidence'] += match.confidence;
  //     writemetadata(key);
  //     callback();
  // }
  // function writeServiceData(key, matches, callback) {
  //     metadata[key]['services'] = matches;
  //     writemetadata(key);
  //     callback();
  // }
  // function crawlContactPage() {
  //     async.each(Object.keys(metadata), function(key, callbackAfterEach) {
  //         var link = metadata[key].contactlink;
  //         request(link, function(error, response, html) {
  //             if (!error && response.statusCode == 200) {
  //                 var contactpageEncoding = jschardet.detect(html).encoding;
  //                 var lowercasehtml = html.toLowerCase();
  //                 var $ = cheerio.load(lowercasehtml);
  //                 var text = $('*:contains("@")').text().replace(/\s/g, " ")
  //                 var foundemails = findEmailInText(text);
  //                 metadata[key]['email'] = "";
  //                 if (foundemails.length > 0) {
  //                     if (validateEmail(foundemails[0])) {
  //                         metadata[key]['email'] = foundemails[0];
  //                     }
  //                 }
  //                 if (metadata[key]['email'] === "") {
  //                     var x = Date.now();
  //                     var nightmare = Nightmare();
  //                     nightmare.goto(link).evaluate(function() {
  //                         return document.getElementsByTagName('html')[0].innerHTML;
  //                     }).then(function(html1) {
  //                         var lowercasehtml = html1.toLowerCase();
  //                         var $ = cheerio.load(lowercasehtml);
  //                         var foundemails = findEmailInText(text);
  //                         if (foundemails.length > 0) {
  //                             if (validateEmail(foundemails[0])) {
  //                                 metadata[key]['email'] = foundemails[0];
  //                             }
  //                         }
  //                         return nightmare.end();
  //                     }).then(function(result) {
  //                         findaddress($, key, contactpageEncoding);
  //                         callbackAfterEach();
  //                     }, function(err) {
  //                         console.error(err);
  //                     });
  //                 } else {
  //                     findaddress($, key, contactpageEncoding);
  //                     callbackAfterEach();
  //                 }
  //             }
  //         })
  //     });
  // }
  // function findmobilephone($, key) {
  //     var foundPhones = []
  //     var phoneRegexArray = ["\\([0-9]+\\) [0-9]+-[0-9]+-[0-9]+", //(066) 081-27-37
  //         "\\([0-9]+\\) [0-9]+ [0-9]+", //(044) 5000 400
  //         "\\([0-9]+\\) [0-9]+ [0-9]+ [0-9]+", //(099) 647 63 33
  //         "\\([0-9]+\\)[0-9]+-[0-9]+-[0-9]+", //(044)338-97-92
  //         "[0-9]+-[0-9]+-[0-9]+-[0-9]+|\\+[0-9]+ [0-9]+ [0-9]+ [0-9]+-[0-9]+-[0-9]+", //+3 8 044 222-3-222"
  //         "\\+[0-9]+ \\([0-9]+\\) [0-9]+-[0-9]+-[0-9]+", //+38 (093) 351-7-700
  //         "\\+[0-9]+ \\([0-9]+\\) [0-9]+ [0-9]+", //+38 (044) 223 4107
  //         "\\+[0-9]+ \\([0-9]+\\)[0-9]+-[0-9]+", //+38 (093)110-0903
  //         "\\+[0-9]+ [0-9]+ [0-9]+-[0-9]+-[0-9]+", //+38 044 338-59-38
  //         "\\+[0-9]+ \\([0-9]+\\) [0-9]+ [0-9]+", "[0-9]+-[0-9]+-[0-9]+-[0-9]+|\\+[0-9]+ [0-9]+ [0-9]+ [0-9]+-[0-9]+-[0-9]+" //+3 8 044 222-3-222
  //     ]
  //     var text = $('*:contains(" ")').text().replace(/\s/g, " ")
  //     phoneRegexArray.forEach(function(exp, i) {
  //         var regex = new RegExp(exp, "g");
  //         var res = text.match(regex);
  //         if (res !== null) {
  //             foundPhones = foundPhones.concat(_.uniq(res));
  //         }
  //     })
  //     metadata[key]['phones'] = _.uniq(foundPhones);
  // }
  // function findaddress($, key, encoding) {
  //     if (encoding === 'ascii') {
  //         request.get({
  //             url: metadata[key].contactlink,
  //             encoding: null
  //         }, function(err, res, body) {
  //             if (body !== undefined) {
  //                 var html = iconv.decode(body, 'windows-1251');
  //                 var lowercasehtml = html.toLowerCase();
  //                 var $ = cheerio.load(lowercasehtml);
  //                 findAddressText($, key);
  //             } else {
  //                 findAddressText($, key);
  //             }
  //         });
  //     } else {
  //         findAddressText($, key);
  //     }
  // }
  // function findAddressText($, key) {
  //     var addresskeys = ['ул.', 'пр.', 'проспект', 'д.', 'г.', 'корпус', 'улица', 'этаж', 'вул.', 'вулиця', 'бульвар'];
  //     var matchedarray = [];
  //     addresskeys.forEach(function(key) {
  //         var text = $('*:contains("' + key + '")').text();
  //         var string = S(text).strip(' ').s;
  //         if (string !== '') {
  //             var regex = new RegExp(".*" + key + ".*", "g");
  //             if (key.indexOf('.') > -1) {
  //                 var x = S(key).strip('.').s;
  //                 regex = new RegExp(".*" + x + "\\..*", "g");
  //             }
  //             var res = text.match(regex);
  //             if (res.length > 0) {
  //                 var result = _.uniq(res)[0]
  //                 result = S(result).stripTags().s;
  //                 result = S(result).humanize().s;
  //                 var ext = S(result).between('(', ')').s;
  //                 var striptxt = '(' + ext + ')';
  //                 result = S(result).strip(striptxt).s;
  //                 matchedarray.push(result)
  //             }
  //         }
  //     });
  //     var matchedarray = _.uniq(matchedarray);
  //     var address = matchedarray[0].trim();
  //     metadata[key]['address'] = address
  //     var optionsGoogle = {
  //         provider: 'google',
  //         language: 'ru',
  //         apiKey: 'AIzaSyAvgmwG0Ko5D1mxYMHz_3ti06EQnHnp6Ek',
  //     };
  //     var optionsYandex = {
  //         provider: 'yandex',
  //         language: 'ru'
  //     };
  //     var newAddress = address + ' Киев ' + 'Украина';
  //     var geocoder = NodeGeocoder(optionsGoogle);
  //     geocoder.geocode(newAddress).then(function(res) {
  //         metadata[key]['geocodedAddress'] = res;
  //         findmobilephone($, key);
  //         writemetadata(key);
  //     }).catch(function(err) {
  //         metadata[key]['geocodedAddress'] = 'error';
  //         findmobilephone($, key);
  //         writemetadata(key);
  //     });
  // }
  // function writemetadata(key) {
  //     var object = util.inspect(metadata[key], {
  //         showHidden: false,
  //         depth: 4
  //     });
  //     fs.appendFile("metadata.js", object, function(err) {
  //         if (err) {
  //             return console.log(err);
  //         }
  //     });
  // }
  // /////////////////////////////
  // /////////////////////////////
  // function findServiceLinks(key, findServiceLinksCallback) {
  //     async.forEach(serviceslinkdata, function(data, callback) {
  //         if (data.name !== null && data.name.length > 2) {
  //             var doesContainServiceLink = false;
  //             if (serviceKeys.indexOf(data.name) > -1) {
  //                 doesContainServiceLink = true
  //             } else {
  //                 if (data.href !== null && data.href.indexOf('#') === -1 && checkStringContainsArray(data.href, hrefServiceKeys)) {
  //                     doesContainServiceLink = true;
  //                 }
  //             }
  //             if (doesContainServiceLink) {
  //                 var link = data.href;
  //                 if (link.indexOf('://') === -1) {
  //                     if (link.charAt(0) === '/') {
  //                         link = key + link;
  //                     } else {
  //                         link = key + '/' + link;
  //                     }
  //                 }
  //                 var sdata = {
  //                     name: data.name,
  //                     link: link
  //                 }
  //                 var checkLinkExists = metadata[key]['servicepagelinks'].some(function(el) {
  //                     return el.name === data.name;
  //                 });
  //                 if (!checkLinkExists) {
  //                     metadata[key]['servicepagelinks'].push(sdata);
  //                 }
  //             }
  //             searchInServiceList(data.name, data.href, key, callback); // gets the links to services
  //         } else {
  //             callback();
  //         }
  //     }, function(err) {
  //         fs.writeFile('metadata.js', util.inspect(metadata, {
  //             depth: 4
  //         }), function(err) {
  //             if (err) return findServiceLinksCallback(error);
  //             findServiceLinksCallback(null);
  //         })
  //     });
  // }
  // function scrapeServiceDetailPage(scrapeServiceDetailPageCallback) {
  //     Object.keys(metadata).forEach(function(key) {
  //         async.each(metadata[key].services, function(obj, callback) {
  //             var link = obj.matchedhref;
  //             request(link, function(error, response, html) {
  //                 if (!error && response.statusCode == 200) {
  //                     var servicedetailpageEncoding = jschardet.detect(html).encoding;
  //                     if (servicedetailpageEncoding === 'ascii') {
  //                         request.get({
  //                             url: link,
  //                             encoding: null
  //                         }, function(err, res, body) {
  //                             if (body !== undefined) {
  //                                 var asciihtml = iconv.decode(body, 'windows-1251');
  //                                 if (!asciihtml.includes("Џ") && !asciihtml.includes("љ") && !asciihtml.includes("µ")) {
  //                                     getImagesFromServiceDetailPage(link, asciihtml, obj, key, callback);
  //                                 } else {
  //                                     getImagesFromServiceDetailPage(link, html, obj, key, callback);
  //                                 }
  //                             } else {
  //                                 getImagesFromServiceDetailPage(link, html, obj, key, callback);
  //                             }
  //                         });
  //                     } else {
  //                         getImagesFromServiceDetailPage(link, html, obj, key, callback);
  //                     }
  //                 }
  //             })
  //         })
  //     });
  //     scrapeServiceDetailPageCallback(null);
  // }
  // function getImagesFromServiceDetailPage(link, html, obj, key, callbackFinal) {
  //     if (obj.matchedimages === undefined) {
  //         obj.matchedimages = [];
  //     }
  //     var lowercasehtml = html.toLowerCase();
  //     var $ = cheerio.load(lowercasehtml);
  //     var imgTexts = $("img");
  //     var imgArray = [];
  //     async.each($(imgTexts), function(img, callback) {
  //         obj.matchedimages.push(img.attribs.src);
  //         callback();
  //     }, function(err) {
  //         callbackFinal();
  //     });
  // }
  // function startCrawling(preprovider) {
  //     async.waterfall([
  //         collectLandingEncodings(preprovider.website),
  //         encodePages
  //         // crawlLandingLinks,
  //         // analyzeLandingLinks,
  //         // scrapeServicePage,
  //         // findServiceLinks,
  //         // scrapeServiceDetailPage
  //     ], function(error) {
  //         if (error) {
  //             console.log(error)
  //         }
  //         fs.writeFile('metadata.js', util.inspect(metadata, {
  //             depth: 4
  //         }), function(err) {
  //             if (err) return scrapeServiceDetailPageCallback(error);
  //         });
  //     });
  // }
  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////