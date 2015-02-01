(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('AboutController', ['$scope', AboutController]);

    function AboutController($scope) {
        $scope.isLicenseCollapsed = true;

        $scope.licenseToggleText = function() {
            switch ($scope.isLicenseCollapsed) {
                case true:
                    return 'SHOW_LICENSE_BUTTON_TEXT';
                case false:
                    return 'HIDE_LICENSE_BUTTON_TEXT';
                default: break;
            }
        };
    }
})();
