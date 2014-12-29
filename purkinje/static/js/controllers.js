'use strict'
app.controller('DummyController', function($scope) {
    $scope.xyz = "hello"
    //$scope.people=['Jim', 'Jill', 'Jerome']
    $scope.people = [{
        name: 'Jim'
    }, {
        name: 'Jeff'
    }, {
        name: 'Jill'
    }, ]
});


;
(function() {
    /*function setDummyTestResults($scope) {
        $scope.testResults = [{
            name: 'test_1',
            file: 'file_1.py',
            verdict: defs.Verdict.PASS
        }, {
            name: 'test_2',
            file: 'file_2.py',
            verdict: defs.Verdict.FAIL
        }, {
            name: 'test_3',
            file: 'file_3.py',
            verdict: defs.Verdict.PASS
        }, ];
    };*/

    /**
     * Choices for result filter combo box
     */
    function setResultFilterSelections($scope) {
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
    function setPieOptions($scope) {
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
    function setPieData($scope) {
        var vc = util.countVerdicts($scope.testResults);
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

    function handlews_sessionStarted($scope, data) {
        $scope.testResults = [];
    }

    function handlews_tcFinished($scope, data) {
        $scope.testResults.push(data);
    }

    function handlews_info($scope, data) {
        $scope.info = data.id + ': ' + data.text;
    }

    /**
     * Handle events from purkinje server
     */
    function handleWebSocketEvent($scope, event, data) {
        var start = new Date()
        console.debug('$scope: webSocketMsg', data);
        var eventType = data.type;
        switch (eventType) {
            case 'session_started':
                handlews_sessionStarted($scope, data);
                break;
            case 'tc_finished':
                handlews_tcFinished($scope, data);
                break;
            case 'info':
                handlews_info($scope, data);
                break;
            default:
                console.debug('Unsupported event type:', eventType);
        };

        setPieData($scope);
        $scope.$apply();

        var duration = new Date() - start;
        console.debug(
            'msg-handler duration: ' + duration + ' ms');
    }

    app.controller('TestResultsTableController', ['$scope', 'WebSocketService', 'AvvisoService',

        function($scope, WebSocketService, AvvisoService) {
            //AvvisoService.notify('mytitle', 'mybody');


            $scope.testResults = [];
            $scope.webSocketEvents = [];
            $scope.dummyPayload = WebSocketService.registerClient();

            $scope.$on('webSocketMsg', function(event, data) {
                handleWebSocketEvent($scope, event, data);
            });


            $scope.clearEvents = function() {
                $scope.testResults = [];
                setPieData($scope);
            };

            //setDummyTestResults($scope);
            setResultFilterSelections($scope);
            setPieOptions($scope);
        }
    ]);
})();
