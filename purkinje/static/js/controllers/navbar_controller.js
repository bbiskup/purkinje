(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('NavBarController', ['$scope', '$state', NavBarController]);


    /**
     * This controller handles the state of the navigation bar.
     *
     * It gives access to the current ui-router routing state to
     * highlight the corresponding navigation menu item
     */
    function NavBarController($scope, $state) {

        $scope.isActive = function(stateName) {
            return $state.current.name === stateName;
        };
    }
})();
