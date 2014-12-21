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
RUN apt-get -y install nodejs firefox  python-pip

RUN npm install

# Set up Chrome webdriver for Protractor
RUN ./node_modules/protractor/bin/webdriver-manager update

RUN apt-get -y install python-dev

# Python
RUN pip install -r dev-requirements.txt --download-cache $HOME/.pip-cache --use-mirrors

RUN echo "Installed Python packages:"
RUN pip freeze

# JS
#wget -q -O https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
#sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
