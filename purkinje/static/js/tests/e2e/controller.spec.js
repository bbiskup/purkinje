(function() {
    'use strict';

    describe('E2E: test 1', function() {
        beforeEach(function() {
            // TODO actual E2E test URL
            browser.get('/');
            //browser().reload();
        });


        it('Dummy test 1', function() {
            expect('1').toBe('1');
        });

        it('Dummy test without DOM', function() {
            expect(3).toEqual(3);
        });

        /*it('Dummy DOM test', function() {
            expect(element(by.css('#test-results-header'))).getText().toBe('Test Results');
        });*/

        it('should have the title set', function() {
            expect(browser.getTitle()).toEqual('Purkinje Test Runner');
        });

        it('Initially no test suite', function() {
            var elem = element(by.id('test-suite-header'));
            expect(elem.getText()).toBe('No test suite');
            // expect(elem).toHaveClass('testsuite-header-inactive');
        });
    });
})();
