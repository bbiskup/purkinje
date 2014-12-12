window.util = {
    /**
     * Computes counts of verdicts to display summary
     */
    countVerdicts: function(testResults) {
        return _.countBy(testResults, function(item) {
            return item.verdict;
        });
    }
};
