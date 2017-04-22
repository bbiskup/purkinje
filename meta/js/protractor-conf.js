(function() {

  'use strict';

  // protractor configuration

  exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['purkinje/static/js/tests/e2e/*.spec.js'],

    baseUrl: 'http://purkinje:5000/',

    chromeDriver: '/usr/bin/google-chrome',
    multiCapabilities: [
      {
        browserName: 'firefox',
      },
      {browserName: 'chrome', chromeOptions: {'args': ['--no-sandbox', '-y']}}
    ],

    // running tests in two browsers simultaneously may cause errors
    maxSessions: 1,
    // directConnect: true,
    // chromeOnly: true,

    jasmineNodeOpts:
        {isVerbose: true, showColors: true, includeStackTrace: true}
  };
})();
