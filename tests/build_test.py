# -*- coding: utf8 -*-

import pytest
import os
from purkinje.assets import BUNDLES


@pytest.mark.slow
@pytest.mark.parametrize('bundle', BUNDLES.keys())
def test_build_static_assets(bundle, tmpdir):
    """Verify that static resources can be built
       (e.g. referenced files exist)
    """
    os.system('python manage.py assets build --output {0} {1}/{2}'.format(
        bundle,
        str(tmpdir),
        bundle))
