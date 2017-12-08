var chai = require('chai');
var support = require('./support');
var chaiAsPromised = require('chai-as-promised');
var config = browser.params;
var moment = require('moment-timezone');
var Request = require('/Users/apple/Desktop/dev/posluga/server/api/request/request.model');
chai.use(chaiAsPromised);
var expect = chai.expect;
module.exports = function() {
    this.Given(/^I am a visitor$/, function(callback) {
        browser.executeScript("document.body.style.transform='scale(‌​0.1)';").then(callback);
        // Request.find({
        //     'email': "canercak113232@gmail.com"
        // }).exec(function(err, requests) {
        //     console.log(requests);
        // });
    });
    this.Given(/^I am on the request page$/, function(callback) {
        browser.driver.get(config.baseUrl + '/request?type=new').then(callback);
    });
    this.When(/^I select "([^"]*)" as the service I want$/, function(arg1, callback) {
        element(by.model('request.searchtext')).sendKeys(arg1).then(callback);
    });
    this.When(/^I enter "([^"]*)" as details$/, function(arg1, callback) {
        element(by.model('request.description')).sendKeys(arg1).then(callback);
    });
    this.When(/^I enter "([^"]*)" as budget$/, function(arg1, callback) {
        element(by.model('request.budget')).sendKeys(arg1).then(callback);
    });
    this.When(/^I select "([^"]*)" as oblast$/, function(arg1, callback) {
        support.select2('request.oblast', arg1, callback)
    });
    this.When(/^I select "([^"]*)" as raion$/, function(arg1, callback) {
        support.select2('request.rayon', arg1, callback)
    });
    this.When(/^I select "([^"]*)" as gorad$/, function(arg1, callback) {
        support.select2('request.gorad', arg1, callback)
    });
    this.When(/^I select "([^"]*)" as when$/, function(arg1, callback) {
        support.select2('request.when', arg1, callback)
    });
    this.When(/^I select "([^"]*)" at "([^"]*)" as date$/, function(arg1, arg2, callback) {
        callback();
        //element(by.id('datetimepicker')).sendKeys("07-02-2017 13:00").then(callback);
        // var tomorrow = moment().add(1, 'days').format('DD-DD-YYYY')
    });
    this.When(/^I enter "([^"]*)" as my mobile phone$/, function(arg1, callback) {
        element(by.model('request.phone')).sendKeys(arg1).then(callback);
    });
    this.When(/^I select "([^"]*)" as my notification preference$/, function(arg1, callback) {
        support.select2('request.phonenotify', arg1, callback)
    });
    this.When(/^I enter "([^"]*)" as my email$/, function(arg1, callback) {
        element(by.model('request.email')).sendKeys(arg1).then(callback);
    });
    this.When(/^I submit the page$/, function(callback) {
        element(by.id('submitbutton')).click().then(callback);
    });
    this.When(/^I enter the sms code I received$/, function(callback) {
        element(by.id('code')).sendKeys('5433').then(callback);
    });
    this.When(/^I click approve button$/, function(callback) {
        element(by.id('approve_button')).click().then(callback);
    });
    this.Then(/^my request request should be created$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should be on request success page$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should see "([^"]*)" as the service$/, function(arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should see a button to edit the request$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should see a button to delete the request$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should see links for related requests$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should get logged in$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should receive login email$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^I should receive new request email$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^admins should be notified$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^editors should be notified$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
};