# -*- coding: utf-8 -*-

"""Common fixtures and test functions"""

import gevent.monkey
gevent.monkey.patch_all()
import uuid
import pytest

TESTDATA_DIR = 'testdata'

# Timeout to apply when waiting for actions that should
# happen 'immediately', i.e. should take only a few
# milliseconds
QUASI_IMMEDIATE_TIMEOUT = .2


@pytest.fixture
def unique_filename():
    return str(uuid.uuid1())
