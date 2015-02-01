(function() {
    'use strict';
    angular
        .module('purkinje')
        .config(function($translateProvider) {
            $translateProvider.translations('en', {
                SETTINGS_HEADLINE: 'Settings',
                ABOUT_HEADLINE: 'About purkinje',
                PURKINJE_ON_GITHUB: 'purkinje on GitHub'
            });
            $translateProvider.translations('de', {
                SETTINGS_HEADLINE: 'Einstellungen',
                ABOUT_HEADLINE: 'Über purkinje',
                PURKINJE_ON_GITHUB: 'purkinje auf GitHub'
            });
            // $translateProvider.preferredLanguage('en');
            $translateProvider.determinePreferredLanguage();
        });
})();
