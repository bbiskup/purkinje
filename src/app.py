from flask import Flask, render_template
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)


@app.route('/')
def main():
    render_template('index.html')


@sockets.route('/subscribe')
def subscribe(ws):
    while True:
        message = ws.receive()
        ws.send('Response to "%s"', message)
