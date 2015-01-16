(function() {

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
            };

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
        //, _$state_, _$urlRouterProvider_;

        beforeEach(function() {
            module('purkinje');
            tester = ngMidwayTester('purkinje');

            /*inject(function($state, $urlRouterProvider) {
            _$state_ = $state,
            _$urlRouterProvider_ = $urlRouterProvider;
        });*/
        });

        afterEach(function() {
            tester.destroy();
            tester = null;
        });


        /*
    it('should have working dashboard route', function() {

    });
*/

        /*
    it('should be displayed correctly', function(done) {
        tester.visit('/dashboard', function() {
            alert("HIER");
            console.log('hier in visit handler');
            tester.path().should.eq('/');

            expect(tester.viewElement().html()).to.contain('Purkinje');

            var scope = tester.viewScope();
            expect(scope.title).to.equal('xyz');

            var current = tester.inject('$route').current;
            var controller = current.controller;
            var params = current.params;
            var scope = current.scope;
            expect(controller).to.equal('TestResultController');

            done();
        });
    }); */
    });
})();
