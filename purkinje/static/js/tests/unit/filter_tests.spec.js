(function() {
    'use strict';

    describe('verdictClassFilter', function() {
        var filt, defs_;

        beforeEach(function() {
            // crucial
            module('purkinje');

            inject(function($filter, defs) {
                filt = $filter('verdictClassFilter');
                defs_ = defs;
            });

            // also ok
            /*inject(function($injector) {
                var $f = $injector.get('$filter');
                filt = $f('verdictClassFilter');
            });*/
        });


        /*beforeEach(inject(function($injector) {

            var $f = $injector.get('$filter');
            filt = $f('verdictClassFilter');
        }));*/


        it('returns "success" for verdict PASS', function() {
            (filt(defs_.Verdict.PASS)).should.equal('success');
        });

        it('returns "error" for verdict FAIL', function() {
        });
    });
})();
