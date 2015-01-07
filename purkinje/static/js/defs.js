;
(function() {
    'use strict';

    window.defs = {
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
            FAST: 1,
            NORMAL: 2,
            SLOW: 2,
            VERY_SLOW: 4
        },

        maxDummyMsgScopeLength: 10000
    };
})();