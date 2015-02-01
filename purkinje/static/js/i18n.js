(function() {
    'use strict';
    angular
        .module('purkinje')
        .config(function($translateProvider) {
            $translateProvider.translations('en', {
                SETTINGS_HEADLINE: 'Settings',

                // About page
                ABOUT_HEADLINE: 'About purkinje',
                PURKINJE_ON_GITHUB: 'purkinje on GitHub',
                SHOW_LICENSE_BUTTON_TEXT: 'Show license',
                HIDE_LICENSE_BUTTON_TEXT: 'Hide license'
            });
            $translateProvider.translations('de', {
                SETTINGS_HEADLINE: 'Einstellungen',

                // About page
                ABOUT_HEADLINE: 'Über purkinje',
                PURKINJE_ON_GITHUB: 'purkinje auf GitHub',
                SHOW_LICENSE_BUTTON_TEXT: 'Lizenz anzeigen',
                HIDE_LICENSE_BUTTON_TEXT: 'Lizenz verbergen'
            });
            // $translateProvider.preferredLanguage('en');
            $translateProvider.determinePreferredLanguage();
        });
})();
