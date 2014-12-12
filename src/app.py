from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)


@app.route('/')
def main():
    return "Purkinje"


@sockets.route('/subscribe')
def subscribe(ws):
    while True:
        message = ws.receive()
        ws.send('Response to "%s"', message)
