'use strict';
var RequestPage = function() {
    this.select2 = function(element, text) {
        var selectButton = element(by.model(element));
        var selectInput = selectButton.element(by.css('.ui-select-search'));
        selectButton.click();
        selectInput.sendKeys(text);
        element.all(by.css('.ui-select-choices-row-inner span')).first().click();
    }
};
module.exports = new RequestPage();
// /**
//  * This file uses the Page Object pattern to define the main page for tests
//  * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
//  */
// 'use strict';
// var MainPage = function() {
//     this.heroEl = element(by.css('.home-header.fittocenter'));
//     this.h1El = this.heroEl.element(by.css('h1'));
//     this.imgEl = this.heroEl.element(by.css('img'));
// };
// module.exports = new MainPage();
/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */