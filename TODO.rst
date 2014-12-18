TODOs
=====

- i18n
- JS Unit and integration tests
- detection of code change
- py.test execution
- use Python package 'future' w/ futurize 
- web socket implementation w/ angular
- deployment
- register with (`py.test web page <http://pytest.org/latest/plugins_index/index.html?highlight=plugins>`_) and/or `py.test plugs <http://pytest-plugs.herokuapp.com/>`_
- WebSocket reconnect
  

Issues
======

- Exception KeyError: KeyError(139899605760272,) in <module 'threading' from '/usr/lib/python2.7/threading.pyc'> ignored (after py.test execution; not causing a problem, but irritating; see http://stackoverflow.com/questions/8774958/keyerror-in-module-threading-after-a-successful-py-test-run)
- Memory leak in Chrome: becomes obvious when sending many 
  WebSocket messages to browser:
  - only seems to go away when closing tab
  - see Chrome dev tools (timeline and profiles/heap snapshot)
