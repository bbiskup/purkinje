(function() {
    'use strict';

    describe('test-results-grid-directive tests', function() {
        var elm, scope;


        beforeEach(module('/static/templates/testResultsGrid.html'));
        beforeEach(module('purkinje'));

        beforeEach(inject(function($compile, $rootScope) {
            elm = angular.element('<test-results-grid grid-data="gridData" verdictCounts="verdictCounts"/>');
            scope = $rootScope;
            //scope = elm.isolateScope();

            scope.verdictCounts = {all: 3};
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should display verdict counts', function() {
            // module(function($provide) {
            //     $provide.value('verdictCounts', 100);
            // });

            scope.$apply(function() {
                scope.gridData = [];
                scope.verdictCounts = {
                    all: 100
                };
            });

            // console.debug(elm);

            var isolated = elm.isolateScope();
            chai.expect(isolated.tcCount).to.equal(0);
            chai.expect(isolated.gridData).to.have.length(0);
            chai.expect(isolated.suiteProgress).to.equal(0);
            //chai.expect(isolated.verdictCounts.all).to.equal(0);

            // Needs jQuery, not jqLite, which does not allow querying by ID
            // elm.find('#xyz').eq(0).text().should.equal('other: 0');
            // elm.find('#total-num-test-cases').eq(0).text().should.equal('100');
        });
    });
})();
