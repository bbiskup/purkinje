'use strict';
app.controller('DummyController', function($scope) {
    $scope.xyz = "hello";
    //$scope.people = ['Jim', 'Jill', 'Jerome'];
    $scope.people = [{
        name: 'Jim'
    }, {
        name: 'Jeff'
    }, {
        name: 'Jill'
    }, ]
});


app.controller('TestResultsTableController', ['$scope', 'WebSocketService',
    function($scope, WebSocketService) {
        $scope.webSocketEvents = [];
        $scope.dummyPayload = WebSocketService.registerClient();

        $scope.$on('webSocketMsg', function(event, data) {
            var start = new Date();
            console.debug('$scope: webSocketMsg', data);
            $scope.webSocketEvents.push(data);
            if ($scope.webSocketEvents.length > defs.maxDummyMsgScopeLength){
                $scope.webSocketEvents = $scope.webSocketEvents.splice(1);
            }
            $scope.$apply();
            var duration = new Date() - start;
            console.debug('msg-handler duration: ' + duration + ' ms');
        });

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

        $scope.resultFilterSelections = [{
            name: 'pass'
        }, {
            name: 'fail & error'
        }, {
            name: 'skipped'
        }, {
            name: 'all'
        }];

        $scope.clearEvents = function(){
            $scope.webSocketEvents = [];
        }

        $scope.verdictCounts = util.countVerdicts($scope.testResults);
    }
]);
