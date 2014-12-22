# -*- coding: utf-8 -*-

"""Test cases for messages"""
from __future__ import absolute_import
from builtins import str
import json

import pytest
import purkinje.message as sut
from datetime import datetime
from mock import Mock


@pytest.fixture
def mock_date(monkeypatch):
    m = Mock()
    m.now.return_value = datetime(2014, 2, 1, 8, 9, 10)
    monkeypatch.setattr(sut,
                        'datetime',
                        m)
    m.isoformat = datetime.isoformat


@pytest.fixture
def tc_start_event(mock_date):
    return sut.TestCaseStartEvent('mytext')


@pytest.fixture
def connection_termination_event(mock_date):
    return sut.ConnectionTerminationEvent()


def test_tc_start_event_unicode(tc_start_event):
    assert str(
        tc_start_event) == 'tc_started: [2014-02-01 08:09:10] mytext'


def test_connection_termination_unicode(connection_termination_event):
    expected = ('terminate_connection: '
                '[2014-02-01 08:09:10] ')
    assert str(connection_termination_event) == expected


# @pytest.skip('needs mock')
#  def test_timestamp(tc_start_event):
#     assert isinstance(tc_start_event.timestamp, datetime)


def test_tc_start_event_serialize(tc_start_event):
    serialized = tc_start_event.serialize()
    expected = json.dumps({'text': 'mytext',
                           'type': 'tc_started',
                           'timestamp': '2014-02-01T08:09:10'
                           })
    assert serialized == expected


def test_connection_termination_serialize(connection_termination_event):
    serialized = connection_termination_event.serialize()
    expected = json.dumps({'text': '',
                           'type': 'terminate_connection',
                           'timestamp': '2014-02-01T08:09:10'
                           })
    assert serialized == expected
