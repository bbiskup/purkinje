'use strict';


describe('Dashboard', function() {
    var tester;

    beforeEach(function() {
        tester = ngMidwayTester('purkinje'
            // template to host view is set implicitly
            /*{
            template: '<div>' +
                '  <h1>hello</h1>' +
                '  <div id="view-container">' +
                '    <div ng-view></div>' +
                '  </div>' +
                '</div>'
        }*/
        );
    });

    afterEach(function() {
        tester.destroy();
        tester = null;
    });

    it('should be displayed correctly', function() {
        alert("hi1");
        tester.visit('/dashboard', function(done) {
            alert("hi2");
            console.log('hier in visit handler');
            expect(tester.path()).to.equal('/');
            expect(tester.viewElement().html()).to.contain('Purkinje');

            var scope = tester.viewScope();
            expect(scope.title).to.equal('xyz');
            done();
        });
    });
});