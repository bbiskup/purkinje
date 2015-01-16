(function() {

    'use strict';

    describe('Simple unit test', function() {
        it('1 + 1 should be 2', function() {
            chai.expect(1).to.equal(1);
            chai.assert.equal(1, 1);
        });

        it('1 + 1 should be 2', function() {
            //expect(1).to.equal(1);
            //assert.equal(1, 1);
            [1, 2, 3].indexOf(0).should.equal(-1);
        });
    });
})();
