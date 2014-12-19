# -*- coding: utf-8 -*-

"""Miscellaneous utilities"""

import os
import os.path as op
import stat
import errno
import shutil


def ensure_dir(path):
    """Make sure the specified directory exists
       and is writable
    """
    try:
        os.mkdir(path)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise

    if os.stat(path).st_mode & stat.S_IRWXU != stat.S_IRWXU:
        raise IOError(errno.EPERM,
                      'Insufficient directory permissions',
                      path)


def _ensure_file_deleted(path):
    try:
        os.remove(path)
    except OSError as e:
        if e.errno != errno.ENOENT:
            raise


def _ensure_dir_deleted(path):
    try:
        shutil.rmtree(path)
    except OSError as e:
        if e.errno != errno.ENOENT:
            raise


def ensure_deleted(path):
    if not op.exists(path):
        return
    if op.isfile(path):
        _ensure_file_deleted(path)
    elif op.isdir(path):
        _ensure_dir_deleted(path)
    else:
        raise ValueError('Invalid file type: {}'.format(path))


def a():
    x = 3
    print x
    print x * 2
    print x * 3
