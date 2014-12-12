import gevent.monkey
gevent.monkey.patch_all()
import pytest
import httplib
from flask import url_for
from app import get_app


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
