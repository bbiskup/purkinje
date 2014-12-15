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

    def pytest_sessionfinish(self):
        self._log('*** py.test session finished ***')

    def pytest_collectstart(self, collector):
        self._log('pytest_collectstart: %s', collector)

    def pytest_collectreport(self, report):
        self._log('pytest_collectreport: %s', report)

    def _log(self, fmt, *args):
        fmt = '** testmon: %s **' % fmt
        print(fmt % args)


class PyTestRunner(object):

    """py.test runner"""

    def __init__(self):
        pass

    def run(self):
        """Run py.test
        """
        mon = TestResultMonitorPlugin()
        result = pytest.main(plugins=[mon])
