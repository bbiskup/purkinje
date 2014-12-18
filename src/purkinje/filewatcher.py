# -*- coding: utf-8 -*-

"""Watches files for changes
"""

from __future__ import print_function
import gevent.monkey
gevent.monkey.patch_all()
import gevent
import gevent_inotifyx as inotify
from gevent.queue import Queue
import logging
logger = logging.getLogger(__file__)


WATCH_MASK = inotify.IN_CLOSE_WRITE | inotify.IN_DELETE


class FileWatcher(gevent.Greenlet):

    """ Watches specified directory for changes relavant to test execution:
        Newly created, modified and deleted files.

        After instantiation, call start and use the returned queue to
        receive
    """

    def __init__(self, dir):
        gevent.Greenlet.__init__(self)
        self.dir = dir
        self.queue = Queue()
        self._fd = inotify.init()
        self._wd = inotify.add_watch(self._fd,
                                     self.dir,
                                     WATCH_MASK)

    def _run(self):
        """Run endlessly and monitor dir for changes
        """
        logger.debug('{}.{}: starting to watch {}'.format(self.__class__,
                                                          __name__,
                                                          self.dir))
        while True:
            events = inotify.get_events(self._fd)
            for event in self._filter(events):
                logger.debug('Event: {}'.format(event))
                self.queue.put(event)

    def _filter(self, events):
        """Select files that are relevant to test execution"""
        for event in events:
            n = event.name
            if n.endswith('.py'):
                yield event


# Test
# if __name__ == '__main__':
#     g = gevent.spawn(_test_filewatcher)
#     gevent.joinall([g])
