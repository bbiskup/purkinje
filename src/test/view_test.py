import httplib
from flask import url_for
from purkinje import app


def test_index(client):
    assert client.get(url_for('index')).status_code == httplib.OK


def test_404(client):
    assert client.get(
        '/nonexistant_sdfsdfhipsdfhsdifh').status_code == httplib.NOT_FOUND
