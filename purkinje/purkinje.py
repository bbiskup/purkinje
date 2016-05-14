#!/usr/bin/env python

"""Main module"""

from __future__ import print_function
from __future__ import absolute_import

import gevent
import gevent.monkey
gevent.monkey.patch_all()

import sys
import argparse

from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
import werkzeug.serving

from .config import Config
# from werkzeug.debug import DebuggedApplication

CONFIG_FILENAME = 'purkinje.yml'


def args_parser():
    parser = argparse.ArgumentParser(description='purkinje test runner')
    parser.add_argument('-c', '--config', type=str, action='store',
                        help='Configuration file name')
    return parser


def main():
    """Starts web application
    """

    parser = args_parser()
    args = parser.parse_args(sys.argv[1:])

    if 'config' in args:
        config_filename = args.config
    else:
        config_filename = CONFIG_FILENAME

    Config.create(config_filename)

    conf_global = Config.get().settings()['global']
    debug = conf_global['debugMode']

    from .app import get_app, send_bulk

    @werkzeug.serving.run_with_reloader
    def go():

        app = get_app()
        app.debug = debug

        if app.debug:
            app.config.update(SEND_FILE_MAX_AGE_DEFAULT=0)

        #  TODO: asset debug settings will cause bad YSLOW rating
        app.config['COMPRESS_DEBUG'] = conf_global['compressAssets']
        app.config['ASSETS_DEBUG'] = debug

        # Breaks web socket communication
        # (WebSocketConnectionClosedException in client)
        # app = DebuggedApplication(app, evalex=True)

        host = conf_global['serverHost']
        port = conf_global['serverPort']
        print('Server: {0}:{1}'.format(host, port))
        http_server = WSGIServer((host, port),
                                 app,
                                 handler_class=WebSocketHandler)

        # gevent.spawn(send_dummy_notifications)
        gevent.spawn(send_bulk)

        http_server.serve_forever()
        # app.run()


if __name__ == '__main__':

    main = werkzeug.serving.run_with_reloader(main)
    print('purkinje ready')
    main()
