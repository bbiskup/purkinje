(function() {
    'use strict';

    describe('test-results-grid-directive tests', function() {
        var $scope, $compile;


        beforeEach(module('/static/templates/testResultsGrid.html'));
        beforeEach(module('purkinje'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $scope.$digest();
        }));

        it('should display verdict counts', function() {
            $.extend($scope, {
                gridData: [],
                verdictCounts: {
                    all: 0
                }
            });

            var template = $compile('<test-results-grid verdict-counts="verdictCounts" gridData="gridData"/>')($scope);

            template.scope().$digest();

            //var templateAsHtml = template.html();
            //console.debug(templateAsHtml);

            var isolated = template.isolateScope();
            isolated.gridOptions.should.have.property('columnDefs').with.length(6);
            isolated.gridOptions.should.have.property('data').with.length(0);
            chai.expect(isolated.verdictCounts).to.deep.equal({all: 0});

            // Needs jQuery, not jqLite, which does not allow querying by ID
            // template.find('#xyz').eq(0).text().should.equal('other: 0');

            // Not shown if no test data
            template.find('#total-num-test-cases').should.have.length(0);
        });
    });
})();
