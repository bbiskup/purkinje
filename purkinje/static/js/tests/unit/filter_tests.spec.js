;
(function() {
    'use strict';

    describe('verdictClassFilter', function() {
        var filt;

        beforeEach(function() {
            module('purkinje');

            /*module(function($provide) {
                $provide.filter('verdictClassFilter', 'verdictClassFilter');
            });*/

            /*inject(function($filter) {
                filt = $filter('verdictClassFilter');
            });*/

            inject(function($injector) {
                var $f = $injector.get('$filter');
                filt = $f('verdictClassFilter');
            });
        });


        /*beforeEach(inject(function($injector) {

            var $f = $injector.get('$filter');
            filt = $f('verdictClassFilter');
        }));*/


        it('returns "success" for verdict PASS', function() {
            (filt(defs.Verdict.PASS)).should.equal('success');
        });
    });
})();