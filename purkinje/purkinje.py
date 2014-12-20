#!/usr/bin/env python

"""Main module"""

from __future__ import print_function
from __future__ import absolute_import
import gevent
import gevent.monkey
gevent.monkey.patch_all()
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
import werkzeug.serving
# from werkzeug.debug import DebuggedApplication

# TODO .app gives error about relative import
from .app import get_app, send_dummy_notifications

APP_PORT = 5000
DEBUG = True


@werkzeug.serving.run_with_reloader
def main():
    """Starts web application
    """
    app = get_app()
    app.debug = DEBUG
    # app.config['ASSETS_DEBUG'] = DEBUG

    # Breaks web socket communication
    # (WebSocketConnectionClosedException in client)
    # app = DebuggedApplication(app, evalex=True)

    http_server = WSGIServer(('', APP_PORT),
                             app,
                             handler_class=WebSocketHandler)

    gevent.spawn(send_dummy_notifications)

    http_server.serve_forever()
    # app.run()


if __name__ == '__main__':
    print('purkinje ready')
    main()
