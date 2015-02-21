(function() {
    'use strict';

    angular
        .module('purkinje')
        .controller('TestResultsTableController', [
            '$scope', 'defs', 'util', 'WebSocketService',
            'AvvisoService', '$filter',
            '$translate',
            TestResultsTableController
        ]);

    function TestResultsTableController($scope, defs, util, WebSocketService,
        AvvisoService, $filter,
        $translate) {

        $scope.data = [];
        $scope.tcCount = 0;
        $scope.running = false;

        //AvvisoService.notify('mytitle', 'mybody');

        $scope.webSocketEvents = [];

        $scope.$on('webSocketMsg', function(event, data) {
            handleWebSocketEvent(event, data);
        });


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

            $scope.$watch('data', function() {
                $scope.verdictCounts = util.countVerdicts($scope.data);
                $scope.durationCounts = util.classifyDurations($scope.data);
            });

            $scope.$apply();

            var duration = new Date() - start;
        }
    }
})();
