""" Tests for py.test test runner
"""

import os
import shutil
import tempfile
import pytest
from conftest import TESTDATA_DIR
from testrunner import PyTestRunner


@pytest.fixture
def testrunner():
    return PyTestRunner()


def test_empty_single_pass(tmpdir, testrunner):
    test_proj_path = str(tmpdir) + '/singlepass'
    shutil.copytree(TESTDATA_DIR + '/testproj/singlepass',
                    test_proj_path)

    orig_path = os.getcwd()
    try:
        os.chdir(test_proj_path)
        test_result = testrunner.run(['simple_test.py'])
        assert test_result == 0
        assert len(testrunner.monitor_plugin.reports) == 2
    finally:
        os.chdir(orig_path)
