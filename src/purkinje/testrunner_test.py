""" Tests for py.test test runner
"""

import shutil
import tempfile
import pytest


@pytest.fixture
def project_dir(unique_filename):
    result = ensure_dir()
