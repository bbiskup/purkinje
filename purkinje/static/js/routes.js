(function() {
    'use strict';
    angular.module('purkinje').config(['$stateProvider', '$urlRouterProvider',
        configRouting
    ]);

    function configRouting($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        var tmplPrefix = '/static/templates';

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: tmplPrefix + '/partial-dashboard.html'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: tmplPrefix + '/partial-settings.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: tmplPrefix + '/partial-about.html'
            });
    }
})();
