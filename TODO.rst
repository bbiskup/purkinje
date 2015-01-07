TODOs
== == =

#) Features

    - support of ssh distribution with pytest-xdist (run purkinje server
      on external network interface?)

    - WebSocket reconnect

    - Dektop notifications (optional)
      
    - filter by pytest.mark information

#) Misc

    - i18n

    - analytics(opt - in)

#) Testing

    - JS Unit and integration tests

        - remove ng - scenario(superceded by protractor)

    - test cases for WebSocket endpoint(s)

    - test YAML syntax of .travis.yml and others

    - pre - commit hook?

    - Move test config files to subdirectory

    - use mock lib(Python)

    - show badge with test coverage(of purkinje project) on github?

#) Code

    - use Python package 'future' w / futurize

    - verify Python 3 compliance as part of testing?

    - use esvalidate to check JS files

    - verify each JS file uses strict mode

    - set purkinje.__version__ and use it in setup.py

    - Make debug mode configurable (to affect debug logging,
      asset concatenation and compression)

    - JS defs.js as Angular service
      
    - Use controllerAs syntax in Angular templates (?)
    
#) User Interface

   - height of results table should take available vertical space
   
   - area with verdict count pills should have fixed size to avoid jumping of 
     buttons when number of digits changes

   - Activity indicator (blinking light?) while suite is executing?
     
   - Better looking replacement for vanilla HTML title tooltips
  
   - Chartjs tooltips are cut off at the border of the canvas;
     see https://github.com/nnnick/Chart.js/issues/622

   - Color duration cell according to duration (heat palette)
    
   - column filters: select or typeahead?
     
   - show tag counts?
     
   - Overlay or title for charts
     
   - Appropriate width for charts area and progress bar
     
   - Filter by execution speed category

#) Performance

    - Bundling and rate limiting of events sent to browser

      - sending 1000 events
        immediately will lock up Chrome for long(1 min).
        **NOTE:**
        The slowdown appears to be due to debug logging in the Chrome Developer tools,
        and the Batarang(AngularJS) Chrome extension.
        The checkbox "enabled" bust be deselected
        otherwise, the slowdown happens, regardless
        of whether the extension has been activated or not.

        - Events arriving within 1 second(or more?) could be sent as a package

        - but not too many events should be sent in one package, to avoid long blocking
          of JS event

        - The server could  enforce a minimum time between sending two messages
            to the connected browsers

    - Investigate why deleting 500 Events using the Clear - Events button
      may take several seconds

    - Real-time notification optional or selective (only summaries, no per-testcase
      notifications (not feasible for on mobile for large test suites)

      - 5000 test cases cause Chrome on Yoga 2 to freeze
      - 100 test cases no problem for Yoga 2, but Chrome will crash on
        Huawei Ascend lower-end phone
      - 1000 test cases take about 1 min on Yoga 2;
      - scroll performance is bad at 200 test cases on Yoga 2

        - 50: ok; 100: hardly acceptable

      - Very performant virtual scrolling: http://demo.stackfull.com/virtual-scroll/
        (fast with at least 16 K lines, on Yoga 2)

#) Documentation

    - Sphinx, Read The Docs

    - sphinxcontrib.autohttp.flask
      
    - JS APi documentation

#) Build

    - "manage.py assets check" raises Exception AttributeError: "'Environment' object has no attribute 'environment'"

#) Deployment

    - Docker container? (+ fig?)

    - Vagrant file?

#) Publishing

    - register with (`py.test web page <http://pytest.org/latest/plugins_index/index.html?highlight=plugins>`_) and / or `  py.test plugs <http://pytest-plugs.herokuapp.com/>`_

#) Packaging

    - split py.test plugin and web server

    - split out docformat testing(plugin)

#) Demo

    - set up publically accessible purkinje server and test runner that
      executes test suites of well-known Python projects with purkinje plugin

      - ansible or Docker?

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
