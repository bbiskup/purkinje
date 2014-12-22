# -*- coding: utf-8 -*-

"""Test for TestOrchestrator
"""

import pytest
from purkinje import testorchestrator as sut


@pytest.fixture()
def orchestrator(tmpdir):
    dummy_websocket_url = 'ws://xyz:1000'
    return sut.TestOrchestrator(proj_dir=str(tmpdir),
                                websocket_url=dummy_websocket_url)


def test_1(orchestrator):
    pass
