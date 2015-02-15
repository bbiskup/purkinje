(function() {
    'use strict';

    describe('test-results-grid-directive tests', function(){
        beforeEach(module('purkinje'));

        it('should display verdict counts', function(){
            module(function($provide){
                $provide.value('verdictCounts', 100);
            });

            inject(function($compile, $rootScope){
                var element = $compile('<div test-results-grid gridData="gridData"></div>')($rootScope);
                $('#total-num-test-cases').should.equal('100');
            });
        });
    })
})();
