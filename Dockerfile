FROM ubuntu:14.04
MAINTAINER Bernhard Biskup <bbiskup@gmx.de>

# Install dependencies
RUN echo 'Running installation'
WORKDIR /build

RUN apt-get -y update && apt-get install -y \
    firefox \
    libyaml-dev \
    make \
    python \
    python-dev \
    software-properties-common \
    wget
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get -y update && apt-get install -y \
    nodejs

# RUN apt-get -y install nodejs google-chrome-stable firefox

# Ubuntu's python-pip throws exception with requests lib
# see https://bugs.launchpad.net/ubuntu/+source/python-pip/+bug/1306991
RUN wget https://bootstrap.pypa.io/get-pip.py && \
    python get-pip.py && \
    rm get-pip.py

ADD package.json /build/package.json
ADD bower.json /build/bower.json
ADD .bowerrc /build/.bowerrc

RUN npm install

# Set up Chrome webdriver for Protractor
RUN ./node_modules/protractor/bin/webdriver-manager update

ADD README.rst /build/README.rst
ADD CHANGES.rst /build/CHANGES.rst

ADD requirements.txt /build/requirements.txt
ADD dev-requirements.txt /build/dev-requirements.txt

# Python
RUN pip install --upgrade -r dev-requirements.txt --cache-dir $HOME/.pip-cache
ENTRYPOINT "/bin/bash"
RUN echo "Installed Python packages:"
RUN pip freeze


ADD tox.ini /build/tox.ini
ADD pytest.ini /build/pytest.ini
ADD MANIFEST.in /build/MANIFEST.in
ADD setup.py /build/setup.py
ADD Makefile /build/Makefile
ADD purkinje /build/purkinje



# JS
#wget -q -O https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
#sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'



# Build tox environment
RUN echo ls /build; ls /build
RUN cd /build; tox -r

#ENTRYPOINT ["/bin/bash", "-c", "cd", "/build", ";", "make"]
#ENTRYPOINT "date"
ENTRYPOINT cd /build ; make test
