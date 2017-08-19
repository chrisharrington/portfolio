var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = new require('webpack/lib/optimize/CommonsChunkPlugin'),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    WebpackBuildNotifier = require('webpack-build-notifier');

console.log(path.resolve('./src/index.jsx'));

var sass = new ExtractTextPlugin({
    filename: 'bundle.css'
});

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
            {
                test: /\.json$/i,
                use: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader?name=/images/[hash].[ext]']
            },
            {
                test: /\.htc$/i,
                use: 'file-loader?name=assets/[hash].[ext]'
            },
            {
                test: /\.css$/i,
                use: 'css-loader'
            },
            {
                test: /\.(js|jsx)$/i,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: sass.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
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
        sass,
        new CleanWebpackPlugin(['dist']),
        new WebpackBuildNotifier({
            title: 'Portfolio',
            successSound: false
        })
    ]
};
