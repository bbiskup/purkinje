var app = angular.module('purkinje', ['ui.bootstrap']);
//var app = angular.module('purkinje', []);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
}]);

