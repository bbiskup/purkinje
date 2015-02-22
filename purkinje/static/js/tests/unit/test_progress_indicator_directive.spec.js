(function() {
    'use strict';

    describe('test-progress-indicator directive tests', function() {
        var $scope,
            $compile,
            templateStr = '<test-progress-indicator state="state"/>';

        beforeEach(module('/static/templates/testProgressIndicator.html'));
        beforeEach(module('purkinje'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $scope.$digest();
        }));

        it('Active state should be reflected correctly', function() {
            $.extend($scope, {
                state: true
            });

            var template = $compile(templateStr)($scope);
            template.scope().$digest();

            var isolated = template.isolateScope();
            isolated.state.should.equal(true);

            template.find('.activity-indicator-running').should.have.length(1);
            template.find('blink').should.have.length(1);
            template.find('blink').text().should.equal('Running...');
            template.find('.activity-indicator-idle').should.have.length(0);
        });

        it('Idle state should be reflected correctly', function() {
            $.extend($scope, {
                state: false
            });

            var template = $compile(templateStr)($scope);
            template.scope().$digest();

            var isolated = template.isolateScope();
            isolated.state.should.equal(false);

            template.find('.activity-indicator-running').should.have.length(0);
            template.find('.activity-indicator-idle').should.have.length(1);
            template.find('.activity-indicator-idle').text().should.equal('Idle');
        });
    });
})();
