var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = new require('webpack/lib/optimize/CommonsChunkPlugin'),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    WebpackBuildNotifier = require('webpack-build-notifier');

console.log(path.resolve('./src/index.jsx'));

module.exports = {
    entry: path.resolve('./src/index.jsx'),
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            { test: /\.json$/i, loader: 'json-loader' },
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file-loader?name=/images/[hash].[ext]']},
            { test: /\.htc$/i, loader: 'file-loader?name=assets/[hash].[ext]' },
            { test: /\.css$/i, loader: 'style-loader!css-loader' },
            { test: /\.(js|jsx)$/i, loader: 'babel-loader' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }) }
        ]
    },
    devtool: 'cheap-module-inline-source-map',
    resolve: {
        modules: ['./src', 'node_modules'],
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: ['./src', 'node_modules']
    },
    plugins: [
        new LiveReloadPlugin(),
        new ExtractTextPlugin('bundle.css'),
        new CleanWebpackPlugin(['dist']),
        new WebpackBuildNotifier({
            title: 'Hooked with an Edge',
            successSound: false
        })
    ]
};
