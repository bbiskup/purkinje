#!/usr/bin/env python
from gevent.wsgi import WSGIServer
from app import get_app

APP_PORT = 5000
DEBUG = False


#  http_server = WSGIServer(('', APP_PORT), app)


if __name__ == '__main__':
    print('purkinje ready')
    app = get_app()
    app.debug = DEBUG
    # http_server.serve_forever()
    app.run()
