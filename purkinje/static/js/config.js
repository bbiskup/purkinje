(function() {
    'use strict';

    angular.module('purkinje').config(['$interpolateProvider',
        configInterpolateProvider
    ]);

    function configInterpolateProvider($interpolateProvider) {
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
    }
})();
