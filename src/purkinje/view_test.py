from __future__ import absolute_import
from future import standard_library
standard_library.install_aliases()
import gevent.monkey
gevent.monkey.patch_all()
# import urllib2
# from urlparse import urlparse
import pytest
# import websocket
import httplib
from flask import url_for
from .app import get_app


@pytest.fixture
def app():
    return get_app()


def test_app_conf(app):
    assert not app.debug


def test_index(client):
    assert client.get(url_for('index')).status_code == httplib.OK


def test_index_post_fails(client):
    s = client.post(url_for('index')).status_code
    assert s == httplib.METHOD_NOT_ALLOWED


def test_404(client):
    assert client.get(
        '/nonexistant_sdfsdfhipsdfhsdifh').status_code == httplib.OK


def test_trigger_error(client):
    assert client.get(
        '/trigger_error').status_code == httplib.INTERNAL_SERVER_ERROR


# TODO: not possible with live server (needs WSGIServer with WebSocketHandler?)
# @pytest.mark.usefixtures('live_server')
# def test_subscribe(live_server):
# s = urllib2.urlopen(url_for('/subscribe2')).status_code
# assert s == httplib.OK

#     ws_url_base = live_server.url().replace('http', 'ws')

# ws = websocket.create_connection('ws://127.0.0.1:5000/subscribe')
#     view_url = url_for('subscribe2')
#     full_url = '{}{}'.format(ws_url_base, view_url)
#     ws = websocket.create_connection(full_url)


def test_websocket_client(client):
    assert client.get(url_for('websocket_client')).status_code == httplib.OK
