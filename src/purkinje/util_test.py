#!/usr/bin/env python

"""Test cases for utility functions"""

import pytest
import os
import errno
from os.path import exists
import stat
import util as sut


def test_ensure_dir_new(unique_filename, tmpdir):
    path = str(tmpdir) + unique_filename
    assert not exists(path)
    sut.ensure_dir(path)
    assert exists(path)
    assert os.stat(path).st_mode & stat.S_IRWXU == stat.S_IRWXU


@pytest.mark.parametrize('mode',
                         [0,
                          stat.S_IRUSR,
                          stat.S_IWUSR,
                          stat.S_IXUSR])
def test_ensure_dir_new(mode, unique_filename, tmpdir):
    path = str(tmpdir) + unique_filename
    assert not exists(path)
    os.mkdir(path)
    assert exists(path)
    os.chmod(path, mode)
    try:
        sut.ensure_dir(path)
    except IOError as e:
        assert e.errno == errno.EPERM
    else:
        assert False, 'Should have raised IOError'
    assert exists(path)
