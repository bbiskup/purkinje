;
(function() {
    'use strict';

    describe('verdictClassFilter', function() {
        var filt;

        beforeEach(function() {
            // crucial
            module('purkinje');

            inject(function($filter) {
                filt = $filter('verdictClassFilter');
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
            (filt(defs.Verdict.PASS)).should.equal('success');
        });

        it('returns "error" for verdict FAIL', function() {
            (filt(defs.Verdict.FAIL)).should.equal('danger');
        });
    });
})();