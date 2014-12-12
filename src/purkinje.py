#!/usr/bin/env python
from gevent.wsgi import WSGIServer
from flask import Flask

app = Flask(__name__)

APP_PORT = 5000

http_server = WSGIServer(('', APP_PORT), app)


@app.route('/')
def main():
    return "Purkinje"

if __name__ == '__main__':
    print('purkinje ready')
    http_server.serve_forever()