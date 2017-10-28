#!/usr/bin/env python
# -*- coding: utf8 -*-

# manage.py

from gevent.monkey import patch_all
patch_all()

from flask_script import Manager
from flask_assets import ManageAssets
from purkinje.app import get_app
from purkinje.assets import register_assets

app = get_app()
manager = Manager(app)
assets_env = register_assets(app)

manager.add_command("assets", ManageAssets(assets_env))


@manager.command
def hello():
    print 'hello'


if __name__ == "__main__":
    manager.run()
