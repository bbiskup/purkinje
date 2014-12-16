import gevent.monkey
gevent.monkey.patch_all()
import gevent
import json
import logging
import sys
import httplib
from datetime import datetime
import copy
from flask import Flask, render_template, request
from assets import register_assets

app = Flask(__name__)

# Connected WebSocket clients
clients = []

DUMMY_WELCOME_MSG = json.dumps({
    'type': 'info',
    'text': 'Welcome'
})

DUMMY_PERIODIC_MSG = {
    'type': 'info',
    'text': 'Dummy periodic message',
}


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
            client.send(json.dumps(msg))
            msg_id += 1
        gevent.sleep(5)


@app.route('/api')
def api():
    print('api')
    if request.environ.get('wsgi.websocket'):
        ws = request.environ['wsgi.websocket']
        while True:
            print('Waiting...')
            message = ws.receive()
            print('Received "{}"'.format(message))
            ws.send(message)
    return


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
    return render_template('index.html')


@app.route('/trigger_error', methods=['GET'])
def trigger_error():
    raise Exception('Intentional error')


@app.errorhandler(httplib.NOT_FOUND)
def page_not_found(error):
    return render_template('404.html', error=error)


@app.route('/subscribe2')
def subscribe2():
    app.logger.debug('subscribe2')
    ws = request.environ.get('wsgi.websocket')
    if ws:
        if ws not in clients:
            app.logger.info('Registering client %s', ws)
            client_conf = ws.receive()
            app.logger.debug('Client conf: {}'.format(client_conf))
            clients.append(ws)
            ws.send(DUMMY_WELCOME_MSG)

            while True:
                gevent.sleep(1)
        else:
            app.logger.debug('already registered')
        return ''  # TODO appropriate response
    else:
        raise Exception('No WebSocket request')


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
    app.logger.debug('websocket_client')
    return render_template('websocket_client.html')
