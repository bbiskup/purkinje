(function() {
    'use strict';
    /**
     * Wrap underscore.js in an AngularJS module as recommended by
     * https: www.airpair.com/angularjs/posts/top - 10 - mistakes - angularjs - developers - make
     *
     * To use underscore, the depencency must be injected as follows:
     * var app = angular.module('app', ['underscore']);
     *
     * app.controller('MainCtrl', ['$scope', '_', function($scope, _) {
     *   ...
     * }
     */
    var underscore = angular.module('underscore', []);

    underscore.factory('_', function() {
        return window._;
    });
})();
