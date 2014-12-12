#!/usr/bin/env python
from gevent.wsgi import WSGIServer
import werkzeug.serving
from werkzeug.debug import DebuggedApplication
from app import get_app
from assets import register_assets

APP_PORT = 5000
DEBUG = True


@werkzeug.serving.run_with_reloader
def main():
    """Starts web application
    """
    app = get_app()
    app.debug = DEBUG
    register_assets(app)
    http_server = WSGIServer(('', APP_PORT),
                             DebuggedApplication(app, evalex=True))
    http_server.serve_forever()
    # app.run()


if __name__ == '__main__':
    print('purkinje ready')
    main()
