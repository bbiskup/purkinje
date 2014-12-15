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

    # TODO
    # Deletion of __pycache__ is necessary, or py.test will fail with the
    # following error message:
    #
    # import file mismatch:
    # imported module 'simple_test' has this __file__ attribute:
    #   /home/bb/devel/python/purkinje/testdata/testproj/singlepass/simple_test.py
    # which is not the same as the test file we want to collect:
    #   /tmp/pytest-84/test_empty_single_pass0/singlepass/simple_test.py
    # HINT: remove __pycache__ / .pyc files and/or use a unique basename
    #  for your test file modules
    shutil.rmtree(test_proj_path + '/__pycache__')

    orig_path = os.getcwd()
    try:
        os.chdir(test_proj_path)
        test_result = testrunner.run([test_proj_path])
        assert test_result == 0
        assert len(testrunner.monitor_plugin.reports) == 2
    finally:
        os.chdir(orig_path)
