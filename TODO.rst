TODOs
=====

#) Features
   - detection of code change
   - WebSocket reconnect

#) Misc
   - i18n

#) Testing
   - JS Unit and integration tests

     - karma, selenium

   - test cases for WebSocket endpoint(s)
   - test YAML syntax of .travis.yml and others

#) Code
   - use Python package 'future' w/ futurize 

#) Documentation
   - Sphinx, Read The Docs

#) Deployment
   - Docker container?

#) Publishing
   - register with (`py.test web page <http://pytest.org/latest/plugins_index/index.html?highlight=plugins>`_) and/or `py.test plugs <http://pytest-plugs.herokuapp.com/>`_

#) Packaging
   - split py.test plugin and web server
   - split out docformat testing (plugin)

Issues
======

- Exception KeyError: KeyError(139899605760272,) in <module 'threading' from '/usr/lib/python2.7/threading.pyc'> ignored (after py.test execution; not causing a problem, but irritating; see http://stackoverflow.com/questions/8774958/keyerror-in-module-threading-after-a-successful-py-test-run)
- Memory leak in Chrome: becomes obvious when sending many 
  WebSocket messages to browser:
  - only seems to go away when closing tab
  - see Chrome dev tools (timeline and profiles/heap snapshot)
- Coverage reports for greenlets are incorrect (see https://bitbucket.org/ned/coveragepy/issue/149/coverage-gevent-looks-broken)
  - Option "concurrency = gevent" to coverage does no longer seem to exist
