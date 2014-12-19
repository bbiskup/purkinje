# -*- coding: utf-8 -*-

"""Common fixtures and test functions"""
from builtins import str

import gevent.monkey
gevent.monkey.patch_all()
import uuid
import pytest
import os

TESTDATA_DIR = 'testdata'

# Timeout to apply when waiting for actions that should
# happen 'immediately', i.e. should take only a few
# milliseconds
# TODO might cause flaky test
QUASI_IMMEDIATE_TIMEOUT = .2

# Tests must be executed from project directory
PROJ_DIR = os.getcwd()


@pytest.fixture
def unique_filename():
    return str(uuid.uuid1())
