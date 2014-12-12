from flask.ext.assets import Bundle, Environment


bundles = {
    'css': Bundle(
        'css/default.css',

        filters='cssmin',
        output='gen/packed.css'
    ),
    'js': Bundle(
        'bower_components/angular/angular.js',
        'js/app.js',

        filters='jsmin',
        output='gen/packed.js'
    )
}


def register_assets(app):
    assets = Environment(app)
    assets.register(bundles)
