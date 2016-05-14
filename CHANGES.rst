ChangeLog
=========

Some minor changes were omitted from this list. For details, see git log.

Release 0.1.9
-------------

2016-05-14

- Reduced size of ``purkinje`` package
  - don't add web assets cache
  - remove some unnecessary JS resources
- Configurable asset compression
- Updated most third-party Python libs
- Updated some third-party JavaScript libs
- Added cache control header
- Added warning about hanging Flask server with ``gevent`` when
  ``watchdog`` package is installed
- misc. minor fixes

Release 0.1.8
-------------

2015-06-28

- Changed demo server URL (HostEurope server)
- Upgraded py version
- Removed obsolete debug output of problematic JS package simple-statistics
- Pin version of simple-statistics to 0.9.0, as 0.9.2 has error
- Miscellaneous fixes/improvements related to Travis
- Shorter test function names
- Miscellaneous code style improvements
- Set github homepage


Release 0.1.7
-------------

2015-03-08

- Fix: Removed duplicate dependency (fixes Travis build)
- Syntax highlighting for YAML/INI fragments in README.rst
  (thanks to `Marc Abramowitz`_)

Release 0.1.6
-------------

2015-03-08

- Fix: Added install_requires to setup.py
- Fix: Added missing requirements cssmin, pyaml

Release 0.1.5
-------------

2015-03-08

- Updated documentation with regard to new pytest-purkinje plugin parameters


Release 0.1.4
-------------

2015-03-07

- Fix: formatting in README.rst

Release 0.1.3
-------------

2015-03-07

- Fix: formatting in README.rst

Release 0.1.2
-------------

2015-03-07

- Optional configuration file
- logLevel, debugMode, serverPort configurable
- disabled desktop notifications
- Arial as fallback for Droid Sans font (the latter may not be available
  on Windows)

Release 0.1.1
-------------

2015-03-02

- Hide button for creation of dummy data

Release 0.1.0
-------------

2015-03-02

- Basic functionality: ability to display running test suite
- restricted to local network interface (no access restriction on
  sending and viewing test results)

Start of Development
--------------------

2014-12-11

.. _`Marc Abramowitz`: https://github.com/msabramo
