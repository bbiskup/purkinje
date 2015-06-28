import pytest
import purkinje.config as sut
import os.path as op
from .conftest import TESTDATA_DIR


@pytest.fixture
def conf1_name():
    return op.join(TESTDATA_DIR, 'config', 'conf1.yml')


@pytest.fixture
def conf2_name():
    return op.join(TESTDATA_DIR, 'config', 'conf2.yml')


def test_config_exception():
    exception = sut.ConfigException('testmessage')
    assert str(exception) == 'testmessage'


def test_valid(conf1_name):
    conf = sut.Config(conf1_name)
    conf_data = conf.settings()
    assert conf_data['global']['logLevel'] == 'debug'
    assert conf_data['global']['debugMode']
    assert conf_data['global']['serverHost'] == '1.2.3.4'
    assert conf_data['global']['serverPort'] == 12345
    assert conf_data['global']['compressAssets']


def test_valid_default(conf2_name):
    conf = sut.Config(conf2_name)
    conf_data = conf.settings()
    assert conf_data['global']['debugMode'] is False
    assert conf_data['global']['serverHost'] == 'localhost'
    assert conf_data['global']['serverPort'] == 5000
    assert conf_data['global']['compressAssets']


def test_get_fails_if_uninitialized():
    with pytest.raises(sut.ConfigException):
        sut.Config.get()


def test_get_prev_created(conf1_name):
    conf1 = sut.Config.create(conf1_name)
    assert conf1 is not None
    conf2 = sut.Config.get()
    assert conf2 is not None
    assert id(conf1) == id(conf2)


# def test_missing_config_section(conf1_name):
#     conf1 = sut.Config.create(conf1_name)
#     del conf1._conf['global']['serverPort']
#     with pytest.raises(sut.ConfigException):
#         conf1._validate(conf1._conf)
