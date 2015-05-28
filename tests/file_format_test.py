# -*- coding: utf-8 -*-

"""Test document formats for correctness
"""
from __future__ import absolute_import

import os
import os.path as op
import json
import yaml
import pytest
import restructuredtext_lint as rstlint
from .conftest import PROJ_DIR

DIRS = [PROJ_DIR]


def proj_files(suffix):
    for dir in DIRS:
        for f in os.listdir(dir):
            path = op.join(dir, f)
            if path.endswith(suffix):
                yield path


def _format_rst_lint_errors(errors):
    return ['{0}: {1}'.format(x.line,
                              x.full_message)
            for x in errors]


@pytest.mark.parametrize('filename', proj_files('.rst'))
def test_rst_syntax(filename):
    lint_result = rstlint.lint_file(filename)
    error_msg = '{0}: {1}'.format(
        filename,
        _format_rst_lint_errors(lint_result))
    assert len(lint_result) == 0, error_msg


@pytest.mark.parametrize('filename', proj_files('.yml'))
def test_yaml_syntax(filename):
    with open(filename) as f:
        # coerce to force evaluation of generator
        list(yaml.parse(f))


@pytest.mark.parametrize('filename',
                         list(proj_files('.json')) + ['.jshintrc',
                                                      'bower.json',
                                                      'package.json'])
def test_json_syntax(filename):
    with open(filename) as f:
        # coerce to force evaluation of generator
        list(json.loads(f.read()))
