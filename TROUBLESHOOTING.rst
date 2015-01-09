Troubleshooting
===============

JavaScript
----------

Error "errno 34" with npm install
.................................

Solution:
  rm -r node_modules
  npm cache clean
  npm install

 Error "$q is not defined"
 .........................

Reason: incorrect angular version due to ambiguous dependencies of bower
components. Exlicitly installing the package 'angular' and choosing the most
recent 1.x version should fix this problem:

  bower install angular


Python
------

Errors about missing imports when using future
..............................................

Solution: remove transitive imports, e.g. ``http.client.NOT_FOUND`` --> ``httplib.NOT_FOUND``
