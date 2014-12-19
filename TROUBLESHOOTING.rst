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


Python
------

Errors about missing imports when using future
..............................................

Solution: remove transitive imports, e.g. ``http.client.NOT_FOUND`` --> ``httplib.NOT_FOUND``