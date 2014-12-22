FROM ubuntu:14.04
MAINTAINER Bernhard Biskup <bbiskup@gmx.de>

ADD requirements.txt /build/requirements.txt
ADD dev-requirements.txt /build/dev-requirements.txt
ADD package.json /build/package.json
ADD bower.json /build/bower.json
ADD .bowerrc /build/.bowerrc

WORKDIR /build
# Install dependencies
RUN echo 'Running installation'

RUN apt-get -y update
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get -y update
RUN apt-get -y upgrade
# RUN apt-get -y install nodejs google-chrome-stable firefox
RUN apt-get -y install nodejs firefox wget python

# Ubuntu's python-pip throws exception with requests lib
# see https://bugs.launchpad.net/ubuntu/+source/python-pip/+bug/1306991
RUN wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py
RUN python get-pip.py

RUN npm install

# Set up Chrome webdriver for Protractor
RUN ./node_modules/protractor/bin/webdriver-manager update

RUN apt-get -y install python-dev

# pro forma; test layer invalidation
RUN apt-get install htop

ADD Makefile /build/Makefile
ADD tox.ini /build/tox.ini
ADD pytest.ini /build/pytest.ini
ADD setup.py /build/setup.py
ADD README.rst /build/README.rst
ADD HISTORY.rst /build/HISTORY.rst
ADD purkinje /build/purkinje


# Python
RUN pip install --upgrade -r dev-requirements.txt --download-cache $HOME/.pip-cache --use-mirrors
ENTRYPOINT "/bin/bash"
RUN echo "Installed Python packages:"
RUN pip freeze

# JS
#wget -q -O https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
#sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

RUN apt-get install make

# Build tox environment
RUN cd /build; tox -r

#ENTRYPOINT ["/bin/bash", "-c", "cd", "/build", ";", "make"]
#ENTRYPOINT "date"
ENTRYPOINT cd /build ; make test
