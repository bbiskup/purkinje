(function() {

    'use strict';

    // protractor configuration

    exports.config = {
        //seleniumAddress: 'http://localhost:4444/wd/hub',
        specs: ['purkinje/static/js/tests/e2e/*.spec.js'],

        baseUrl: 'http://purkinje:5000/',

        capabilities: {
            // Selenium
            // "Selenium 2.44 is currently not compatible with Firefox 35. –  rajana sekhar Feb 3 at 7:18"
            // http://stackoverflow.com/a/28107139
            //browserName: 'firefox',
            browserName: 'chrome',
        },
        //directConnect: true,
        chromeOnly: true,

        jasmineNodeOpts: {
            isVerbose: true,
            showColors: true,
            includeStackTrace: true
        }
    };
})();
