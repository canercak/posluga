'use strict';
var config = browser.params;
var moment = require('moment-timezone');
var request;
var page;
var user;
var User = require('/Users/apple/Desktop/dev/posluga/server/api/user/user.model');
var Request = require('/Users/apple/Desktop/dev/posluga/server/api/request/request.model');

function select21(x, text) {
    var selectButton = element(by.model(x));
    var selectInput = selectButton.element(by.css('.ui-select-search'));
    selectButton.click();
    selectInput.sendKeys(text);
    element.all(by.css('.ui-select-choices-row-inner span')).first().click();
}
var testUser = {
    email: 'test1@example.com',
    password: '123456',
    confirmPassword: '123456'
};
var testUser2 = {
    email: 'test2@example.com',
    password: '123456',
    confirmPassword: '123456'
};

function createUserAndRequest() {
    user = new User(testUser);
    user.save();
    request = new Request({
        searchtext: "Böcek İlaçlama",
        category: {
            objectid: 1,
            name: "Temizlik"
        },
        subcategory: {
            objectid: 1,
            name: "Böcek İlaçlama"
        },
        files: [{
            location: "https://cdn4.iconfinder.com/data/icons/twitter-ui-set/128/Persone-128.png"
        }],
        province: {
            objectid: 1,
            name: "İzmir"
        },
        district: {
            objectid: 1,
            name: "Konak"
        },
        description: "I want full cleaning including carpets",
        when: "Belirli bir zamanda",
        date: moment.tz("Europe/Istanbul"),
        when: {
            objectid: 1,
            name: '2 ay içinde'
        },
        phone: '5322814780',
        email: 'test1@example.com',
        termsaccepted: true,
        budget: 300,
        code: 1234,
        codesent: moment.tz("Europe/Istanbul"),
        phonenotify: {
            objectid: 1,
            name: "Teklif veren arayabilir"
        },
        user: user._id
    })
    request.save();
};
describe('Request View', function() {
    var login;
    // beforeEach(function() {
    //     //User.removeAsync();
    //     //Request.removeAsync();
    //     browser.ignoreSynchronization = true
    //     browser.get(config.baseUrl + '/');
    //     //login = require('../account/login/login.po');
    // });
    /////////WORKING TESTS/////////
    // it('it should not go to phone confirmation page if user with a verified phone creates request request', function() {
    //     createUserAndRequest();
    //     browser.get(config.baseUrl + '/login');
    //     login.login(testUser);
    //     browser.waitForAngular();
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys("5322814785");
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/success');
    // });
    // it('when a user with a request wants to create a request it should show last request phone and address info', function() {
    //     createUserAndRequest();
    //     browser.get(config.baseUrl + '/login');
    //     login.login(testUser);
    //     browser.waitForAngular();
    //     browser.get(config.baseUrl + '/request/');
    //     browser.waitForAngular();
    //     var name = element(by.model('request.phone'));
    //     expect(name.getAttribute('value')).toEqual('(532) 281-4780');
    // });
    // it('when a user wants to create a request request it should not show his email on the form', function() {
    //     createUserAndRequest();
    //     browser.get(config.baseUrl + '/login');
    //     login.login(testUser);
    //     browser.waitForAngular();
    //     browser.get(config.baseUrl + '/request/');
    //     expect(element(by.model('request.email')).isDisplayed()).toBe(false);
    // });
    // it('user cancels his own request request with a specific reason', function() {
    //     createUserAndRequest()
    //     browser.get(config.baseUrl + '/login');
    //     login.login(testUser);
    //     browser.waitForAngular();
    //     browser.get(config.baseUrl + '/success/' + request._id + '/save');
    //     browser.waitForAngular();
    //     element(by.id('cancel_request_modal')).click();
    //     browser.sleep(1000);
    //     element(by.id('cancelValue8')).click();
    //     element(by.id('cancelReason')).sendKeys("I couldn't find what I'm looking for");
    //     browser.waitForAngular();
    //     element(by.id('cancel_request')).click();
    //     //browser.sleep(4000);
    //     //expect(browser.getTitle()).toContain(config.baseUrl + '/dashboard');     
    // });
    // it('user cannot see someone elses request', function() {
    //     createUserAndRequest();
    //     var user2 = new User(testUser2);
    //     user2.save();
    //     browser.get(config.baseUrl + '/login');
    //     login.login(testUser2);
    //     browser.waitForAngular();
    //     browser.get(config.baseUrl + '/request/' + request._id);
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/dashboard');
    // });
    // it('user resends request code and enters it wrongly', function() {
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys("5322810000");
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.model('request.email')).sendKeys("canercak000@gmail.com");
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     browser.executeScript("document.getElementById('timer_button').style.display = 'block';").then(function() {
    //         element(by.id('timer_button')).click();
    //         element(by.model('codeEntered')).sendKeys("zzzzzz");
    //         element(by.id('approve_button')).click();
    //         browser.waitForAngular();
    //         expect(element(by.id('wrong_label')).isDisplayed()).toBe(true);
    //     });
    // });
    // it('user updates the request from the success screen', function() {
    //     createUserAndRequest()
    //     browser.get(config.baseUrl + '/login');
    //     login.login(testUser);
    //     browser.waitForAngular();
    //     browser.get(config.baseUrl + '/success/' + request._id + '/save');
    //     browser.waitForAngular();
    //     element(by.id('edit_request')).click();
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/request/' + request._id);
    //     element(by.model('request.description')).sendKeys("I want full cleaning including carpets and curtains");
    //     element(by.id('update_button')).click();
    //     browser.waitForAngular();
    //     browser.sleep(2000);
    //     expect(element(by.id('success_description')).getText()).toContain('I want full cleaning including carpets and curtains');
    // });
    // it('user resends request code and enters it correctly', function() {
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys("5322814185");
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.model('request.email')).sendKeys("canercak11@gmail.com");
    //     browser.waitForAngular();
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     browser.executeScript("document.getElementById('timer_button').style.display = 'block';").then(function() {
    //         element(by.id('timer_button')).click();
    //         element(by.model('codeEntered')).sendKeys("xyzv123");
    //         element(by.id('approve_button')).click();
    //         browser.waitForAngular();
    //         expect(browser.getTitle()).toContain(config.baseUrl + '/success');
    //     });
    // });
    it('a new visitor creates a new request', function() {
        browser.get("http://localhost:9000/request?type=new");
        element(by.id('searchtextid')).sendKeys("уборка дома");
        //element(by.model('request.searchtext')).sendKeys("уборка дома");
        //element(by.model('request.description')).sendKeys("I need pest control service");
        // select21('request.province', 'İzmir');
        // select21('request.district', 'Konak');
        // select21('request.when', '2 ay içinde');
        // element(by.model('request.phone')).sendKeys("5322814785");
        // select21('request.phonenotify', 'Numaramı gizli tutun');
        // element(by.model('request.email')).sendKeys("canercak11@gmail.com");
        // element(by.id('save_button')).click();
        // browser.waitForAngular();
        // element(by.model('codeEntered')).sendKeys("xyzv123");
        // element(by.id('approve_button')).click();
        // browser.waitForAngular();
        //expect(browser.getTitle()).toContain(config.baseUrl + '/success');
    });
    // it('visitor enters a phone not in the system and a email not in the system and he gets redirected to phone verification to create new user', function() {
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys('5322811234');
    //     element(by.model('request.email')).sendKeys('canercak333211@gmail.com');
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/phone');
    // });
    // it('visitor enters a email in the system and a new phone and he views the login modal to find current user and then goes to phone verification', function() {
    //     createUserAndRequest();
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys("5322811223");
    //     element(by.model('request.email')).sendKeys("test1@example.com");
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     element(by.model('foundemail')).sendKeys('test1@example.com');
    //     element(by.model('password')).sendKeys('123456');
    //     element(by.id('login')).click();
    //     browser.waitForAngular();
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/phone');
    // });
    // it('visitor enters the phone number and email of a verified request and views login to find curretn user', function() {
    //     createUserAndRequest();
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys('5322814780');
    //     element(by.model('request.email')).sendKeys('test1@example.com');
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     element(by.model('foundemail')).sendKeys('test1@example.com');
    //     element(by.model('password')).sendKeys('123456');
    //     element(by.id('login')).click();
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/success');
    // });
    // it('visitor enters a phone in the system and a new email and ater login he goes to phone verification', function() {
    //     createUserAndRequest();
    //     browser.get(config.baseUrl + '/request/');
    //     element(by.model('request.searchtext')).sendKeys("Böcek İlaçlama");
    //     element(by.model('request.description')).sendKeys("I need pest control service");
    //     select21('request.province', 'İzmir');
    //     select21('request.district', 'Konak');
    //     select21('request.when', '2 ay içinde');
    //     element(by.model('request.phone')).sendKeys("5322814780");
    //     element(by.model('request.email')).sendKeys("test12331@example.com");
    //     select21('request.phonenotify', 'Numaramı gizli tutun');
    //     element(by.id('save_button')).click();
    //     browser.waitForAngular();
    //     expect(browser.getTitle()).toContain(config.baseUrl + '/phone');
    // });
    //provider creates a request
    //logged in user tries to create request with someone elses phone
});