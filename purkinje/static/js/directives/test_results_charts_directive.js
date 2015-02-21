(function() {
    'use strict';

    /**
     * Visual summary of test results
     */
    angular
        .module('purkinje')
        .directive(
            'testResultsCharts', ['defs', '$translate', TestResultCharts]);

    function TestResultCharts(defs, $translate) {
        var directive = {
            restrict: 'E',
            templateUrl: '/static/templates/testResultCharts.html',
            scope: {
                tcCount: '=',
                verdictCounts: '=',
                durationCounts: '='
            },
            controller: ['$scope',
                function($scope) {
                    setVerdictChartOptions();
                    setDurationChartOptions();


                    $scope.$watch('verdictCounts', function() {
                        setVerdictChartData();
                    });

                    $scope.$watch('durationCounts', function() {
                        setDurationChartData();
                    });

                    /**
                     * Configuration of verdict chart
                     */
                    function setVerdictChartOptions() {
                        $scope.verdictChartOptions = {
                            animateRotate: false,
                        };
                    }

                    /**
                     * Configuration of duration chart
                     */
                    function setDurationChartOptions() {
                        $scope.durationChartOptions = {
                            animateRotate: false
                        };
                    }

                    /*
                     * Set verdict chart categories
                     */
                    function setVerdictChartData() {
                        var vc = $scope.verdictCounts;
                        if (!vc) {
                            return;
                        }
                        $scope.verdictChartData = [{
                            label: 'Pass',
                            value: vc.pass || 0,
                            color: '#5cb85c'
                        }, {
                            label: 'Fail',
                            value: vc.fail || 0,
                            color: '#c12e2a'
                        }, {
                            label: 'Error',
                            value: vc.error || 0,
                            color: '#D4CCC5'
                        }, {
                            label: 'Skipped',
                            value: vc.skipped || 0,
                            color: '#e0e0e0'
                        }];
                    }

                    /*
                     * Set verdict chart categories
                     */
                    function setDurationChartData() {
                        var DC = defs.DurationClass,
                            durationCounts = $scope.durationCounts;

                        if (!durationCounts) {
                            return;
                        }

                        /* TODO dry (see default.css .duration-label-xxx) */
                        $scope.durationChartData = [{
                            label: 'Fast',
                            value: durationCounts[DC.FAST] || 0,
                            color: 'AquaMarine'
                        }, {
                            label: 'Normal',
                            value: durationCounts[DC.NORMAL] || 0,
                            color: 'MediumAquaMarine'
                        }, {
                            label: 'Slow',
                            value: durationCounts[DC.SLOW] || 0,
                            color: 'Bisque'
                        }, {
                            // TODO: make sure labels don't get clipped
                            label: 'Slowest',
                            value: durationCounts[DC.SLOWEST] || 0,
                            color: 'DarkSalmon'
                        }];
                    }
                }
            ]
        };
        return directive;
    }
})();
