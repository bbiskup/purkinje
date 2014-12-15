# -*- coding: utf-8 -*-

"""Runner for py.test
"""

import logging
import pytest

logger = logging.getLogger(__file__)


class TestResultMonitorPlugin(object):

    """py.test plugin for monitoring test progress and
       capturing results
    """

    def __init__(self):
        self.reports = []

    def pytest_sessionfinish(self):
        self._log('*** py.test session finished ***')

    def pytest_collectstart(self, collector):
        self._log('pytest_collectstart: %s', collector)

    def pytest_collectreport(self, report):
        self._log('pytest_collectreport: %s', report)
        self.reports.append(report)

    def _log(self, fmt, *args):
        fmt = '** testmon: %s **' % fmt
        print(fmt % args)


class PyTestRunner(object):

    """py.test runner"""

    def run(self, args):
        """Run py.test
           :args: files/directories to test
           :return: Test result (0: success)
        """
        self.monitor_plugin = TestResultMonitorPlugin()
        result = pytest.main(args=args,
                             plugins=[self.monitor_plugin])
        return result
