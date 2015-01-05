'use strict';

describe('purkinje module', function() {
    var module;
    beforeEach(function() {
        module = angular.module('purkinje');
    });

    it('should be registered', function() {
        //expect(module).should.not.equal(null);
        chai.expect(module).not.to.equal(null);
    });

    describe('Dependencies', function() {
        var deps;

        var hasModule = function(m) {
            return deps.indexOf(m) >= 0;
        };

        var checkDep = function(m) {
            it('should have ' + m + ' as a dependency', function() {
                chai.expect(hasModule(m));
            });
        }

        beforeEach(function() {
            deps = module.value('purkinje').requires;
        });

        checkDep('ui.bootstrap');
        checkDep('ui.router');
        checkDep('ui.grid');
        checkDep('tc.chartjxs');
    });
});


describe('Dashboard routes', function() {
    var tester;
    //, _$state_;

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

        /*inject(function($state){
            _$state_ = $state;
        });*/
    });

    afterEach(function() {
        tester.destroy();
        tester = null;
    });


    it('should have working dashboard route', function(){

    });

    it('should be displayed correctly', function() {
        tester.visit('/dashboard', function(done) {
            console.log('hier in visit handler');
            expect(tester.path()).to.equal('/');
            expect(tester.viewElement().html()).to.contain('Purkinje');

            var scope = tester.viewScope();
            expect(scope.title).to.equal('xyz');
            done();
        });
    });
});