;
(function() {
    'use strict'

    angular
        .module('purkinje')
        .controller('TestResultsTableController', ['$scope', 'WebSocketService', 'AvvisoService',
            TestResultsTableController
        ]);

    function TestResultsTableController($scope, WebSocketService, AvvisoService) {

        $scope.clearEvents = function() {
            $scope.gridOptions.data = [];
            setPieData();
        };

        $scope.createDummyData = function() {
            var data = [];
            for (var i = 0; i < 200; ++i) {
                data.push({
                    type: 'tc_finished',
                    verdict: 'pass',
                    name: i + '_dummy_name',
                    file: 'dummy_file',
                    timestamp: 'dummy_timestamp'
                });
            }
            $scope.gridOptions.data = data;
        };

        //AvvisoService.notify('mytitle', 'mybody');
        $scope.gridOptions = {
            infiniteScroll: 20
        };

        $scope.gridOptions.data = [];
        $scope.webSocketEvents = [];
        $scope.dummyPayload = WebSocketService.registerClient();

        $scope.$on('webSocketMsg', function(event, data) {
            handleWebSocketEvent(event, data);
        });

        setResultFilterSelections();
        setPieOptions();


        /**
         * Choices for result filter combo box
         */
        function setResultFilterSelections() {
            $scope.resultFilterSelections = [{
                name: 'pass'
            }, {
                name: 'fail & error'
            }, {
                name: 'skipped'
            }, {
                name: 'all'
            }];
        }

        /**
         * Configuration of verdict pie diagram
         */
        function setPieOptions() {
            $scope.pieOptions = {
                animateRotate: false,
                legend: true,
                legendTemplate: ['<ul class=\"<%=name.toLowerCase()%>-legend\">',
                    '<% for (var i=0; i<segments.length; i++){%>',
                    '<li><span style=\"background-color:<%=segments[i].fillColor%>\"></span>',
                    '<%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
                ].join('')
            };
        }

        /*
         * Set verdict pie diagram categories
         */
        function setPieData() {
            var vc = util.countVerdicts($scope.gridOptions.data);
            $scope.verdictCounts = vc;

            // TODO Chart experiment
            $scope.pieData = [{
                label: 'Pass',
                value: vc.pass || 0,
                color: 'green'
            }, {
                label: 'Fail',
                value: vc.fail || 0,
                color: 'red'
            }, {
                label: 'Error',
                value: vc.error || 0,
                color: '#D4CCC5'
            }];
        }

        function handlews_sessionStarted(data) {
            $scope.gridOptions.data = [];
        }

        function handlews_tcFinished(data) {
            // $scope.gridOptions.data.push(data);
            $scope.gridOptions.data.unshift(data);
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
                console.debug('$scope: webSocketMsg', msg);
                var eventType = msg.type;
                switch (eventType) {
                    case 'session_started':
                        handlews_sessionStarted(msg);
                        break;
                    case 'tc_finished':
                        handlews_tcFinished(msg);
                        break;
                    case 'info':
                        handlews_info(msg);
                        break;
                    default:
                        console.debug('Unsupported event type:', eventType);
                };
            });


            setPieData();
            $scope.$apply();

            var duration = new Date() - start;
            console.debug(
                'msg-handler duration: ' + duration + ' ms');
        }
    }
})();