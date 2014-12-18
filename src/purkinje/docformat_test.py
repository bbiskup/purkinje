# -*- coding: utf-8 -*-

"""Test document formats for correctness
"""

import os
import pytest
import restructuredtext_lint as rstlint
from conftest import PROJ_DIR

def proj_rst_files():
    for f in os.listdir(PROJ_DIR):
        if f.endswith('.rst'):
            yield f
            

@pytest.mark.parametrize('filename', proj_rst_files)
test_rst_syntax(filename):
    lint_result = rstlint.lint_file(f)
    assert len(lint_result) == 0
