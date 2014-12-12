import logging
import sys
import httplib
from flask import Flask, render_template
from flask_sockets import Sockets


app = Flask(__name__)
sockets = Sockets(app)


def configure_app(app_):
    """Configures application logging etc.
    """
    app_.logger.setLevel(logging.DEBUG)

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


@app.errorhandler(httplib.NOT_FOUND)
def page_not_found(error):
    render_template('404.html', error)


@sockets.route('/subscribe')
def subscribe(ws):
    while True:
        message = ws.receive()
        ws.send('Response to "%s"', message)
