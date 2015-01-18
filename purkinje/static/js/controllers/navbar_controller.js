(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('NavBarController', ['$rootScope', '$scope', '$state', NavBarController]);


    /**
     * This controller handles the state of the navigation bar.
     *
     * It gives access to the current ui-router routing state to
     * highlight the corresponding navigation menu item
     */
    function NavBarController($rootScope, $scope, $state) {

        $scope.isActive = function(stateName) {
            return $state.current.name === stateName;
        };

        $rootScope.$on('webSocketStateChange', function(event, url, state){
            console.debug('webSocketStateChange: ', url, state);

            switch(state){
                case WebSocket.OPEN:
                    $scope.connectedClass = 'connection-established';
                    $scope.connectionStateTitle = 'Connected';
                    $scope.isConnected = true;
                    break;
                default:
                    $scope.connectionStateTitle = 'Disconnected';
                    $scope.connectedClass = 'connection-closed';
                    $scope.isConnected = false;
            }
        });
    }
})();
