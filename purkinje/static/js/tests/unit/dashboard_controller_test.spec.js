(function() {

    'use strict';

    describe('Dashboard controller', function() {
        var scope, createController, httpBackend, $rootScope;

        beforeEach(module('purkinje'));

        beforeEach(inject(function($controller, _$rootScope_, $httpBackend) {
            $rootScope = _$rootScope_;
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

        it('Handles session start event', function() {
            createController();
            var messages = [JSON.stringify({
                type: "session_started",
                tc_count: 29,
                suite_name: "suite1",
                suite_hash: "62e62cba560e5cb90e89a6af17950051",
                timestamp: "2015-02-22T11:11:57.752338"
            })];
            $rootScope.$broadcast('webSocketMsg', messages);

            scope.testSuiteName.should.equal('suite1');
        });
    });
})();
