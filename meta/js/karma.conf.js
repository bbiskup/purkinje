// Karma configuration
// Generated on Thu Dec 18 2014 14:23:14 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'purkinje/static',

    plugins: [
      'karma-chrome-launcher', 'karma-firefox-launcher',
      'karma-mocha',  // must be listed explicitly _if_ plugins property is
                      // given
      'karma-ng-html2js-preprocessor'
    ],


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // For testing directives with templateUrl
    // plugins: ['ng-html2js'],


    // list of files / patterns to load in the browser
    files: [

      // mocha must be imported (so window.mocha is defined), otherwise
      // angular-mocks will not define inject
      '../../mocha.conf.js',
      'bower_components/ngMidwayTester/src/ngMidwayTester.js',

      // Libs
      'bower_components/underscore/underscore.js',
      'bower_components//jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-grid/*.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.js',
      'bower_components/simple-statistics/src/simple_statistics.js',
      'bower_components/ng-blink/ng-blink.js',
      'bower_components/angular-reconnecting-websocket/angular-reconnecting-websocket.js',

      //'bower_components/angular-route/angular-route.js',
      //'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',

      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/should/should.js',

      'bower_components/ngMidwayTester/src/ngMidwayTester.js',
      'bower_components/chai/chai.js',

      // TODO correct path
      //'app/scripts/lib/router.js',
      'js/*.js', 'js/directives/*.js', 'js/services/*.js', 'js/filters.js',
      'js/controllers/*.js',  // for midway testing



      // Test files
      'js/tests/unit/*.spec.js', 'js/tests/midway/*.spec.js',

      // Client-side HTML templates
      'templates/**/*.html', 'templates/*.html'
    ],


    // list of files to exclude
    exclude: ['**/*.swp'],


    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // Serve HTML templates  (see
      // http://daginge.com/technology/2013/12/14/testing-angular-templates-with-jasmine-and-karma/)
      'templates/**/*.html': ['ng-html2js'],
      'templates/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // setting this option will create only a single module that contains
      // templates
      // from all the files, so you can load them all with module('foo')
      // moduleName: 'templates',
      // stripPrefix: '/static/',
      prependPrefix: '/static/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file
    // changes
    autoWatch: true,


    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_custom', 'Firefox'],

    customLaunchers:
        {'Chrome_custom': {'base': 'Chrome', 'flags': ['--no-sandbox', '-y']}},


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // for ngMidwayTester
    proxies: {'/': 'http://localhost:5000/'}
  });
};
