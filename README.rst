purkinje
========


Test runner for py.test test framework with web GUI

(Pre-Alpha stage)


System Requirements
===================

- Currently, only Python 2.7.x is supported because of gevent. In the future, if gevent should support Python 3, purkinje should also support it. Alternatively, gevent
  might get replaced e.g. by `guv <https://github.com/veegee/guv>`_.
- tested on Ubuntu 14.04
- needs a modern browser that supports WebSockets


Development
===========

- uses `semantic versioning <http://semver.org/>`_
  
Conventions
-----------

- The software under test is imported as `sut`