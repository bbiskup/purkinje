(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('TestResultsTableController', [
            '$scope', 'defs', 'WebSocketService',
            'AvvisoService', 'uiGridConstants', '$filter',
            TestResultsTableController
        ]);

    function TestResultsTableController($scope, defs, WebSocketService, AvvisoService, uiGridConstants, $filter) {
        $scope.tcCount = 0;
        $scope.running = false;

        $scope.clearEvents = function() {
            $scope.gridOptions.data = [];
            $scope.testSuiteName = null;
            $scope.tcCount = 0;
            $scope.suiteProgress = 0;
            $scope.running = false;
        };

        //AvvisoService.notify('mytitle', 'mybody');

        $scope.webSocketEvents = [];

        $scope.$on('webSocketMsg', function(event, data) {
            handleWebSocketEvent(event, data);
        });

        setVerdictChartOptions();
        setDurationChartOptions();


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
            // TODO Chart experiment
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
            DC = defs.DurationClass;

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

        function handlews_sessionStarted(data) {
            $scope.gridOptions.data = [];
            $scope.testSuiteName = data.suite_name;
            $scope.suiteProgress = 0;
            $scope.tcCount = data.tc_count;
            $scope.running = true;
        }

        function handlews_sessionTerminated(data) {
            $scope.suiteProgress = 100;
            $scope.running = false;
        }

        function handlews_tcFinished(data) {
            // $scope.gridOptions.data.push(data);
            $scope.gridOptions.data.unshift(data);
            $scope.suiteProgress = Math.round($scope.gridOptions.data.length / $scope.tcCount * 100);
            /*console.debug('Progress: ',
                $scope.suiteProgress, ' :: ',
                $scope.gridOptions.data.length,
                $scope.tcCount);
            */
        }

        function handlews_info(data) {
            $scope.info = data.id + ': ' + data.text;
        }

        /**
         * Handle events from purkinje server
         */
        function handleWebSocketEvent(event, data) {
            var start = new Date();

            data.forEach(function(msg) {
                msg = JSON.parse(msg);
                // console.debug('$scope: webSocketMsg', msg);
                var eventType = msg.type;
                switch (eventType) {
                    case 'session_started':
                        handlews_sessionStarted(msg);
                        break;
                    case 'tc_finished':
                        handlews_tcFinished(msg);
                        break;
                    case 'session_terminated':
                        handlews_sessionTerminated(msg);
                        break;
                    case 'info':
                        handlews_info(msg);
                        break;
                    default:
                        console.debug('Unsupported event type:', eventType);
                }
            });

            $scope.$watch('gridOptions.data', function() {
                setVerdictChartData();
                setDurationChartData();
            });

            $scope.$apply();

            var duration = new Date() - start;
            // console.debug('msg-handler duration: ' + duration + ' ms');
        }
    }
})();
