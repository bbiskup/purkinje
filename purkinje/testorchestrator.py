# -*- coding: utf-8 -*-

"""TestOrchestrator is responsible for watching test project for relevant
   changes and invoking the test runner if necessary.
   Test events are sent to the server
"""

from __future__ import absolute_import
import gevent
import gevent.monkey
gevent.monkey.patch_all()
from builtins import object
import logging

from .filewatcher import FileWatcher

logger = logging.getLogger(__name__)


class TestRunner(object):
    def __init__(self, proj_dir, websocket_url):
        self.proj_dir = proj_dir
        self._websocket_url = websocket_url
        # self._websocket =
        self._file_watcher = FileWatcher(proj_dir)
        self._queue = self._file_watcher.queue

    def _run(self):
        logger.debug('Monitoring project directory %s', self.proj_dir)
        while True:
            event = self._queue.read()
            logger.debug('Test event: %s', event)
