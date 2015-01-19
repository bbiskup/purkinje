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


@pytest.fixture
def conf_with_api_key_name():
    return op.join(TESTDATA_DIR, 'config', 'conf_with_api_key.yml')


def test_config_exception():
    exception = sut.ConfigException('testmessage')
    assert str(exception) == 'testmessage'


def test_valid(conf1_name):
    conf = sut.Config(conf1_name)
    conf_data = conf.settings()
    assert conf_data['global']['log-level'] == 'debug'
    assert conf_data['global']['debug-mode']


def test_valid_default(conf2_name):
    conf = sut.Config(conf2_name)
    conf_data = conf.settings()
    assert conf_data['global']['debug-mode'] is False


def test_get_fails_if_uninitialized():
    with pytest.raises(sut.ConfigException):
        sut.Config.get()


def test_get_succeeds_if_previously_created(conf1_name):
    conf1 = sut.Config.create(conf1_name)
    assert conf1 is not None
    conf2 = sut.Config.get()
    assert conf2 is not None
    assert id(conf1) == id(conf2)


def test_missing_config_section(conf1_name):
    conf1 = sut.Config.create(conf1_name)
    del conf1._conf['global']['project-path']
    with pytest.raises(sut.ConfigException):
        conf1._validate(conf1._conf)


def test_conf_with_api_key(conf_with_api_key_name):
    conf = sut.Config(conf_with_api_key_name)
    conf_data = conf.settings()
    assert conf_data['global']['api-key'] == 'd16fb36f0911f878998c136191af705e'


def test_validate_valid_api_key(conf_with_api_key_name):
    conf = sut.Config(conf_with_api_key_name)
    assert conf.is_api_key_valid('xyz')


def test_is_api_key_valid_with_valid_key(conf_with_api_key_name):
    conf = sut.Config(conf_with_api_key_name)
    assert conf.is_api_key_valid('xyz')


@pytest.mark.parametrize('api_key', [None, '', 'xyz2'])
def test_is_api_key_valid_with_invalid_keys(api_key, conf_with_api_key_name):
    conf = sut.Config(conf_with_api_key_name)
    assert not conf.is_api_key_valid('xyz2')


@pytest.mark.parametrize('api_key', [None, '', 'xyz2'])
def test_no_key_validation_if_no_api_key_in_conf(api_key,
                                                 conf1_name):
    conf = sut.Config(conf1_name)
    assert conf.is_api_key_valid('xyz2')
