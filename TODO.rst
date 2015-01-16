TODOs
== == =

#) Features
    - support of ssh distribution with pytest-xdist
      - run purkinje server on external network interface?

    - Dektop notifications (optional)

    - filter by pytest.mark information

    - Acoustic signal when suite fails (configurable)

    - drivers for other test frameworks (nose? golang? karma? ...)

    - Configurable UI update frequency to avoid high load

#) Misc

    - i18n

#) Testing

    - JS Unit and integration tests

    - test cases for WebSocket endpoint(s)

    - pre - commit hook?

    - Move test config files to subdirectory

    - show badge with test coverage(of purkinje project) on github?

#) Code

    - use jshint to check JS files as part of test

    - verify each JS file uses strict mode

    - set purkinje.__version__ and use it in setup.py

    - Make debug mode configurable (to affect debug logging,
      asset concatenation and compression)

    - JS defs.js as Angular service

    - Use controllerAs syntax in Angular templates (?)

    - Remove obsolete CSS classes

    - Send first WebSocket message as quickly as possible, to change state to running?
      (before test case collection; to reduce perceived lag)

    - py.test & py.test does not work correctly xdist (-n 2):
      - test results get recorded (all?)
      - no doughnut charts (because no suite-finished event? Investigate)
      - session start and session terminated messages arrive twice

    - Doughnut charts as directives


#) User Interface

   - height of results table should take available vertical space

   - Better looking replacement for vanilla HTML title tooltips

   - Chartjs tooltips are cut off at the border of the canvas;
     see https://github.com/nnnick/Chart.js/issues/622

   - column filters: select or typeahead?

   - show tag counts?

   - show nav menu when view is too narrow

#) Performance

#) Documentation

    - Sphinx, Read The Docs

    - sphinxcontrib.autohttp.flask

    - JS API documentation

#) Build

    - "manage.py assets check" raises Exception AttributeError: "'Environment' object has no attribute 'environment'"

#) Deployment

    - Docker container? (+ fig?)

    - Vagrant file?

#) Publishing

    - register with (`py.test web page <http://pytest.org/latest/plugins_index/index.html?highlight=plugins>`_) and / or `  py.test plugs <http://pytest-plugs.herokuapp.com/>`_

#) Packaging
    - split out docformat testing(plugin)?

#) Demo Prerequisites

    - Authentication (API key)
      to restrict access for running tests
      (optional?)

    - Authentication for web interface
      (optional)

    - start/stop script (like sentry)?

    - Minify & concatenate assets

      - application config file: debug parameter to
        control minification

    - Domain name?

    - nginx @ port 80; Demo under /purkinje_demo?

    - YSlow / PageSpeed checks

    - Minimal documentation on how to configure py.test with purkinje

    - Solve UI Problem: Flickering charts in Firefox

Issues
======

- Exception KeyError:
    KeyError(139899605760272,) in < module 'threading' from '/usr/lib/python2.7/threading.pyc' > ignored(after py.test execution
    not causing a problem, but irritating
    see http: // stackoverflow.com / questions / 8774958 / keyerror - in-module - threading - after - a - successful - py - test - run)

- Memory leak in Chrome:

    becomes obvious when sending many
    WebSocket messages to browser:

    - only seems to go away when closing tab

    - see Chrome dev tools(timeline and profiles / heap snapshot)

- Coverage reports for greenlets are incorrect(see https: // bitbucket.org / ned / coveragepy / issue / 149 / coverage -
  gevent - looks - broken)

    - Option "concurrency = gevent" to coverage does no longer seem to exist
