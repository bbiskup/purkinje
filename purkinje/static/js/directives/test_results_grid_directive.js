(function() {
    'use strict';

    /**
     * Displays test results
     */
    angular
        .module('purkinje')
        .directive('testResultsGrid', ['uiGridConstants', '$translate', '$filter', TestResultsGrid]);

    function TestResultsGrid(uiGridConstants, $translate, $filter) {
        var directive = {
            restrict: 'E',
            templateUrl: '/static/templates/testResultsGrid.html',
            scope: {
                gridData: '=',
                verdictCounts: '='
            },
            controller: ['$scope', 'util', 'uiGridConstants',
                function($scope, util, uiGridConstants) {
                    $scope.gridOptions = {
                        enableFiltering: true,
                        infiniteScroll: 20,
                        data: $scope.gridData,
                        columnDefs: columnDefs()
                    };

                    $scope.hasData = function(){
                        return $scope.gridOptions.data.length > 0;
                    };

                    $scope.createDummyData = function() {
                        var data = [],
                            initialTimestamp = (new Date()).getTime(),
                            tcCount = 2000;
                        for (var i = 0; i < tcCount; ++i) {
                            data.push({
                                type: 'tc_finished',
                                verdict: 'pass',
                                name: i + '_dummy_name',
                                file: 'dummy_file',
                                timestamp: (new Date(initialTimestamp + i * 1000)).toISOString(),
                                duration: i
                            });
                        }
                        $scope.tcCount = tcCount;
                        $scope.suiteProgress = 100; // adding all results at once
                        $scope.testSuiteName = 'Dummy Test Suite';
                        $scope.gridOptions.data = data;
                        $scope.verdictCounts = {
                            all: tcCount,
                            pass: tcCount
                        };
                    };

                    $scope.clearEvents = function() {
                        if ($scope.gridOptions.data) {
                            $scope.gridOptions.data.length = 0;
                        }

                        $scope.testSuiteName = null;
                        $scope.tcCount = 0;
                        $scope.suiteProgress = 0;
                        $scope.running = false;
                    };

                    $scope.extGrid = {
                        verdictClassFilter: $filter('verdictClassFilter')
                    };

                    $scope.clearEvents();
                }
            ]
        };

        return directive;

        /**
         * Column definitions for UI grid
         */
        function columnDefs() {
            return [{
                field: 'type',
                visible: false
            }, {
                field: 'name',
                headerCellFilter: 'translate',
                cellTemplate: [
                    '<div class="ngCellText" title="{[ row.entity[col.field ] ]}">',
                    '  {[ row.entity[col.field ] ]}',
                    '</div>'
                ].join('')
            }, {
                field: 'file',
                headerCellFilter: 'translate',
                cellTemplate: [
                    '<div class="ngCellText" ',
                    '     title="{[ row.entity[col.field ] ]}">',
                    '  {[ row.entity[col.field ] ]}',
                    '</div>'
                ].join('')
            }, {
                field: 'verdict',
                width: 90,
                headerCellFilter: 'translate',
                cellTemplate: [
                    '<div class="ngCellText verdict ',
                    '     verdict-{[row.entity[col.field]]}  colt{[$index]}">',
                    '  {[ row.entity[col.field ] || \'&nbsp;\' ]}',
                    '</div>'
                ].join('')
            }, {
                field: 'duration',
                width: 120,
                headerCellFilter: 'translate',
                cellTemplate: [
                    '<div class="ngCellText grid-cell-numeric duration ',
                    '     duration-{[row.entity.durationClass]}  colt{[$index]}">',
                    '  {[ row.entity[col.field] ]}',
                    '</div>'
                ].join(''),
                filters: [{
                    condition: uiGridConstants.filter.GREATER_THAN,
                    placeholder: $translate.instant('PLACEHOLDER_GREATER_THAN')
                }, {
                    condition: uiGridConstants.filter.LESS_THAN,
                    placeholder: $translate.instant('PLACEHOLDER_LESS_THAN')
                }]
            }, {
                field: 'timestamp',
                width: 200,
                // visible: false,
                enableFiltering: null,
                headerCellFilter: 'translate',
                cellTemplate: [
                    '<div class="ngCellText colt{[$index]}">',
                    '{[ row.entity[col.field] | date : "medium" ]}',
                    '</div>'
                ].join(''),
                sort: {
                    direction: uiGridConstants.DESC,
                    priority: 1
                },
            }];
        }
    }
})();
