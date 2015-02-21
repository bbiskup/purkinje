(function() {
    'use strict';

    describe('Settings page', function() {
        beforeEach(function() {
            browser.get('/#/settings');
        });

        it('Headline set', function() {
            var elem = element(by.id('settings-headline'));
            expect(elem.getText()).toBe('Settings');
        });

        it('Settings table present', function() {
            element(by.id('settings-settings-table')).isPresent();
        });
    });
})();
