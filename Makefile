doc:
	(cd docs/ && make html)

test-py:
	tox

test-js:
	npm test
	./node_modules/karma/bin/karma start --single-run

test: test-py test-js

doc-clean:
	(cd docs/ && make clean)
