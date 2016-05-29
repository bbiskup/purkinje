const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './purkinje/static/js/app',
    devServer: {
        contentBase: "./purkinje/static/"
    },
    resolve: {
        extensions: ['.js', '']
    },
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'toString!css',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css',
            exclude: /src/
        }, {
            test: /\.svg/,
            loader: 'svg-url-loader'
        }, {
            test: /\.woff$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot$/,
            loader: 'file'
        }]
    }
}
