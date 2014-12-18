'use strict';

describe('E2E: test 1', function() {
    beforeEach(function() {
        // TODO actual E2E test URL
        browser.get('http://localhost:5000/');
        //browser().reload();
    });


    /*it("Dummy test 1", function() {
        expect('1').toBe('1');
    });*/

    it("Dummy DOM test", function() {
        //expect(element(by.css('#test-results-header'))).getText().toBe('Test Results');
        expect(3).toEqual(3);
    });

    /*
    var selector = '#result-summary';
    it("should have the title set", function() {
        expect(browser().getTitle()).toEqual('Purkinje Test Runner');
    });*/

});