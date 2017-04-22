purkinje
========


Test runner for py.test test framework with web GUI

`Live Demo <http://lvps46-163-112-196.dedicated.hosteurope.de:5000/#/dashboard/>`_


Build Status
============

====== ===============
Branch Status
====== ===============
dev    |travis-dev|
master |travis-master|
====== ===============


Getting Started
===============

purkinje is a browser application intended to run on a spare monitor. It shows results of automated
tests in realtime. Currently, the only supported test framework is `py.test <http://pytest.org/latest/>`_.

To use purkinje:

Option 1: with Docker
---------------------

Quickstart using default configuration
++++++++++++++++++++++++++++++++++++++

Pull and start purkinje::

  docker run -ti -p15000:5000   --rm bbiskup/purkinje_dist:latest

Open the URL `<http://localhost:15000/>`__ in your browser.

Customizing the configuration
+++++++++++++++++++++++++++++

Create a configuration file ``purkinje.yml`` with the
following contents:

.. code-block:: yaml

    global:
        logLevel: debug
        debugMode: yes
        serverPort: 5000
        serverHost: localhost


Pull and start purkinje::

  docker run -ti -p15000:5000  -v$PWD/docker/purkinje.yml:/code/purkinje.yml --rm bbiskup/purkinje_dist:latest purkinje -c purkinje.yml

Open the URL `<http://localhost:15000/>`__ in your browser.

- Port 15000 is the port on which you access the purkinje web app with your browser;
  this may have to be changed in case the port is already in use
- Port 5000 is the port inside the container; may not be changed.

Option 2: without Docker
------------------------

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


System Requirements
===================

- Python 2.7.
- tested on Ubuntu 16.04
- needs a modern browser that supports WebSockets
- Python development packages (``python-dev`` on Ubuntu) are required to build the dependency ``gevent``.


Supported Python versions
=========================

- Currently, only 2.7.x is supported. Python 3 support is blocked by the following packages:

  - ``cssmin``
  - ``inotifyx`` (which is blocking gevent_inotifyx)


Supported Operating Systems
===========================

- The server part has only been tested on Ubuntu Linux 14.04 and 16.04 (64 bit).
- The web application should work on any operating system using a modern browser
  (tested with Chrome 40-57 and Firefox 35-53).


Development
===========

Source code
-----------

- `GitHub page <https://github.com/bbiskup/purkinje/>`_

Development environment
-----------------------

`Docker <http://docker.io/>`_ and `docker-compose` required to develop purkinje.

Installation instructions for

- `Docker engine <https://docs.docker.com/engine/installation/>`_
- `docker-compose <https://docs.docker.com/compose/install/>`_
   Note: ``docker-compose`` version >= 1.6 is required because the
   ``docker-compose*yml`` files use syntax version 2.

Apart from Docker, GNU ``make`` is required. All other development tools and
dependencies are provided by the Docker configuration.

In the top-level directory ``purkinje``, run::

  make

The development environment may be used either by running various ``make`` commands based
on ``docker.cmd``, or interactively by running::

  make bash

The Docker image for distribution is built by the make target ``build-docker-dist-img``;
see ``.travis.yml``.

Versioning
----------
- uses `semantic versioning <http://semver.org/>`_
- uses `git-flow git workflow <http://nvie.com/posts/a-successful-git-branching-model/>`_


.. |travis-dev| image:: https://travis-ci.org/bbiskup/purkinje.svg?branch=dev
        :target: https://travis-ci.org/bbiskup/purkinje
.. |travis-master| image:: https://travis-ci.org/bbiskup/purkinje.svg?branch=master
        :target: https://travis-ci.org/bbiskup/purkinje
.. |coveralls| image:: https://coveralls.io/repos/bbiskup/purkinje/badge.png
        :target: https://coveralls.io/r/bbiskup/purkinje
