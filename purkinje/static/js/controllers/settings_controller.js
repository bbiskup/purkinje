(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('SettingsController', ['$scope', '$http', SettingsController]);

    function SettingsController($scope, $http) {

        $http.get('/api/server_info')
            .success(function(data) {
                $scope.server = data;
            });
    }
})();
