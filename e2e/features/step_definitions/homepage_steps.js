// var support = require('./support'); 
// var config = browser.params;  
// var async = require('async'); 
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised); 
// var expect = chai.expect; 

// var steps = function() {

//   this.Given(/^I am on the homepage$/, function(callback) {
//     browser.get(config.baseUrl + '/').then(callback);
//   });

//   this.Then(/^I should see a "([^"]*)" link$/, function(link, callback) { 
//    expect(element(by.id('login')).isPresent()).to.eventually.be.true.and.notify(callback); 
//   });

//   this.Then(/^I should see a "([^"]*)"$/, function(link, callback) {
//     var myElement = element(by.id('signup'));
//     expect(myElement.isPresent()).to.eventually.be.true.and.notify(callback);
//   }); 

//   this.When(/^I click "([^"]*)" link$/, function (link, callback) {
//     element(by.id('login')).click().then(callback);
//   });

//   this.Then(/^I should be on login page$/, function (callback) {
//    expect(browser.getTitle()).to.eventually.equal(config.baseUrl + '/login').and.notify(callback); 
//   });

// };

// module.exports = steps;
