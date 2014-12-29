TODOs
== == =

#) Features
    - support of ssh distribution with pytest-xdist (run purkinje server
      on external network interface?)
    - WebSocket reconnect
    - Dektop notifications (optional)

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
    - set purkinje.__version__ and use it in setup.py(but see)

#) User Interface
   - Sorting of test results table by different columns
   - Behave correctly when zooming (content width and width of scroll
     area around test results table does not match when zoom != 100%)

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

#) Documentation
    - Sphinx, Read The Docs
    - sphinxcontrib.autohttp.flask

#) Deployment
    - Docker container? (+ fig?)
    - Vagrant file?

#) Publishing
    - register with (`py.test web page <http://pytest.org/latest/plugins_index/index.html?highlight=plugins>`_) and / or `py.test plugs <http://pytest-plugs.herokuapp.com/>`_

#) Packaging
    - split py.test plugin and web server
    - split out docformat testing(plugin)

Issues
== == ==

- Exception KeyError:
    KeyError(139899605760272,) in < module 'threading' from '/usr/lib/python2.7/threading.pyc' > ignored(after py.test execution
                                                                                                         not causing a problem, but irritating
                                                                                                         see http: // stackoverflow.com / questions / 8774958 / keyerror - in-module - threading - after - a - successful - py - test - run)
- Memory leak in Chrome:
    becomes obvious when sending many
    WebSocket messages to browser:
    - only seems to go away when closing tab
    - see Chrome dev tools(timeline and profiles / heap snapshot)
- Coverage reports for greenlets are incorrect(see https: // bitbucket.org / ned / coveragepy / issue / 149 / coverage - gevent - looks - broken)
    - Option "concurrency = gevent" to coverage does no longer seem to exist
