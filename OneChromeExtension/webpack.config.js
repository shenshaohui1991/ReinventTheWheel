/**
 * Created by Tea on 2016/6/8.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/index.jsx',
    output: {
        publicPath: 'http://localhost:8080/dist/',
        path: './dist',
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader?presets[]=react']
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url?limit=10000!img?minimize&optimizationLevel=5'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor-manifest.json')
        })
    ]
};