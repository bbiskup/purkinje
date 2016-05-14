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
from mock import Mock
import logging
import json

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
            logger.debug('QueueMock: returning {0}; {1} items left'.format(
                result, len(self._values)))
            return result

    def length(self):
        return len(self._values)


@pytest.fixture
def app():
    return sut.get_app()


@pytest.fixture
def app_mocked_backlog(app, monkeypatch):
    monkeypatch.setattr(sut, 'send_to_ws', Mock())
    monkeypatch.setattr(sut, 'clients', ['dummy_client'])


def test_send_bulk_cycle_does_nothing_when_backlog_empty(app_mocked_backlog,
                                                         monkeypatch):
    monkeypatch.setattr(sut, 'BACKLOG', QueueMock([]))
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 0


def test_send_bulk_cycle_single_message_gets_sent_in_single_burst(
        app_mocked_backlog,
        monkeypatch):
    monkeypatch.setattr(sut, 'BACKLOG', QueueMock(['xyz']))
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 1
    assert sut.send_to_ws.call_args[0] == ('dummy_client', '["xyz"]')


def test_send_bulk_cycle_two_messages_gets_sent_in_bulk(app_mocked_backlog,
                                                        monkeypatch):
    monkeypatch.setattr(sut, 'BACKLOG', QueueMock(['xyz1', 'xyz2']))
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 1
    assert sut.send_to_ws.call_args[0] == ('dummy_client', '["xyz1", "xyz2"]')


def test_send_bulk_cycle_limits_burst_size(
        app_mocked_backlog,
        monkeypatch):
    dummy_messages = ['msg_{0}'.format(x)
                      for x
                      in range(26)]
    monkeypatch.setattr(sut, 'BACKLOG', QueueMock(dummy_messages))
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 1
    assert sut.BACKLOG.length() == 1  # to be sent in next burst
    sut._send_bulk_cycle()
    assert sut.send_to_ws.call_count == 2  # (including first call)
    assert sut.BACKLOG.length() == 0
    assert sut.send_to_ws.call_args[0] == ('dummy_client', '["msg_25"]')


def test_send_dummy_notification(app_mocked_backlog, monkeypatch):
    sleep_mock = Mock()
    monkeypatch.setattr(sut.gevent, 'sleep', sleep_mock)

    monkeypatch.setattr(sut, 'enqueue_msg', Mock())
    sut._send_dummy_notification(10)
    assert sleep_mock.called

    msg_json = sut.enqueue_msg.call_args[0][0]
    msg = json.loads(msg_json)
    assert msg['text'] == 'Dummy periodic message'
    assert msg['type'] == 'info'
    assert msg['id'] == 10
    assert 'timestamp' in msg


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


def test_reg_client_valid_conf(monkeypatch):
    monkeypatch.setattr(sut, 'clients', [])
    mock_ws = Mock()
    mock_ws.receive.return_value = json.dumps({})
    sut._register_client(mock_ws)
    assert len(sut.clients) == 1
    assert mock_ws in sut.clients
    assert mock_ws.send.called
    assert mock_ws.send.call_args[0][0] == sut.WELCOME_MSG


def test_reg_empty_client(monkeypatch):
    monkeypatch.setattr(sut, 'clients', [])

    with pytest.raises(Exception):
        sut._register_client(None)
    assert len(sut.clients) == 0


@pytest.mark.parametrize('client_conf', [
                         None,
                         'INVALID JSON'
                         ])
def test_register_client_with_invalid_config_not_added(client_conf,
                                                       monkeypatch):
    monkeypatch.setattr(sut, 'clients', [])
    mock_ws = Mock()
    mock_ws.receive.return_value = client_conf
    with pytest.raises(ValueError):
        sut._register_client(mock_ws)
    assert len(sut.clients) == 0


# TODO: not possible with live server (needs WSGIServer with WebSocketHandler?)
# @pytest.mark.usefixtures('live_server')
# def test_subscribe(live_server):
# s = urllib2.urlopen(url_for('/subscribe')).status_code
# assert s == httplib.OK

#     ws_url_base = live_server.url().replace('http', 'ws')

# ws = websocket.create_connection('ws://127.0.0.1:5000/subscribe')
#     view_url = url_for('subscribe')
#     full_url = '{0}{1}'.format(ws_url_base, view_url)
#     ws = websocket.create_connection(full_url)


def test_websocket_client(client):
    assert client.get(url_for('websocket_client')).status_code == httplib.OK


def test_fontawesome_webfont_workaround(client):
    status = client.get(url_for(
        'fontawesome_webfont_workaround')).status_code
    assert status == httplib.FOUND


def test_uigrid_webfont_workaround(client):
    status = client.get(url_for(
        'uigrid_webfont_workaround')).status_code
    assert status == httplib.FOUND
