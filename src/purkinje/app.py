import gevent.monkey
gevent.monkey.patch_all()
import gevent
import logging
import sys
import httplib
from flask import Flask, render_template
from flask_sockets import Sockets
from assets import register_assets

app = Flask(__name__)
sockets = Sockets(app)

# Connected WebSocket clients
clients = []


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


@sockets.route('/subscribe')
def subscribe(ws):
    """To be called by web client to subscribe to
       events (test case completion, etc)
    """
    if ws not in clients:
        app.logger.info('Registering client %s', ws)


def send_to_ws():
    """Send data to WebSockets (for testing)"""
    msg_count = 0
    while True:
        # message = ws.receive()
        for ws in clients:
            ws.send('Response to "%s"', 'message_%d', msg_count)
            msg_count += 1
            gevent.sleep(5)


@sockets.route('/unsubscribe')
def unsubscribe(ws):
    """To be called by a client which no longer wants to
       receive events
    """
    if ws in clients:
        app.logger.info('Removing client %s', ws)
        clients.remove(ws)
