(function() {
    'use strict';

    /**
     * Gives CSS class for test verdict
     */
    angular
        .module('purkinje')
        .filter('verdictClassFilter', ['defs',
            function(defs) {
                return verdictClassFilter(defs);
            }
        ]);

    function verdictClassFilter(defs) {
        return function(verdict, cssClass) {
            switch (verdict) {
                case defs.Verdict.PASS:
                    return 'success';
                case defs.Verdict.FAIL:
                    return 'danger';
                case defs.Verdict.ERROR:
                    return 'warning';
                default:
                    return 'default';
            }
        };
    }
})();
