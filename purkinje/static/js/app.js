var app = angular.module('purkinje', ['ui.bootstrap', 'tc.chartjs']);
//var app = angular.module('purkinje', []);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
}]);

