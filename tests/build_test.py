# -*- coding: utf8 -*-


import os


def test_build_static_assets():
    """Verify that static resources can be built
       (e.g. referenced files exist)
    """
    os.system('python manage.py assets build')
