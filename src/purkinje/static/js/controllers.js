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


app.controller('TestResultsTableController', function($scope) {
    $scope.testResults = [{
            name: 'test_1',
            file: 'file_1.py',
            verdict: defs.Verdict.PASS
        }, {
            name: 'test_1',
            file: 'file_1.py',
            verdict: defs.Verdict.FAIL
        },

        {
            name: 'test_1',
            file: 'file_1.py',
            verdict: defs.Verdict.PASS
        },

    ];
});
