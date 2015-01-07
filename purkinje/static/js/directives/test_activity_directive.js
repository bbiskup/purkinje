;
(function() {
    'use strict';

    angular
        .module('purkinje')
        .directive('testProgressIndicator', testProgressIndicator);

    /**
    * Visual feedback about test execution
    */
    function testProgressIndicator(){
        var directive = {
            restrict: 'E',
            template: '--TODO testProgressIndicator directive --'
        };
        return directive;
    }
})();