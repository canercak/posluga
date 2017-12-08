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
//     this.Given(/^I don't have any quotes$/, function (callback) {
//         QuoteModel.remove().then(function(){
//             callback();
//         }); 
//     });
//     this.Given(/^I don't have any requests$/, function (callback) {
//         RequestModel.remove().then(function(){
//             callback();
//         }); 
//     });
//     this.When(/^I log in$/, function (callback) {
//       browser.get(config.baseUrl + '/login');
//       element(by.model('vm.user.email')).sendKeys("canercak@gmail.com");
//       element(by.model('vm.user.password')).sendKeys("123456");
//       element(by.id('login_button')).click().then(callback); 
//     });
//     this.Then(/^I should be on dashboard page$/, function (callback) {
//        browser.driver.sleep(2000); 
//        expect(browser.getTitle()).to.eventually.contain('dashboard').and.notify(callback); 
//     });
// };
// module.exports = steps;