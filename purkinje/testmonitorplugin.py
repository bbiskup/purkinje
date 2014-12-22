# -*- coding: utf-8 -*-

from __future__ import print_function
from builtins import object
import websocket

from .message import TestCaseStartEvent


class TestMonitorPlugin(object):

    """py.test plugin for monitoring test progress and
       capturing results
    """

    def __init__(self, websocket_url):
        self.reports = []
        self._websocket_url = websocket_url
        self._websocket = None

        try:
            self._websocket = websocket.WebSocket(websocket_url)
        except ValueError as e:
            self._log('Invalid WebSocket URL: "%s"',
                      self._websocket_url)
        except Exception as e:
            self._log('Error connecting to WebSocket at URL %s: %s',
                      self._websocket_url, e)

    def is_websocket_connected(self):
        return self._websocket is not None

    def send_event(self, event):
        """Send event via WebSocket connection.
           If there is no connection, the event will be dumped to the log
           only, so it is possible to run tests with purkinje enabled even
           if the server should be down
        """
        try:
            ser_event = event.serialize()

            if self._websocket:
                self._websocket.send(ser_event)
            else:
                self._log('purkinje server not available; event: %s',
                          ser_event)
        except Exception as e:
            self._log('Error while sending event "%s": %s',
                      ser_event, e)

    def pytest_sessionfinish(self):
        self._log('*** py.test session finished ***')

    def pytest_collectstart(self, collector):
        self._log('pytest_collectstart: %s', collector)

    def pytest_collectreport(self, report):
        self._log('pytest_collectreport: %s', report)
        self.send_event(TestCaseStartEvent('TODO xyz'))
        self.reports.append(report)

    def _log(self, fmt, *args):
        # TODO use print, logging or py.test facility if it exists
        fmt = '** testmon: %s **' % fmt
        print(fmt % args)
