from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler


def websocket_app(environ, start_response):
    print('Request for {0}'.format(environ["PATH_INFO"]))
    if environ["PATH_INFO"] == '/echo':
        ws = environ["wsgi.websocket"]
        print('ws: {0}'.format(ws))

        while True:
            message = ws.receive()
            ws.send(message)

server = pywsgi.WSGIServer(("", 8000), websocket_app,
                           handler_class=WebSocketHandler)
server.serve_forever()
