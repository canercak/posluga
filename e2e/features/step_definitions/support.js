// var Support = function() {
//     function select2(type, key) {
//         var selectButton = element(by.model(type));
//         var selectInput = selectButton.element(by.css('.ui-select-search'));
//         selectButton.click();
//         selectInput.sendKeys(key);
//         element.all(by.css('.ui-select-choices-row-inner span')).first().click();
//         callback()
//     }
// };
// Support.prototype.select2 = function(type, key) {
//     var selectButton = element(by.model(type));
//     var selectInput = selectButton.element(by.css('.ui-select-search'));
//     selectButton.click();
//     selectInput.sendKeys(key);
//     element.all(by.css('.ui-select-choices-row-inner span')).first().click();
// };
var Support = function() {};
Support.prototype.select2 = function(type, key, callback) {
    var selectButton = element(by.model(type));
    var selectInput = selectButton.element(by.css('.ui-select-search'));
    selectButton.click();
    selectInput.sendKeys(key);
    element.all(by.css('.ui-select-choices-row-inner span')).first().click().then(callback);
};
Support.prototype.get = function(sut, url, callback) {
    browser.driver.get(url).then(function(result) {
        callback(result)
    });
};
Support.prototype.findByBinding = function(sut, item, callback) {
    sut.browser.findElement(sut.by.binding(item)).then(function(result) {
        callback(result);
    });
};
Support.prototype.findByModel = function(sut, item, callback) {
    browser.driver.findElement(by.model(item)).then(function(result) {
        callback(result);
    });
};
Support.prototype.isElementPresent = function(sut, find, callback) {
    sut.browser.isElementPresent(sut.by.linkText(find)).then(function(result) {
        callback(result)
    });
};
Support.prototype.isElementPresentByClass = function(sut, find, callback) {
    sut.browser.isElementPresent(sut.by.css('.' + find)).then(function(result) {
        callback(result)
    });
};
module.exports = new Support();