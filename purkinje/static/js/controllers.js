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
    function setDummyTestResults($scope) {
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
    };

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

    function setPieData($scope) {
        var vc = util.countVerdicts($scope.testResults)
        $scope.verdictCounts = vc

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

    app.controller('TestResultsTableController', ['$scope', 'WebSocketService',

        function($scope, WebSocketService) {
            $scope.webSocketEvents = [];
            $scope.dummyPayload = WebSocketService.registerClient();

            $scope.$on('webSocketMsg', function(event, data) {
                var start = new Date()
                console.debug('$scope: webSocketMsg', data);
                $scope.webSocketEvents.push(data);
                if ($scope.webSocketEvents.length > defs.maxDummyMsgScopeLength) {
                    $scope.webSocketEvents = $scope.webSocketEvents.splice(1);
                }
                $scope.$apply()
                var duration = new Date() - start;
                console.debug(
                    'msg-handler duration: ' + duration + ' ms');
            });


            $scope.clearEvents = function() {
                $scope.webSocketEvents = [];
            };

            setDummyTestResults($scope);
            setResultFilterSelections($scope);
            setPieData($scope);
        }
    ]);
})();
