'use strict';

// protractor configuration

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/purkinje/static/js/tests/**/*.spec.js']
};