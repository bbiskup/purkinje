(function() {

    'use strict';

    describe('Dashboard controller', function() {
        var scope, createController, httpBackend;

        beforeEach(module('purkinje'));

        beforeEach(inject(function($controller, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;

            createController = function() {
                return $controller('DashboardController', {
                    $scope: scope
                });
            };
        }));

        it('Sets initial data correctly', function() {
            createController();
            scope.data.should.have.length(0);
            scope.tcCount.should.equal(0);
            scope.running.should.equal(false);
        });
    });
})();
