 // 'use strict';
 // exports.config = {
 //     // The timeout for each script run on the browser. This should be longer
 //     // than the maximum time your application needs to stabilize between tasks.
 //     allScriptsTimeout: 110000,
 //     // A base URL for your application under test. Calls to protractor.get()
 //     // with relative paths will be prepended with this.
 //     baseUrl: 'http://localhost:' + (process.env.PORT || '9000'),
 //     // If true, only chromedriver will be started, not a standalone selenium.
 //     // Tests for browsers other than chrome will not run.
 //     chromeOnly: true,
 //     // list of files / patterns to load in the browser
 //     specs: ['e2e/**/*.spec.js'],
 //     // Patterns to exclude.
 //     exclude: [],
 //     // ----- Capabilities to be passed to the webdriver instance ----
 //     //
 //     // For a full list of available capabilities, see
 //     // https://code.google.com/p/selenium/wiki/DesiredCapabilities
 //     // and
 //     // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
 //     capabilities: {
 //         'browserName': 'chrome'
 //     },
 //     // ----- The test framework -----
 //     //
 //     // Jasmine and Cucumber are fully supported as a test and assertion framework.
 //     // Mocha has limited beta support. You will need to include your own
 //     // assertion framework if working with mocha.
 //     framework: 'jasmine',
 //     // ----- Options to be passed to minijasminenode -----
 //     //
 //     // See the full list at https://github.com/juliemr/minijasminenode
 // };
 'use strict';
 var config = {
     allScriptsTimeout: 110000,
     chromeOnly: true,
     baseUrl: 'http://localhost:' + (process.env.PORT || '9000'),
     // Credientials for Saucelabs
     sauceUser: process.env.SAUCE_USERNAME,
     sauceKey: process.env.SAUCE_ACCESS_KEY,
     rootElement: 'body',
     // list of files / patterns to load in the browser
     specs: ['e2e/features/*.feature'],
     allScriptsTimeout: 50000, //This is the overall Timeout
     getPageTimeout: 50000, //This is the Page timeout
     // Patterns to exclude.
     exclude: [],
     capabilities: {
         "browserName": "chrome"
     },
     framework: 'custom',
     // path relative to the current config file
     frameworkPath: require.resolve('protractor-cucumber-framework'),
     // relevant cucumber command line options
     cucumberOpts: {
         require: ['e2e/features/step_definitions/request.js', 'e2e/features/step_definitions/env.js'],
         tags: false,
         format: 'pretty',
         profile: false,
         'no-source': true,
         keepAlive: false
     },
     params: {
         serverConfig: require('./server/config/environment')
     },
     onPrepare: function() {
         var width = 1600;
         var height = 1200;
         browser.driver.manage().window().setSize(width, height);
         var serverConfig = config.params.serverConfig;
         var mongoose = require('mongoose');
         mongoose.connect(serverConfig.mongo.uri, serverConfig.mongo.options); // Connect to database
     }
 };
 config.params.baseUrl = config.baseUrl;
 exports.config = config;