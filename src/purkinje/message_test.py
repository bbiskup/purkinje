# -*- coding: utf-8 -*-

"""Test cases for messages"""

import pytest
import message as sut
from datetime import datetime
import mock


@pytest.fixture
def tc_start_event():
    with mock.patch.object(sut, 'datetime') as dt:
        dt.now.return_value = datetime(2014, 2, 1, 8, 9, 10)

        return sut.TestCaseStartEvent('mytext')


def test_unicode(tc_start_event):
    assert unicode(
        tc_start_event) == 'tc_started: [2014-02-01 08:09:10] mytext'


# @pytest.skip('needs mock')
#  def test_timestamp(tc_start_event):
#     assert isinstance(tc_start_event.timestamp, datetime)


def test_serialize(tc_start_event):
    serialized = tc_start_event.serialize()
    # TODO check contents
    assert serialized