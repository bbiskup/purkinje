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
angular.module('purkinje').run(['$rootScope',
    function($rootScope) {
        var $oldDigest = $rootScope.$digest;
        var $newDigest = function() {
            console.time("$digest");
            $oldDigest.apply($rootScope);
            console.timeEnd("$digest");
        }
        $rootScope.$digest = $newDigest;
    }
]);
