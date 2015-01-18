(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('AboutController', ['$scope', AboutController]);

    function AboutController($scope) {
        $scope.isLicenseCollapsed = true;

        $scope.licenseToggleText = function(){
            switch($scope.isLicenseCollapsed){
                case true:
                    return 'Show license';
                    break;
                case false:
                    return 'Hide license';
                    break;
            }
        };
    }
})();