# -*- coding: utf-8 -*-

"""Web views"""

from __future__ import print_function
# from __future__ import absolute_import

from future import standard_library
standard_library.install_aliases()
import gevent.monkey
gevent.monkey.patch_all()
import gevent
from geventwebsocket import WebSocketError
import json
import logging
import sys
import httplib
import pprint
import os.path as op

from datetime import datetime
import copy
from flask import Flask, render_template, request, redirect
from assets import register_assets

from purkinje_messages.message import MsgType

app = Flask(__name__)

# Connected WebSocket clients
clients = []

DUMMY_PERIODIC_MSG_DELAY = 5

DUMMY_WELCOME_MSG = json.dumps({
    'type': 'info',
    'text': 'Welcome'
})

DUMMY_PERIODIC_MSG = {
    'type': 'info',
    'text': 'Dummy periodic message',
}


def send_to_ws(websocket, msg):
    try:
        websocket.send(json.dumps(msg))
    except WebSocketError as e:
        app.logger.debug(
            'WebSocketError: %s; removing client %s', e, websocket)
        clients.remove(websocket)


def send_dummy_notifications():
    """Periodically sends dummy requests
    """
    app.logger.info('send_dummy_notifications starting')
    msg_id = 0
    while True:
        for client in clients:
            app.logger.debug('Sending dummy notification(s)')
            msg = copy.deepcopy(DUMMY_PERIODIC_MSG)
            msg['id'] = msg_id
            msg['timestamp'] = datetime.isoformat(datetime.now())
            send_to_ws(client, msg)
            msg_id += 1
        gevent.sleep(DUMMY_PERIODIC_MSG_DELAY)


# @app.route('/api')
# def api():
#     print('api')
#     if request.environ.get('wsgi.websocket'):
#         ws = request.environ['wsgi.websocket']
#         while True:
#             print('Waiting...')
#             message = ws.receive()
#             print('Received "{}"'.format(message))
#             ws.send(message)
#     return


def configure_app(app_):
    """Configures application logging etc.
    """
    app_.logger.setLevel(logging.DEBUG)
    register_assets(app)

    handler = logging.StreamHandler(stream=sys.stdout)
    handler.setLevel(logging.DEBUG)
    handler.formatter = logging.Formatter(
        fmt=u"%(asctime)s level=%(levelname)s %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%SZ",
    )
    app_.logger.addHandler(handler)


def get_app():
    """Configures and provides application object
    """
    configure_app(app)
    return app


@app.route('/', methods=['GET'])
def index():
    """Application main page"""
    return render_template('index.html')


@app.route('/trigger_error', methods=['GET'])
def trigger_error():
    """Triggers an exception (for testing)
       TODO: show this view only in debug mode
    """
    raise Exception('Intentional error')


@app.errorhandler(httplib.NOT_FOUND)
def page_not_found(error):
    """404 handler"""
    return render_template('404.html', error=error)


@app.route('/subscribe2')
def subscribe2():
    """WebSocket event channel subscription (experimental)"""
    app.logger.debug('subscribe2')
    ws = request.environ.get('wsgi.websocket')
    if ws:
        if ws not in clients:
            app.logger.info('Registering client %s', ws)
            client_conf_ = ws.receive()
            client_conf = json.loads(client_conf_)
            app.logger.debug('Client conf: %s', client_conf)
            clients.append(ws)
            ws.send(DUMMY_WELCOME_MSG)

            while True:
                gevent.sleep(1)
        else:
            app.logger.debug('already registered')
        return ''  # TODO appropriate response
    else:
        raise Exception('No WebSocket request')


@app.route('/event')
def event():
    """WebSocket endpoint for incoming events. These
       events will be broadcasted to all subscribers
    """
    app.logger.debug('event')
    ws = request.environ.get('wsgi.websocket')

    try:
        while True:
            msg_str = ws.receive()
            msg = json.loads(msg_str)
            app.logger.debug('Received event: {}'.format(pprint.pformat(msg)))
            if msg['type'] == MsgType.TERMINATE_CONNECTION:
                app.logger.debug('Connection terminated by client')

                # Must return valid response to avoid ValueError
                return ''
            if ws:
                for client in clients:
                    send_to_ws(client, msg)
            else:
                raise Exception('No WebSocket request')
    except Exception as e:
        app.logger.warning('Client connection aborted (%s)', e)
        return ''

# def send_to_ws():
#     """Send data to WebSockets (for testing)"""
#     msg_count = 0
#     while True:
# message = ws.receive()
#         for ws in clients:
#             ws.send('Response to "%s"', 'message_%d', msg_count)
#             msg_count += 1
#             gevent.sleep(5)


# @sockets.route('/unsubscribe')
# def unsubscribe(ws):
# """To be called by a client which no longer wants to
# receive events
# """
# if ws in clients:
# app.logger.info('Removing client %s', ws)
# clients.remove(ws)


@app.route('/test/websocket_client')
def websocket_client():
    """Page with JS to connect via WebSocket (for testing)
       TODO: show this view only in debug mode
    """
    app.logger.debug('websocket_client')
    return render_template('websocket_client.html')


@app.route('/static/fonts/fontawesome-webfont.woff')
def webfont_workaround():
    """TODO remove workaround for fontawesome webfont

       Work-around needed because Font-Awesome does not reference the actual
       directory where the font files are located.
       Font-Aweseome tries to load fonts with woff, ttf and finally svg
       and will pick the first one it can find.
       The Chrome Developer Tools' network tab incorrectly reports font files
       that actually result in a 404 as having status code 200
       (Chrome http://192.168.3.102:5000/#)
    """
    fontawesome_dir = '/static/bower_components/fontawesome'

    # TODO pass on Query string (v=4.2.0)?
    return redirect(op.join(fontawesome_dir, 'fonts/fontawesome-webfont.woff'))
