# -*- coding: utf-8 -*-

from __future__ import print_function
from builtins import object

import logging
logger = logging.getLogger(__file__)


class TestMonitorPlugin(object):

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
