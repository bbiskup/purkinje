# from __future__ import absolute_import
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
import purkinje.app as sut
import mock
import logging

logger = logging.getLogger(__name__)


class QueueMock(object):

    def __init__(self, values):
        self._values = values

    def get_nowait(self):
        if len(self._values) == 0:
            logger.debug('QueueMock: no queue items left')
            return None
        else:
            result = self._values[0]
            self._values = self._values[1:]
            logger.debug('QueueMock: returning {}; {} items left'.format(
                result, len(self._values)))
            return result


@pytest.fixture
def app():
    return sut.get_app()


@pytest.fixture
def app_mocked_backlog(app, monkeypatch):
    monkeypatch.setattr(sut, 'send_to_ws', mock.Mock())
    monkeypatch.setattr(sut, 'clients', ['dummy_client'])


def test_send_bulk_cycle_does_nothing_when_backlog_empty(app_mocked_backlog,
                                                         monkeypatch):
    monkeypatch.setattr(sut, 'BACKLOG', QueueMock([]))
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 0


def test_send_bulk_cycle_single_msg_gets_sent(app_mocked_backlog, monkeypatch):
    monkeypatch.setattr(sut, 'BACKLOG', QueueMock(['xyz']))
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 1


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


def test_webfont_workaround(client):
    status = client.get(url_for(
        'webfont_workaround')).status_code
    assert status == httplib.FOUND
