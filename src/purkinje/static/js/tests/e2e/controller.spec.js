'use strict';

describe('E2E: test 1', function() {
    beforeEach(function() {
        browser().navigateTo('/');
        //browser().reload();
    });


    /*it("Dummy test 1", function() {
        expect('1').toBe('1');
    });*/

    it("Dummy DOM test", function() {
        expect(element('#test-results-header').html()).toBe('Test Results');
    });


    /*
    var selector = '#result-summary';
    it("should have the title set", function() {
        expect(browser().getTitle()).toEqual('Purkinje Test Runner');
    });*/
});