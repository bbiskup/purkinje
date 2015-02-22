(function() {
    'use strict';

    angular
        .module('purkinje')
        .directive('testProgressIndicator', testProgressIndicator);

    /**
     * Visual feedback about test execution
     */
    function testProgressIndicator() {
        var directive = {
            restrict: 'E',
            templateUrl: '/static/templates/testProgressIndicator.html',
            scope: {
                state: '='
            }
        };
        return directive;
    }
})();
