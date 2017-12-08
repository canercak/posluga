// var support = require('./support'); 
// var config = browser.params;  
// var async = require('async'); 
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised); 
// var expect = chai.expect;  
// var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');
// var ProviderModel = require(config.serverConfig.root + '/server/api/provider/provider.model');  
// var QuoteModel = require(config.serverConfig.root + '/server/api/quote/quote.model'); 
// var RequestModel = require(config.serverConfig.root + '/server/api/request/request.model');
// var testUser = {
//   email: 'canercak@gmail.com',
//   password: '123456',
//   confirmPassword: '123456'
// };
// var steps = function() {  
//     this.Given(/^I'm on the dashboard page$/, function (callback) {
//       browser.waitForAngular();
//       browser.get(config.baseUrl + '/dashboard').then(callback);
//      }); 
//     this.When(/^I click on dashboard button to get new quote$/, function (callback) {
//       browser.waitForAngular();
//       element(by.id('dashboard_get_quote')).click().then(callback);
//     }); 
//     this.When(/^I click on dashboard button to create profile$/, function (callback) {
//       browser.waitForAngular();
//       element(by.id('dashboard_create_profile')).click().then(callback);
//     }); 
//     this.Then(/^I should be on new quote page$/, function (callback) {
//       browser.waitForAngular();
//        //expect(browser.getTitle()).to.eventually.contain('request').and.notify(callback); 
//        callback();
//     });
// };
// module.exports = steps;