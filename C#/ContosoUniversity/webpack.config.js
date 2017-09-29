// nodejs path module that handles working with file and directory paths: https://nodejs.org/api/path.html
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// This retrieves all dependencies (NOT dev ones) from the npm package.json so they are available on the bundle
// This is neat as it gives some possibilities to use npm as a master package manager even for client end dev
const pkg = require('./package.json');
const vendorPackages = Object.keys(pkg.dependencies).filter(function (el) {
    return el.indexOf('font') === -1; // exclude font packages from vendor bundle
});
// This only serves as a way to inject the bundle to the html file. this means that no <script> tag is need on the file as it is injected,
// if you want this, uncomment and related lines
//const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//    template: './dist/index.html',
//    filename: 'index.html',
//    inject: 'body'
//});

// This is the real webpack config
// Checks entry point of our app which is in ./src/index.js
// from there it will get all the files that it uses and bundle them toghether, through the require() calls
// before bundling it uses loaders that that make changes to the files
// the case below and the most usual in react development is to use babel for transpiling ES6 code to ES5 before bundling
// NOTE: Webpack works on require() calls but files are using ES6 import declaration,
// this is because the bundling only happens after transpiling the code with babel-loader module
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
        sourceMapFilename: "[file].map"
    },
    watch: true,
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
    //plugins: [HtmlWebpackPluginConfig]
}