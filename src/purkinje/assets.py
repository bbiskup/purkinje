from flask.ext.assets import Bundle, Environment


bundles = {
    'home_css': Bundle(
        'css/default.css'
    )
}


def register_assets(app):
    assets = Environment(app)
    assets.register(bundles)
