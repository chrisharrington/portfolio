var path = require("path"),
    webpack = require("webpack"),

    BowerWebpackPlugin = require("bower-webpack-plugin"),
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
        new BowerWebpackPlugin(),
        new CleanWebpackPlugin(["dist"])
    ],
    resolve: {
        alias: {
            "react": path.join(__dirname, "bower_components/react/react-with-addons.js")
        },
        root: [path.join(__dirname, "bower_components"), path.join(__dirname, "node_modules"), path.join(__dirname, "src"), path.join(__dirname, "assets")]
    }
};
