(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('DashboardController', [
            '$scope', 'util', 'WebSocketService',
            '$filter', '$translate',
            DashboardController
        ]);

    function DashboardController($scope, util, WebSocketService,
        $filter, $translate) {

        $scope.data = [];
        $scope.tcCount = 0;
        $scope.running = false;

        $scope.createDummyData = function() {
            var data = [],
                initialTimestamp = (new Date()).getTime(),
                tcCount = 2000;

            watchData();

            handlews_sessionStarted({
                suite_name: 'Dummy Suite',
                tc_count: tcCount
            });
            for (var i = 0; i < tcCount; ++i) {
                handlews_tcFinished({
                    type: 'tc_finished',
                    verdict: 'pass',
                    name: i + '_dummy_name',
                    file: 'dummy_file',
                    timestamp: (new Date(initialTimestamp + i * 1000)).toISOString(),
                    duration: i
                });
            }

            handlews_sessionTerminated();
        };

        $scope.clearEvents = function() {
            if ($scope.data) {
                $scope.data.length = 0;
            }

            $scope.testSuiteName = null;
            $scope.tcCount = 0;
            $scope.suiteProgress = 0;
            $scope.running = false;
        };

        //AvvisoService.notify('mytitle', 'mybody');

        $scope.$on('webSocketMsg', function(event, data) {
            handleWebSocketEvent(event, data);
        });


        $scope.clearEvents();

        function watchData() {
            $scope.$watch('data', function() {
                $scope.verdictCounts = util.countVerdicts($scope.data);
                $scope.durationCounts = util.classifyDurations($scope.data);
            });
        }

        function handlews_sessionStarted(data) {
            $scope.data.length = 0;
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
            $scope.data.unshift(data);
            $scope.suiteProgress = Math.round($scope.data.length / $scope.tcCount * 100);
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

            watchData();
            $scope.$apply();

            var duration = new Date() - start;
        }
    }
})();
