const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './purkinje/static/js/app',
    devServer: {
        contentBase: "./purkinje/static/"
    },
    output: {
        path: 'dist',
        filename: 'bundle.js'
    }
}
