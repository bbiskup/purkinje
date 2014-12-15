# -*- coding: utf-8 -*-

"""Common fixtures and test functions"""

import uuid
import pytest

TESTDATA_DIR = 'testdata'


@pytest.fixture
def unique_filename():
    return str(uuid.uuid1())
