#!/usr/bin/env python

"""Test cases for utility functions"""

import pytest
import os
from os.path import exists
import stat
import util as sut


def test_ensure_dir_new(unique_filename, tmpdir):
    path = str(tmpdir) + unique_filename
    assert not exists(path)
    sut.ensure_dir(path)
    assert exists(path)
    assert os.stat(path).st_mode & stat.S_IRWXU == stat.S_IRWXU
