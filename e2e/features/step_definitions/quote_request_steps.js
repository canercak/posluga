// var support = require('./support');
// var config = browser.params;
// var async = require('async');
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var expect = chai.expect;
// var steps = function() {
//     var email;
//     this.Given(/^I am a visitor$/, function(callback) {
//         callback()
//     });
//     this.When(/^I click on a button to get requests$/, function(callback) {
//         element(by.id('get_request')).click().then(callback);
//     });
//     this.Then(/^I should be on request request page$/, function(callback) {
//         expect(browser.getTitle()).to.eventually.equal(config.baseUrl + '/request').and.notify(callback);
//     });
//     this.Given(/^I am on the request request page$/, function(callback) {
//         browser.get(config.baseUrl + '/request').then(callback);
//     });
//     this.When(/^I select pest control as the service I want$/, function(callback) {
//         element(by.id('searchtext')).sendKeys("Böcek İlaçlama").then(callback);
//     });
//     this.When(/^I enter what needs to be done$/, function(callback) {
//         element(by.id('description')).sendKeys("I don2t want to see the rats in my house anymore").then(callback);
//     });
//     this.When(/^I select the province I live$/, function(callback) {
//         var selectButton = element(by.model('request.province'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('İzmir');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click();
//         callback()
//     });
//     this.When(/^I select the district I live$/, function(callback) {
//         var selectButton = element(by.model('request.district'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('Konak');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click();
//         callback();
//     });
//     this.When(/^I select the time as in two months$/, function(callback) {
//         var selectButton = element(by.model('request.when'));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys('4 ay içinde');
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click();
//         callback();
//     });
//     this.When(/^I enter my mobile phone$/, function(callback) {
//         element(by.model('request.phone')).sendKeys("5322814785").then(callback);
//     });
//     this.When(/^I select my calling preference as hidden$/, function(callback) {
//         var select = element(by.id('phonenotify'));
//         var selected = select.element(by.css('.ui-select-search'));
//         select.click().then(callback);
//         selected.sendKeys('Numaramı gizli tutun').then(callback);
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click().then(callback);
//         callback();
//     });
//     this.When(/^I enter my email address$/, function(callback) {
//         email = (Math.random().toString(36).substring(7)) + "@gmail.com"
//         element(by.model('request.email')).sendKeys(email).then(callback);
//     });
//     this.When(/^I accept the terms and conditions$/, function(callback) {
//         JessieChkbxLabel = element(by.model('request.termsaccepted'));
//         JessieChkbxLabel.click().then(callback);
//     });
//     this.When(/^I submit the page$/, function(callback) {
//         element(by.id('save_button')).click().then(callback);
//         browser.waitForAngular().then(callback);
//     });
//     this.When(/^I enter the sms code I received$/, function(callback) {
//         element(by.model('codeEntered')).sendKeys("dsjee1").then(callback);
//     });
//     this.When(/^I click approve button$/, function(callback) {
//         element(by.id('approve_button')).click().then(callback);
//     });
//     this.Then(/^my request request should be created$/, function(callback) {
//         expect(browser.getTitle()).to.eventually.contain(config.baseUrl + '/success').and.notify(callback);
//     });
//     this.Then(/^I should be on request success page$/, function(callback) {
//         expect(element(by.id('success_message')).isPresent()).to.eventually.be.true.and.notify(callback);
//     });
//     this.Then(/^I should see details about the request$/, function(callback) {
//         expect(element(by.id('success_message')).isPresent()).to.eventually.be.true.and.notify(callback);
//     });
//     this.Then(/^I should see a button to edit the request$/, function(callback) {
//         expect(element(by.id('edit_request')).isPresent()).to.eventually.be.true.and.notify(callback);
//     });
//     this.Then(/^I should see a button to delete the request$/, function(callback) {
//         expect(element(by.id('delete_request')).isPresent()).to.eventually.be.true.and.notify(callback);
//     });
//     this.Then(/^I should see links for related requests$/, function(callback) {
//         expect(element(by.id('service_request1')).isPresent()).to.eventually.be.true.and.notify(callback);
//     });
//     this.Then(/^I should get logged in$/, function(callback) {
//         expect(element(by.id('navbar_name')).getText()).to.eventually.contain('@gmail.com').and.notify(callback);
//     });
//     this.Then(/^I should receive welcome email$/, function(callback) {
//         callback();
//     });
//     this.Then(/^pest control service providers should be asyncronously notified$/, function(callback) {
//         callback();
//     });
// };
// module.exports = steps;