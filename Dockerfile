# Dockerfile for purkinje development
FROM ubuntu:16.04
MAINTAINER Bernhard Biskup <bbiskup@gmx.de>

# Install dependencies
RUN echo 'Running installation'
WORKDIR /code

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_DIR=node-v6.2.0-linux-x64
ENV NODE_ARCHIVE=$NODE_DIR.tar.xz
ENV PATH=/opt/node/bin:$PATH

RUN apt-get -y update && apt-get install -y \
        firefox \
        gcc \
        git \
        libyaml-dev \
        make \
        python2.7 \
        python2.7-dev \
        software-properties-common \
        wget \
        xvfb \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update -yy && apt-get install -yy google-chrome-stable
RUN google-chrome --version

# Install node.js; use most recent version to have access to latest features
WORKDIR /opt
RUN wget https://nodejs.org/dist/v6.2.0/$NODE_ARCHIVE && \
    tar xJf $NODE_ARCHIVE && \
    ln -s /opt/$NODE_DIR /opt/node && \
    rm $NODE_ARCHIVE
WORKDIR /code
RUN node --version
RUN npm --version
RUN python2.7 --version
RUN ln -sf /usr/bin/python2.7 /usr/bin/python

# Ubuntu's python-pip throws exception with requests lib
# see https://bugs.launchpad.net/ubuntu/+source/python-pip/+bug/1306991
RUN wget https://bootstrap.pypa.io/get-pip.py && \
    python get-pip.py && \
    rm get-pip.py

ADD package.json /code/package.json
ADD meta/js/bower.json /code/bower.json
ADD meta/js/.jshintrc /code/.jshintrc
ADD meta/js/.bowerrc /code/.bowerrc

RUN npm install

# Set up Chrome webdriver for Protractor
RUN ./node_modules/protractor/bin/webdriver-manager update

ADD README.rst /code/README.rst
ADD meta/python/CHANGES.rst /code/CHANGES.rst

ADD meta/python/requirements/base.txt /code/requirements.txt
ADD meta/python/requirements/dev-requirements.txt /code/dev-requirements.txt

# Python
RUN pip install --upgrade -r dev-requirements.txt --cache-dir $HOME/.pip-cache

# Avoid Flask freezing
# watchdog not compatible with gevent
# see https://github.com/gorakhargosh/watchdog/issues/306
RUN pip uninstall -y watchdog

RUN echo "Installed Python packages:"
RUN pip freeze

# TODO remove git dependency when removing bower
RUN apt-get update -yy && apt-get install -yy git
RUN npm install -g bower
RUN bower --allow-root install -F

ADD meta/python/tox.ini /code/tox.ini
ADD meta/python/pytest.ini /code/pytest.ini
ADD meta/python/MANIFEST.in /code/MANIFEST.in
ADD setup.py /code/setup.py
ADD Makefile /code/Makefile
ADD purkinje /code/purkinje
ADD ./docker/purkinje.yml /code/purkinje.yml

RUN pip install -e .
RUN python setup.py sdist

ENV NODE_ARCHIVE ""
ENV NODE_DIR ""

ENTRYPOINT ["purkinje", "-c", "purkinje.yml"]
