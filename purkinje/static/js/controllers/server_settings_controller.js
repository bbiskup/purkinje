(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('ServerSettingsController', ['$scope', '$http', ServerSettingsController]);

    function ServerSettingsController($scope, $http) {

        $http.get('/api/server_info')
            .success(function(data) {
                $scope.server = data;
            });
    }
})();
