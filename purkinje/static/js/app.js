var app = angular.module('purkinje', ['ui.bootstrap', 'tc.chartjs']);
//var app = angular.module('purkinje', []);

app.config(['$interpolateProvider',
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
    }
]);


/**
 * Timing of $digest
 * see http://www.rosher.co.uk/post/Angular-Tips-Measuring-Rendering-Performance
 */
angular.module('purkinje').run(wrapTimerWithDigest);

wrapTimerWithDigest.$inject = ['$rootScope'];

// Run block injection to facilitate testing
// see https://github.com/johnpapa/angularjs-styleguide
function wrapTimerWithDigest($rootScope) {
    var $oldDigest = $rootScope.$digest;
    var $newDigest = function() {
        console.time("$digest");
        $oldDigest.apply($rootScope);
        console.timeEnd("$digest");
    }
    $rootScope.$digest = $newDigest;
}
