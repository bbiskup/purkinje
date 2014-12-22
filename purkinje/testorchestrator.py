# -*- coding: utf-8 -*-

"""Monitoring of project dir and Initiation of test runs
"""

from __future__ import absolute_import
import gevent
import gevent.monkey
gevent.monkey.patch_all()
import os
import logging

from .filewatcher import FileWatcher
from .testrunner import PyTestRunner

logger = logging.getLogger(__name__)


class TestOrchestrator(gevent.Greenlet):

    """Responsible for watching test project for relevant
       changes and invoking the test runner if necessary.
       Test events are sent to the server
    """

    def __init__(self, proj_dir, websocket_url):
        gevent.Greenlet.__init__(self)
        self.proj_dir = proj_dir
        self._check_dir(proj_dir)
        self._websocket_url = websocket_url
        self._file_watcher = FileWatcher(proj_dir)
        self._file_watcher.start()
        self._file_event_queue = self._file_watcher.queue
        self._test_runner = PyTestRunner()

    def _check_dir(self, dir):
        """Check whether the directory exists and is readable
        """
        os.listdir(dir)

    def _run(self):
        logger.debug('Monitoring project directory %s', self.proj_dir)
        while True:
            event = self._file_event_queue.get()
            logger.debug('Test event: %s', event)
            self._test_runner.run(self._websocket_url,
                                  self.proj_dir)
