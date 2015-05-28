# -*- coding: utf-8 -*-

"""Miscellaneous tests about code quality"""

import subprocess
import pytest

MAX_MCCABE_COMPLEXITY = 10


@pytest.mark.slow
def test_mccabe():
    # TODO Test remove test case? (Now performed with tox tests)
    cmd = 'flake8 --ignore=E402 --max-complexity={0} purkinje'\
        .format(MAX_MCCABE_COMPLEXITY)
    result = subprocess.call(cmd.split())
    assert result == 0, 'McCabe check seems to have failed'
