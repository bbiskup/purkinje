const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './purkinje/static/js/app',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    }
}
