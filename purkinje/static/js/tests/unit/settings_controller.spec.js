(function() {

    'use strict';

    describe('Settings controller', function() {
        var scope, createController, httpBackend;

        beforeEach(module('purkinje'));

        beforeEach(inject(function($controller, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;

            createController = function() {
                return $controller('SettingsController', {
                    $scope: scope,

                    // DON'T pass in; gives "$http.get undefined"
                    //$http: $httpBackend
                });
            };
        }));

        it('Assigns server information correctly', function() {
            var serverData = {
                "directory": "/mydir",
                "host": "i5",
                "user": "bb"
            };

            httpBackend.expectGET('/api/server_info').respond(200, serverData);
            createController();
            httpBackend.flush();

            chai.expect(scope.server).to.deep.equal(serverData);
        });
    });
})();
