;
(function() {
    'use strict';

    window.util = {
        /**
         * Computes counts of verdicts to display summary
         */
        countVerdicts: function(testResults) {
            var result = _.countBy(testResults, function(item) {
                return item.verdict;
            });
            result.all = testResults.length;
            return result;
        },

        /**
         * Classify test case executions as fast, slow, ...
         * based on the distribution of durations.
         *
         * return: dictionary of duration class : count
         */
        classifyDurations: function(testResults) {
            var durations = _.pluck(testResults, 'duration'),
                meanDuration = ss.mean(durations),
                durationSD = ss.standard_deviation(durations),
                DC = defs.DurationClass;

            var normal_lowerThresh = meanDuration - durationSD;
            var slow_lowerThresh = meanDuration + 2 * durationSD;
            var verySlow_slowThresh = meanDuration + 3 * durationSD;

            _.each(testResults, function(item) {
                var durationClass,
                    duration = item.duration;

                if (duration < normal_lowerThresh) {
                    durationClass = DC.FAST;
                } else if (duration < slow_lowerThresh) {
                    durationClass = DC.NORMAL;
                } else if (duration < verySlow_slowThresh) {
                    durationClass = DC.SLOW;
                } else {
                    durationClass = DC.VERY_SLOW;
                }
                item.durationClass = durationClass;
            });

            var result = _.countBy(testResults, function(item) {
                return item.durationClass;
            });
            console.debug('Duration classification:', meanDuration, durationSD, result);
            console.debug('\tnormal lower threshold:', normal_lowerThresh);
            console.debug('\tslow lower threshold:', slow_lowerThresh);
            console.debug('\tvery slow lower threshold:', verySlow_slowThresh);
            return result;
        }
    };
})();