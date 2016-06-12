/**
 * Created by Tea on 2016/6/8.
 */
var webpack = require('webpack');

module.exports = {
    entry: './js/index.jsx',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react'],
                cacheDirectory: true,
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url?limit=10000!img?minimize&optimizationLevel=5&progressive=true'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};