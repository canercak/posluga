// var support = require('./support');
// var config = browser.params;
// var async = require('async');
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var expect = chai.expect;
// var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');
// var ProviderModel = require(config.serverConfig.root + '/server/api/provider/provider.model');
// var moment = require('moment-timezone');
// var testUser = {
//     email: 'canercak@gmail.com',
//     password: '123456',
//     confirmPassword: '123456'
// };
// function createPro(user_id) {
//     var testProvider = {
//         firstname: "Alan",
//         lastname: "Carr",
//         phone: "5323223213",
//         address: "21th Madaline Way, Astoria New York",
//         logo: {
//             location: 'http://www.nationwidecleaningservicesinc.com/wp-content/uploads/2013/10/sidebar_cleaning_man.png'
//         },
//         searchtext: "Ev Temizliği",
//         description: "With over 12 years of experience, Rain or Shine is a local, family-owned landscape maintenance company. Owned and operated by Greg 'Ponch' Hartley II, Rain or Shine's mission is to treat every customer's outdoor surroundings with the same personal care we give to our own lawns and gardens. Ponch values the idea of providing landscape maintenance that is adaptable to every customer's needs. As such, Rain or Shine serves both residential and commercial customers. Holding to our values, and under Ponch's watchful eye, you can expect thorough service, provided with care, and scheduled around your work, life, and business hours. Our high standards and attention to detail, along with our desire to foster long-term relationships with our customers, means we strive to give personal care to every environment we encounter, as if it were our very own.",
//         termsaccepted: true,
//         user: user_id,
//         slug: "ev-temizligi-hasan-pulur-konak-izmir",
//         //links:[{outgoinglink: '', incominglink: '', objectid: 1, name: 'Visit my Servicebox Profile'}],
//         stats: {
//             securitychecks: [{
//                 objectid: 1,
//                 name: "Geçerli Eposta adresi"
//             }, {
//                 'objectid': 2,
//                 'name': 'Geçerli Cep Telefonu'
//             }],
//             rank: 4,
//             scorefive: '4.5',
//             scorehundred: 82,
//             quotecount: 2,
//             quotewincount: 1,
//             turnover: {
//                 currency: 'TL',
//                 value: 60000
//             },
//             finishedcount: 32,
//             commentcount: 43,
//             reviewcount: 23,
//             happycount: 30,
//             prices: {
//                 lowprice: 8000,
//                 highprice: 25000,
//                 currency: 'TL'
//             },
//             priority: {
//                 initial: 35,
//                 profilecomplete: 17
//             },
//             profile: {
//                 completeness: 91,
//                 issues: [{
//                     objectid: 1,
//                     name: "Add Profile Link",
//                     element: "outgoinglink"
//                 }, {
//                     objectid: 2,
//                     name: "Add established Year",
//                     element: "established"
//                 }, {
//                     objectid: 2,
//                     name: "Add Documents",
//                     element: "documents"
//                 }]
//             }
//         },
//         documents: [{
//             docname: "Lise Diploması",
//             docnumber: "23313",
//             docdate: moment.tz("2016-01-04", "Europe/Istanbul"),
//             docfile: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5228%24gregplitt.png",
//             doctype: {
//                 objectid: 5,
//                 name: "Diploma"
//             }
//         }, {
//             docname: "İlkokul Diploması",
//             docnumber: "432432",
//             docdate: moment.tz("2016-01-04", "Europe/Istanbul"),
//             docfile: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5228%24gregplitt.png",
//             doctype: {
//                 objectid: 5,
//                 name: "Diploma"
//             }
//         }],
//         payment_types: [{
//             objectid: 1,
//             name: 'kredi kartı'
//         }, {
//             objectid: 2,
//             name: 'nakit'
//         }],
//         established: {
//             objectid: 2016,
//             name: "2016"
//         },
//         neighborhood: {
//             objectid: 1,
//             name: "Yenişehir",
//             districtId: 1
//         },
//         district: {
//             objectid: 1,
//             name: "Konak",
//             provinceId: 1
//         },
//         province: {
//             objectid: 1,
//             name: "İzmir"
//         },
//         files: [{
//             location: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5549%24overcomeapproachanxiety-171d936471e4b4a0d560a0d227403c24.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/11.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/1.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/2.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/3.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/4.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/5.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/6.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/7.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/8.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/9.jpg"
//         }, {
//             location: "http://demo.jankuri.com/ngGallery/images/10.jpg"
//         }],
//         subcategory: {
//             objectid: 3,
//             name: "Ev Temizliği"
//         },
//         category: {
//             objectid: 1,
//             name: "Temizlik"
//         },
//         businesstype: {
//             objectid: 1,
//             name: "Şahıs"
//         }
//     }
//     ProviderModel.create(testProvider);
// }
// var steps = function() {
//     /////////////////////////////////////////////////////////
//     this.When(/^I click on my picture$/, function(callback) {
//         element(by.id('my_picture')).click().then(callback);
//     });
//     this.When(/^I click on link to become service provider$/, function(callback) {
//         element(by.id('giveservice')).click().then(callback);
//     });
//     /////////////////////////////////////////////////////////
//     this.Given(/^I am a visitor$/, function(callback) {
//         UserModel.remove().then(function() {
//             callback();
//         });
//     });
//     this.Given(/^I am on the homepage$/, function(callback) {
//         browser.get(config.baseUrl).then(callback);
//     });
//     this.When(/^I click on button to become service provider$/, function(callback) {
//         //element(by.css('.rightbutton')).click().then(callback);//jump
//         browser.get(config.baseUrl + '/giveservice').then(callback);
//     });
//     this.When(/^I signup to the system$/, function(callback) {
//         element(by.model('vm.user.email')).sendKeys("canercak@gmail.com");
//         element(by.model('vm.user.password')).sendKeys("123456");
//         element(by.model('vm.user.confirmPassword')).sendKeys("123456");
//         element(by.id('signup_button')).click().then(callback);
//         browser.driver.sleep(2000);
//     });
//     this.Then(/^I should be on new provider page$/, function(callback) {
//         expect(browser.getTitle()).to.eventually.contain('provider/new').and.notify(callback);
//     });
//     /////////////////////////////////////////////////////////
//     this.Given(/^I am a user$/, function(callback) {
//         UserModel.remove().then(function() {
//             UserModel.create(testUser);
//             callback();
//         });
//     });
//     this.Given(/^I'm logged in$/, function(callback) {
//         browser.get(config.baseUrl + '/login');
//         element(by.model('vm.user.email')).sendKeys("canercak@gmail.com");
//         element(by.model('vm.user.password')).sendKeys("123456");
//         element(by.id('login_button')).click().then(callback);
//     });
//     this.Given(/^I'm on the new provider page$/, function(callback) {
//         browser.waitForAngular();
//         browser.get(config.baseUrl + '/provider/new').then(callback);
//     });
//     this.When(/^I select my business type as company$/, function(callback) {
//         var selectButton = element(by.model('provider.businesstype'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('Company');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click();
//         element(by.model('provider.company')).sendKeys('servicebox').then(callback);
//     });
//     this.When(/^I enter my name and lastname$/, function(callback) {
//         element(by.model('provider.firstname')).sendKeys('Valentina');
//         element(by.model('provider.lastname')).sendKeys('Bunak').then(callback);
//     });
//     this.When(/^I enter my company mobile phone$/, function(callback) {
//         element(by.model('provider.phone')).sendKeys("0980066555").then(callback);
//     });
//     this.When(/^I select the province of my company$/, function(callback) {
//         var selectButton = element(by.model('provider.province'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('İzmir');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click().then(callback);
//     });
//     this.When(/^I select the district of my company$/, function(callback) {
//         var selectButton = element(by.model('provider.district'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('Konak');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click().then(callback);
//     });
//     this.When(/^I select the neighborhood of my company$/, function(callback) {
//         var selectButton = element(by.model('provider.neighborhood'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('Yenişehir');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click().then(callback);
//     });
//     this.When(/^I enter my business address$/, function(callback) {
//         element(by.model('provider.address')).sendKeys("1, Andriya Malyshko Street, Kyiv").then(callback);
//     });
//     // this.When(/^I select home cleaning service by searching$/, function(callback) {
//     //     element(by.model('provider.searchtext')).sendKeys("Home Cleaning").then(callback);
//     // });
//     this.When(/^I enter introduction about the services I provide$/, function(callback) {
//         element(by.model('provider.description')).sendKeys('we give service to everyone').then(callback);
//     });
//     this.When(/^I submit the form$/, function(callback) {
//         element(by.id('save_provider')).click().then(callback);
//         browser.driver.sleep(2000);
//     });
//     this.Then(/^I should be on addlink page$/, function(callback) {
//         expect(browser.getTitle()).to.eventually.contain('addlink').and.notify(callback);
//     });
//     this.Then(/^I should receive a welcome as a provider email$/, function(callback) {
//         callback(); //jump
//     });
//     ////////////////////////////////
//     this.Given(/^I have a provider$/, function(callback) {
//         ProviderModel.remove().then(function() {
//             UserModel.findOne({
//                 email: 'canercak@gmail.com'
//             }).exec(function(err, user) {
//                 createPro(user._id);
//                 callback();
//             })
//         });
//     });
//     this.Given(/^I am on the providers page$/, function(callback) {
//         browser.get(config.baseUrl + '/login');
//         element(by.model('vm.user.email')).sendKeys("canercak@gmail.com");
//         element(by.model('vm.user.password')).sendKeys("123456");
//         element(by.id('login_button')).click();
//         browser.waitForAngular();
//         browser.get(config.baseUrl + '/providers');
//         browser.waitForAngular().then(callback);
//     });
//     this.When(/^I click on button to edit provider$/, function(callback) {
//         element(by.id('edit_provider')).click().then(callback);
//     });
//     this.When(/^I change name of the provider$/, function(callback) {
//         element(by.model('provider.firstname')).sendKeys('ValentinaX').then(callback);
//     });
//     this.When(/^I submit the provider form$/, function(callback) {
//         element(by.id('update_provider')).click().then(callback);
//     });
//     this.Then(/^my profile should be created$/, function(callback) {
//         element(by.id('update_provider')).click().then(callback);
//     });
// };
// module.exports = steps;