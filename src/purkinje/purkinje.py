#!/usr/bin/env python
from gevent.wsgi import WSGIServer
import werkzeug.serving
from werkzeug.debug import DebuggedApplication
from app import get_app

APP_PORT = 5000
DEBUG = True


@werkzeug.serving.run_with_reloader
def main():
    """Starts web application
    """
    # TODO: debugger is not active with gevent WSGIServer
    app = get_app()
    app.debug = DEBUG
    http_server = WSGIServer(('', APP_PORT),
                             DebuggedApplication(app, evalex=True))
    http_server.serve_forever()
    # app.run()


if __name__ == '__main__':
    print('purkinje ready')
    main()
