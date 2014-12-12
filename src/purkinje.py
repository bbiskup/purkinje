#!/usr/bin/env python
from gevent.wsgi import WSGIServer
from app import app

APP_PORT = 5000

http_server = WSGIServer(('', APP_PORT), app)


if __name__ == '__main__':
    print('purkinje ready')
    http_server.serve_forever()
