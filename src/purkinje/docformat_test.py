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


def _format_rst_lint_errors(errors):
    return ['{}: {}'.format(x.line,
                            x.full_message)
            for x in errors]


@pytest.mark.parametrize('filename', proj_rst_files())
def test_rst_syntax(filename):
    lint_result = rstlint.lint_file(filename)
    error_msg = '{}: {}'.format(
        filename,
        _format_rst_lint_errors(lint_result))
    assert len(lint_result) == 0, error_msg
