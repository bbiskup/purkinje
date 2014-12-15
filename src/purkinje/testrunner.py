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
        logger.debug('*** py.test session finished ***')


class PyTestRunner(object):

    """py.test runner"""

    def __init__(self):
        pass

    def run(self):
        """Run py.test
        """
        mon = TestResultMonitorPlugin()
        result = pytest.main(plugins=[mon])
