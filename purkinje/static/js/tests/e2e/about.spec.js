(function() {
    'use strict';

    describe('About page', function() {
        beforeEach(function() {
            browser.get('/#/about');
        });

        it('Github link present', function() {
            element.all(by.id('purkinje-github-link')).count().then(function(theCount) {
                expect(theCount).toBeGreaterThan(0);
            });
        });

        it('License info present', function() {
            element.all(by.css('.license-info')).count().then(function(theCount) {
                expect(theCount).toBeGreaterThan(0);
            });
        });
    });
})();
