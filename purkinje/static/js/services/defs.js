(function() {
    'use strict';

    angular
        .module('purkinje')
        .constant('defs', defs());

    function defs() {
        return {
            /**
             * Verdict of test execution
             */
            Verdict: {
                PASS: 'pass',
                FAIL: 'fail',
                ERROR: 'error',
                SKIPPED: 'skipped'
            },

            /**
             * Qualitative classification of test execution durations
             */
            DurationClass: {
                FAST: 'fast',
                NORMAL: 'normal',
                SLOW: 'slow',
                SLOWEST: 'slowest'
            },

            maxDummyMsgScopeLength: 10000
        };
    }
})();
