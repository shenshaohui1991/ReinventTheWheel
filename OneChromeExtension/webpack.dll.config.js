/**
 * Created by Tea on 2016/6/8.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'reflux']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};