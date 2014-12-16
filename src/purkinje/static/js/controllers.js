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

        $scope.dummyPayload = WebSocketService.getDummyPayload();

        $scope.$on('webSocketMsg', function(event, data){
            console.debug('$scope: webSocketMsg', data);
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

        $scope.verdictCounts = util.countVerdicts($scope.testResults);
    }
]);
