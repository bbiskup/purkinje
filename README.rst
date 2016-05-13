purkinje
========


Test runner for py.test test framework with web GUI

`Live Demo <http://lvps46-163-112-196.dedicated.hosteurope.de:5000/#/dashboard/>`_


Getting Started
===============

purkinje is a browser application intended to run on a spare monitor. It shows results of automated
tests in realtime. Currently, the only supported test framework is `py.test <http://pytest.org/latest/>`_.

To use purkinje:

Create a virtual environment for purkinje and activate it::

    mkvirtualenv purkinje
    workon purkinje

Install purkinje::

    pip install purkinje

Optionally, create a configuration file ``purkinje.yml`` with the
following contents:

.. code-block:: yaml

    global:
        logLevel: debug
        debugMode: yes
        serverPort: 5000
        serverHost: localhost

Launch it::

    purkinje -f purkinje.yml

or, without configuration file::

    purkinje

Open it in a browser::

    google-chrome http://localhost:5000/

Prepare your Python/py.test project for reporting to purkinje. In your project's virtualenv,
install the py.test plugin for purkinje::

    pip install pytest-purkinje

This will automatically activate the plugin and test results will be sent to the
purkinje server. If you changed the host and/or port, specify them in your
project's ``pytest.ini``:

.. code-block:: ini

    [pytest]
        addopts = --websocket_host myhost --websocket_port 40000

If the settings should be incorrect, there will be a warning message but your
tests will execute nevertheless. You may add ``-p no:purkinje`` to ``pytest.ini``
or as a command line argument to ``py.test`` to disable the purkinje plugin.

Run your tests. The results should be visible in the browser::

    py.test

Alternatively, you may run ``purkinje_runner`` in your project directory. It will
automatically detect changes the the sources and execute py.test::

    purkinje_runner


Known Limitations
=================

- Security: There is **no access restriction**; for now, use only on the local machine

  - Anyone can use the web application

  - Anyone can send test results to the purkinje server

  By default, the server is running on localhost and not accessible from
  other machines.

- Only a single test suite

  If you run multiple purkinje-enabled test suites simultaneously, test results
  will get mixed up. This might change in a future version.


Build Status
============

====== ===============
Branch Status
====== ===============
dev    |travis-dev|
master |travis-master|
====== ===============

Coverage: |coveralls|


System Requirements
===================

- Currently, only Python 2.7.x is supported because of gevent. In the future, if gevent should support Python 3, purkinje should also support it. Alternatively, gevent
  might get replaced e.g. by `guv <https://github.com/veegee/guv>`_.
- tested on Ubuntu 14.04
- needs a modern browser that supports WebSockets
- Python development packages (``python-dev`` on Ubuntu) is required to build the dependency ``gevent``.


Supported Python versions
=========================

- Currently, only 2.7.x is supported. Python 3 support is blocked by the following packages:

  - cssmin
  - gevent (which is blocking gevent-websocket)
  - inotifyx (which is blocking gevent_inotifyx)


Supported Operating Systems
===========================

- The server part has only been tested on Ubuntu Linux 14.04 64 bit
- The web application should work on any operating system using a modern browser
  (tested with Chrome 40 and Firefox 35)


Development
===========

- uses `semantic versioning <http://semver.org/>`_
- uses `git-flow git workflow <http://nvie.com/posts/a-successful-git-branching-model/>`_
- `GitHub page <https://github.com/bbiskup/purkinje/>`_

.. |travis-dev| image:: https://travis-ci.org/bbiskup/purkinje.svg?branch=dev
        :target: https://travis-ci.org/bbiskup/purkinje
.. |travis-master| image:: https://travis-ci.org/bbiskup/purkinje.svg?branch=master
        :target: https://travis-ci.org/bbiskup/purkinje
.. |coveralls| image:: https://coveralls.io/repos/bbiskup/purkinje/badge.png
        :target: https://coveralls.io/r/bbiskup/purkinje
