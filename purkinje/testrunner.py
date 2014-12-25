# -*- coding: utf-8 -*-

"""Runner for py.test
"""

from __future__ import print_function
from builtins import object

import pytest
from purkinje_pytest.testmonitorplugin import TestMonitorPlugin


class PyTestRunner(object):

    """py.test runner"""

    def run(self, websocket_url, args):
        """Run py.test
           :args: files/directories to test
           :return: Test result (0: success)
        """
        self.monitor_plugin = TestMonitorPlugin(websocket_url)
        result = pytest.main(args=args,
                             plugins=[self.monitor_plugin])
        return result
