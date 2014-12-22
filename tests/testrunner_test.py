# -*- coding: utf-8 -*-
""" Tests for py.test test runner
"""
from __future__ import absolute_import
from builtins import str

import os
import pytest
import shutil
import json
from mock import patch, Mock
from .conftest import TESTDATA_DIR
from purkinje import testmonitorplugin
from purkinje.testrunner import PyTestRunner
import purkinje.util as pu


@pytest.fixture
def testrunner():
    return PyTestRunner()


def test_empty_single_pass(tmpdir, testrunner):
    test_proj_path = str(tmpdir) + '/singlepass'
    shutil.copytree(TESTDATA_DIR + '/testproj/singlepass',
                    test_proj_path)

    # TODO
    # Deletion of __pycache__ is necessary, or py.test will fail with the
    # following error message:
    #
    # import file mismatch:
    # imported module 'simple_test' has this __file__ attribute:
    #   /home/bb/devel/python/purkinje/testdata/
    #     testproj/singlepass/simple_test.py
    # which is not the same as the test file we want to collect:
    #   /tmp/pytest-84/test_empty_single_pass0/singlepass/simple_test.py
    # HINT: remove __pycache__ / .pyc files and/or use a unique basename
    #  for your test file modules
    pu.ensure_deleted(test_proj_path + '/__pycache__')

    orig_path = os.getcwd()
    try:
        os.chdir(test_proj_path)
        mock_ws = Mock()
        with patch.object(testmonitorplugin, 'websocket') as ws:
            ws.WebSocket = Mock(return_value=mock_ws)
            test_result = testrunner.run("ws://dummy_websocket_url",
                                         [test_proj_path])
            assert testrunner.monitor_plugin.is_websocket_connected()

            ws.WebSocket.assert_called_once_with(
                'ws://dummy_websocket_url')

            send_args = mock_ws.send.call_args_list
            assert len(send_args) == 2

            [json.dumps(x[0]) for x in send_args]

        assert test_result == 0

        reps = testrunner.monitor_plugin.reports
        assert len(reps) == 2
        rep0 = reps[0]
        assert rep0.fspath == '.'
        assert rep0.outcome == 'passed'

        rep1 = reps[1]
        assert rep1.fspath == 'simple_test.py'
        assert rep1.outcome == 'passed'

    finally:
        os.chdir(orig_path)
