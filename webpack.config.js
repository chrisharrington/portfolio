var path = require("path"),
    webpack = require("webpack"),

    CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, loader: "babel" },
            { test: /\.less$/, loader: "style!css!less" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"])
    ],
    resolve: {
        alias: {
            "react": path.join(__dirname, "bower_components/react/react-with-addons.js")
        },
        root: [path.join(__dirname, "bower_components"), path.join(__dirname, "node_modules"), path.join(__dirname, "src"), path.join(__dirname, "assets")]
    }
};

var path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CommonsChunkPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin"),
    LiveReloadPlugin = require("webpack-livereload-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    stats: {
        children: false
    },
    module: {
        loaders: [
            { test: /\.json$/i, loader: "json" },
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file?name=/images/[hash].[ext]']},
            { test: /\.htc$/i, loader: "file?name=assets/[hash].[ext]" },
            { test: /\.css$/i, loader: "style!css" },
            { test: /\.js$/i, loader: "babel-loader", query: { presets: ["es2015", "react"] }},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }
        ]
    },
    resolve: {
        root: [path.resolve("./node_modules")]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};
