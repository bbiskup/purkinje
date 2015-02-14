(function() {
    'use strict';
    angular
        .module('purkinje')
        .config(function($translateProvider) {
            $translateProvider.translations('en', {
                // Main page
                PURKINJE_APP_TITLE: 'Purkinje Test Runner',

                // Dashboard
                DASHBOARD_HEADLINE: 'Dashboard',
                NO_TEST_SUITE: 'No test suite',
                PASS: 'Pass',
                FAILED: 'Failed',
                ERRORS: 'Errors',
                SKIPPED: 'Skipped',
                FAST: 'Fast',
                NORMAL: 'Normal',
                SLOW: 'Slow',
                SLOWEST: 'Slowest',
                CLEAR_BUTTON: 'Clear',
                DUMMY_DATA_BUTTON: 'Dummy data',
                NUM_TEST_CASES: '# of test cases',
                NUM_EXECUTED: 'executed',
                TOTAL_NUM_TEST_CASES: 'Total number of test cases',

                /* no symbolic name for these grid header keys because this is
                   how they are delivered from the test runner,
                   and after capitalization by ui-grid
                   */
                File: 'File',
                Name: 'Name',
                Verdict: 'Verdict',
                Duration: 'Duration',
                Timestamp: 'Timestamp',

                PLACEHOLDER_LESS_THAN: 'less than',
                PLACEHOLDER_GREATER_THAN: 'greater than',

                // Settings page
                SETTINGS_HEADLINE: 'Settings',
                HOST: 'Host',
                DIRECTORY: 'Directory',
                USER: 'User',

                // About page
                ABOUT_HEADLINE: 'About purkinje',
                PURKINJE_ON_GITHUB: 'purkinje on GitHub',
                SHOW_LICENSE_BUTTON_TEXT: 'Show license',
                HIDE_LICENSE_BUTTON_TEXT: 'Hide license',

                // Activity state directive
                STATE: 'State',
                RUNNING: 'Running...',
                IDLE: 'Idle'
            });
            $translateProvider.translations('de', {

                // Main page
                PURKINJE_APP_TITLE: 'Purkinje Test Runner',

                // Dashboard
                DASHBOARD_HEADLINE: 'Dashboard',
                NO_TEST_SUITE: 'Keine Testsuite',
                PASS: 'Bestanden',
                FAILED: 'Fehlgeschlagen',
                ERRORS: 'Fehler',
                SKIPPED: 'Übersprungen',
                FAST: 'Schnell',
                NORMAL: 'Normal',
                SLOW: 'Langsam',
                SLOWEST: 'Sehr langsam',
                CLEAR_BUTTON: 'Löschen',
                DUMMY_DATA_BUTTON: 'Dummy-Daten',
                NUM_TEST_CASES: 'Anzahl Testfälle',
                NUM_EXECUTED: 'ausgeführt',
                TOTAL_NUM_TEST_CASES: 'Anzahl Testfälle',

                /* no symbolic name for these grid header keys because this is
                   how they are delivered from the test runner,
                   and after capitalization by ui-grid
                   */
                File: 'Datei',
                Name: 'Name',
                Verdict: 'Verdikt',
                Duration: 'Dauer',
                Timestamp: 'Zeitstempel',

                PLACEHOLDER_LESS_THAN: 'kleiner als',
                PLACEHOLDER_GREATER_THAN: 'größer als',


                // Settings page
                SETTINGS_HEADLINE: 'Einstellungen',
                HOST: 'Host',
                DIRECTORY: 'Verzeichnis',
                USER: 'Benutzer',

                // About page
                ABOUT_HEADLINE: 'Über purkinje',
                PURKINJE_ON_GITHUB: 'purkinje auf GitHub',
                SHOW_LICENSE_BUTTON_TEXT: 'Lizenz anzeigen',
                HIDE_LICENSE_BUTTON_TEXT: 'Lizenz verbergen',

                // Activity state directive
                STATE: 'Zustand',
                RUNNING: 'läuft...',
                IDLE: 'inaktiv'
            })
            .fallbackLanguage('en');
            $translateProvider.determinePreferredLanguage();
        });
})();
