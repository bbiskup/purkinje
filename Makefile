doc:
	(cd docs/ && make html)

test-tox:
	tox

test-py: test-tox

test-js-karma:
	./node_modules/karma/bin/karma start --single-run

test-js-karma-only-firefox:
	./node_modules/karma/bin/karma start --single-run --browsers=Firefox

test-js-protractor:
	npm test

test-js: test-js-karma test-js-protractor

test: test-py test-js

doc-clean:
	(cd docs/ && make clean)

dist:
	python setup.py sdist
	python setup.py bdist_wheel
