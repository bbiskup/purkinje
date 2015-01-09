;
(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('ServerSettingsController', ['$scope', ServerSettingsController]);

    function ServerSettingsController($scope) {
        $scope.server = {
            host: 'myhost',
            port: 'myport'
        };
    };
})();
