# -*- coding: utf-8 -*-

"""Watches files for changes
"""

from __future__ import print_function
import gevent
import gevent_inotifyx as inotify
from gevent.queue import Queue
import logging
logger = logging.getLogger(__file__)


WATCH_MASK = inotify.IN_CLOSE_WRITE | inotify.IN_DELETE


class FileWatcher(object):

    """ Watches specified directory for changes relavant to test execution:
        Newly created, modified and deleted files.

        After instantiation, call start and use the returned queue to
        receive
    """

    def __init__(self, dir):
        self.dir = dir

    def start(self):
        fd = inotify.init()
        queue = Queue()
        self.wd = inotify.add_watch(fd, self.dir, WATCH_MASK)
        self.greenlet = gevent.spawn(self.watch, fd, queue)
        return queue

    def watch(self, fd, queue):
        """Run endlessly and monitor dir for changes
        """
        logger.debug('{}.{}: starting to watch {}'.format(self.__class__,
                                                          __name__,
                                                          self.dir))
        while True:
            events = inotify.get_events(fd)
            for event in self._filter(events):
                queue.put(event)

    def _filter(self, events):
        """Select files that are relevant to test execution"""
        for event in events:
            n = event.name
            if n.endswith('py.test') or n.endswith('.py'):
                yield event


def _test_filewatcher():
    fw = FileWatcher('/tmp/xyz')
    queue = fw.start()

    while True:
        event = queue.get()
        print('Got inotify event: {}'.format(event))


# Test
if __name__ == '__main__':
    g = gevent.spawn(_test_filewatcher)
    gevent.joinall([g])
