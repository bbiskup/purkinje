from flask.ext.assets import Bundle, Environment


# paths are relative to the 'static' directory
bundles = {
    'css': Bundle(
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css',

        'css/thirdparty/dashboard.css',

        'css/default.css',

        filters='cssmin',
        output='gen/packed.css'
    ),
    'js': Bundle(
        'bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'js/app.js',

        # filters='jsmin',
        # output='gen/packed.js'
    )
}


def register_assets(app):
    assets = Environment(app)
    assets.register(bundles)
