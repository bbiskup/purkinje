build-docker:
	docker-compose build
	$(MAKE) bower-install

stack-up: build-docker
	docker-compose up -d

bower-install:
	./dockercmd.sh bower --allow-root install -F

build-dist:
	./dockercmd.sh docker build -f Dockerfile.dist -t purkinje_dist .

test-js-karma:
	./dockercmd.sh "Xvfb :0 -screen 0 1280x1024x16 & sleep 2 && DISPLAY=:0 LANG=en ./node_modules/karma/bin/karma start --single-run --browsers=Firefox,Chrome"

test-js-protractor:
	./dockercmd.sh "Xvfb :0 -extension RANDR -noreset -ac  -screen 0 1280x1024x16 & sleep 2 && DISPLAY=:0 npm test"

test-js-karma-continuous:
	./dockercmd.sh "Xvfb :0 -extension RANDR -noreset -ac  -screen 0 1280x1024x16 & sleep 2 && DISPLAY=:0 LANG=en ./node_modules/karma/bin/karma --browsers=Chrome start"

doc:
	./dockercmd.sh "(cd docs/ && make html)"

coveralls:
	./dockercmd.sh coveralls

bash:
	./dockercmd.sh bash


test-py: test-pytest test-flake8

test-pytest:
	./dockercmd.sh py.test

test-flake8:
	./dockercmd.sh  'flake8 --ignore=E402 --exclude=venv --exclude=node_modules --max-complexity=10 .'

test-js-esvalidate:
	./dockercmd.sh 'find purkinje/static/js/ -iname "*.js" |xargs ./node_modules/esvalidate/bin/esvalidate'

test-js-jshint:
	./dockercmd.sh './node_modules/jshint/bin/jshint *.js purkinje/static/js'

test-js: test-js-jshint test-js-karma test-js-protractor test-js-esvalidate

test: test-py test-js

doc-clean:
	(cd docs/ && make clean)

sdist:
	python setup.py sdist

wheel:
	python setup.py bdist_wheel

dist: sdist wheel

.PHONY: dist

assets-clean:
	rm -rf purkinje/static/.webassets-cache

# Build Flask assets
assets: assets-clean
	python manage.py assets build


build-docker-dist-img:
	./dockercmd.sh 'python setup.py sdist && docker-compose -f docker-compose.dist.yml build'


upload-pypi: assets-clean
	python setup.py sdist upload -r pypi

