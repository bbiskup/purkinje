# -*- coding: utf-8 -*-

"""Miscellaneous tests about code quality"""

import subprocess

MAX_MCCABE_COMPLEXITY = 10


def test_mccabe():
    cmd = 'flake8 --max-complexity=%d purkinje' % MAX_MCCABE_COMPLEXITY
    result = subprocess.call(cmd.split())
    assert result == 0, 'McCabe check seems to have failed'
