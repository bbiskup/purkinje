purkinje
========


Test runner for py.test test framework with web GUI

Build Status
============

====== ===============
Branch Status
====== ===============
dev    |travis-dev|
master |travis-master| (TODO: set up .travis.yml for master, or disable build of master in Travis)
====== ===============

Coverage: |coveralls|



System Requirements
===================

- Currently, only Python 2.7.x is supported because of gevent. In the future, if gevent should support Python 3, purkinje should also support it. Alternatively, gevent
  might get replaced e.g. by `guv <https://github.com/veegee/guv>`_.
- tested on Ubuntu 14.04
- needs a modern browser that supports WebSockets

Supported Python versions
=========================

- Currently, only 2.7.x is supported. Python 3 support is blocked by the following packages:

  cssmin
  gevent (which is blocking gevent-websocket)
  inotifyx (which is blocking gevent_inotifyx)

Development
===========

- uses `semantic versioning <http://semver.org/>`_
- uses `git-flow git workflow <http://nvie.com/posts/a-successful-git-branching-model/>`_
- Download archive: `branch *dev*`__

__ https://github.com/bbiskup/purkinje/archive/dev.zip

.. |travis-dev| image:: https://travis-ci.org/bbiskup/purkinje.svg?branch=dev
        :target: https://travis-ci.org/bbiskup/purkinje
.. |travis-master| image:: https://travis-ci.org/bbiskup/purkinje.svg?branch=master
        :target: https://travis-ci.org/bbiskup/purkinje
.. |coveralls| image:: https://coveralls.io/repos/bbiskup/purkinje/badge.png
        :target: https://coveralls.io/r/bbiskup/purkinje
