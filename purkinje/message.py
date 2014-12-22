# -*- coding: utf-8 -*-

"""Message/event type for communication with browser and test runner"""
from builtins import object

from datetime import datetime
import json
import abc
from future.utils import with_metaclass


class MsgType(object):

    """Constants for messages"""
    # Meta information about project under test
    PROJ_INFO = 'proj_info'

    TESTSUITE_STARTED = 'testsuite_started'
    TC_STARTED = 'tc_started'
    TC_FINISHED = 'tc_finished'

    # Premature abort
    ABORTED = 'aborted'

    # aborted due to an error
    ERROR = 'error'


class Event(with_metaclass(abc.ABCMeta, object)):

    """An event for the browser"""

    def __init__(self, type_, text):
        self.type_ = type_
        self.text = text
        self.timestamp = datetime.now()

    def serialize(self):
        """Creates JSON representation of Event object"""
        body = {'type': self.type_,
                'text': self.text,
                'timestamp': datetime.isoformat(self.timestamp)
                }
        self._serialize(body)
        return json.dumps(body)

    @abc.abstractmethod
    def _serialize(self, body):
        """payload, to be filled with message type specific data """

    def __unicode__(self):
        return u'{}: [{}] {}'.format(self.type_,
                                     self.timestamp,
                                     self.text)


class TestCaseStartEvent(Event):

    def __init__(self, text):
        super(TestCaseStartEvent, self).__init__(MsgType.TC_STARTED,
                                                 text)

    def _serialize(self, body):
        pass  # no extra data
