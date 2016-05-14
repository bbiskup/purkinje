# -*- coding: utf-8 -*-

"""Web views"""

from __future__ import print_function
# from __future__ import absolute_import

from future import standard_library
standard_library.install_aliases()
import gevent.monkey
gevent.monkey.patch_all()
import gevent

import json
import logging
import sys
import httplib
import os
import pwd
import socket
import os.path as op
from datetime import datetime
import copy

import gevent.queue as gq
from geventwebsocket import WebSocketError
from flask import Flask, render_template, request, redirect, jsonify
from flask.ext.compress import Compress
from assets import register_assets

from purkinje_messages.message import MsgType, Event
from config import Config


# watchdog not compatible with gevent
# see https://github.com/gorakhargosh/watchdog/issues/306
try:
    import watchdog  # NOQA
    print('#' * 79)
    print('WARNING: Package "watchdog" detected;'
          ' will cause Flask reloader to freeze')
    print('#' * 79)
except ImportError as e:
    pass

app = Flask(__name__)

Compress(app)

# Connected WebSocket clients
clients = []

DUMMY_PERIODIC_MSG_DELAY = 5

WELCOME_MSG = json.dumps([
    json.dumps({
        'type': 'info',
        'text': 'Welcome'
    })
])

DUMMY_PERIODIC_MSG = {
    'type': 'info',
    'text': 'Dummy periodic message',
}


MAX_BULK_SIZE = 25

BULK_POLL_DELAY = .5

BACKLOG = gq.Queue()


def enqueue_msg(message):
    BACKLOG.put(message)


def _send_bulk_cycle():
    """Single burst of bulk events
    """
    bulk = []

    try:
        # Read max. MAX_BULK_SIZE messages to send at once
        for i in range(MAX_BULK_SIZE):
            msg = BACKLOG.get_nowait()
            if msg is None:
                break
            bulk.append(msg)
    except gq.Empty:
        pass

    bulk_len = len(bulk)
    if bulk_len:
        app.logger.debug('Sending {0} messages to {1} clients'.format(
            bulk_len, len(clients)
        ))

        for client in clients:
            send_to_ws(client, json.dumps(bulk))
    else:
        # app.logger.debug('No bulk data available')
        gevent.sleep(BULK_POLL_DELAY)


def send_bulk():
    app.logger.info('Starting bulk sending')
    while True:
        _send_bulk_cycle()


def send_to_ws(websocket, msg):
    """ :param msg: JSON message
    """
    try:
        websocket.send(msg)
    except WebSocketError as e:
        app.logger.debug(
            'WebSocketError: %s; removing client %s', e, websocket)
        clients.remove(websocket)


def _send_dummy_notification(msg_id):
    """Sends a dummy notification to all clients
    """
    app.logger.debug('Sending dummy notification(s)')
    msg = copy.deepcopy(DUMMY_PERIODIC_MSG)
    msg['id'] = msg_id
    msg['timestamp'] = datetime.isoformat(datetime.now())
    enqueue_msg(json.dumps(msg))
    msg_id += 1
    gevent.sleep(DUMMY_PERIODIC_MSG_DELAY)


def send_dummy_notifications():
    """Periodically sends dummy requests
    """
    app.logger.info('send_dummy_notifications starting')
    msg_id = 0
    while True:
        _send_dummy_notification(msg_id)


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
    app_.logger.handlers = []  # Replace existing verbose handler
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


@app.route('/api/server_info', methods=['GET'])
def server_info():
    user_name = pwd.getpwuid(os.geteuid()).pw_name
    return jsonify(host=socket.gethostname(),
                   directory=os.getcwd(),
                   user=user_name)


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


def _register_client(ws):
    """Registers a new client that will then receive notifications
    """
    app.logger.info('Registering client %s', ws)
    client_conf_ = ws.receive()

    if not client_conf_:
        raise ValueError('Invalid client conf: {0}'.format(client_conf_))

    client_conf = json.loads(client_conf_)
    app.logger.debug('Client conf: %s', client_conf)
    clients.append(ws)
    ws.send(WELCOME_MSG)


@app.route('/subscribe')
def subscribe():
    """WebSocket event channel subscription (experimental)"""
    app.logger.debug('subscribe')
    ws = request.environ.get('wsgi.websocket')
    if ws:
        if ws not in clients:
            _register_client(ws)

            # Maintain client connection
            while True:
                gevent.sleep(1)
        else:
            app.logger.debug('already registered')
        return ''  # TODO appropriate response
    else:
        raise Exception('No WebSocket request')


def _check_api_key(msg):
    if 'apiKey' not in msg:
        raise Exception('API key missing')

    if not Config.get().is_api_key_valid(msg['apiKey']):
        raise Exception('API key missing')


@app.route('/event')
def event():
    """WebSocket endpoint for incoming events. These
       events will be broadcasted to all subscribers.

       The sender must pass a valid API key.
    """
    app.logger.debug('event')
    ws = request.environ.get('wsgi.websocket')

    try:
        while True:
            msg_str = ws.receive()
            msg = Event.parse(msg_str)
            # msg = json.loads(msg_str)
            app.logger.debug('Received event: {0}'.format(msg_str))

            # _check_api_key(msg)

            if ws:
                enqueue_msg(msg.serialize())

            if msg['type'] == MsgType.TERMINATE_CONNECTION:
                app.logger.debug('Connection terminated by client')

                # Must return valid response to avoid ValueError
                return ''

            if not ws:
                raise Exception('No WebSocket request')
    except Exception as e:
        app.logger.warning('Client connection aborted (%s)', e)
        return ''


@app.route('/test/websocket_client')
def websocket_client():
    """Page with JS to connect via WebSocket (for testing)
       TODO: show this view only in debug mode
    """
    app.logger.debug('websocket_client')
    return render_template('websocket_client.html')


@app.route('/static/fonts/fontawesome-webfont.woff')
def fontawesome_webfont_workaround():
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


@app.route('/static/gen/ui-grid.woff')
def uigrid_webfont_workaround():
    """See :py:func:fontawesome_webfont_workaround"""
    ui_grid_dir = '/static/bower_components/angular-ui-grid/'

    # TODO pass on Query string (v=4.2.0)?
    return redirect(op.join(ui_grid_dir, 'ui-grid.woff'))


@app.after_request
def add_header(response):
    response.cache_control.max_age = 300
    return response
