(function() {
    'use strict';

    describe('Dashboard page', function() {
        beforeEach(function() {
            // TODO actual E2E test URL
            browser.get('/');
            //browser().reload();
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

        it('Initially in idle state', function() {
            var elem = element(by.id('test-progress'));
            expect(elem.getText()).toBe('State:\nIdle');
        });

        it('Initially no test results', function() {
            var elems = element.all(by.css('.ui-grid-row')).then(function() {
                expect(elems).toBe(undefined);
            });
        });


        // Disabled for now (since button is not visible by default)
        //
        // it('Test results available after generating test data', function() {
        //     var button = element(by.id('create-dummy-data-button'));

        //     button.click();
        //     // browser.pause();
        //     // browser.wait(element(by.css('.ui-grid-row')).isPresent);
        //     /*var elems = element.all(by.css('.ui-grid-row')).then(function() {
        //         expect(elems).not.toBe(undefined);
        //         expect(elems.length).toBe(2000);
        //     });*/

        //     element.all(by.css('.ui-grid-row')).count().then(function(theCount) {
        //         expect(theCount).toBeGreaterThan(0);
        //     });

        //     var numTC = element(by.id('total-num-test-cases'));
        //     expect(numTC.getText()).toBe('Total number of test cases: 2000');

        //     button = element(by.id('clear-dummy-data-button'));
        //     button.click();
        //     expect(numTC.isPresent()).toBe(false);
        //     element.all(by.css('.ui-grid-row')).count().then(function(theCount) {
        //         expect(theCount).toBe(0);
        //     });

        // });
    });
})();
