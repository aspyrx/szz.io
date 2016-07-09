/* eslint-env node */

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ctxDir = path.resolve(__dirname);
const srcDir = path.resolve(__dirname, 'src');
const vendorDir = path.resolve(__dirname, 'vendor');
const outDir = path.resolve(__dirname, 'dist');

module.exports = {
    devtool: 'cheap-module-source-map',
    debug: true,
    context: ctxDir,
    entry: {
        main: [srcDir],
        app: [path.resolve(srcDir, 'app')]
    },
    output: {
        path: outDir,
        publicPath: '/',
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    resolve: {
        alias: {
            '~': srcDir,
            '^': vendorDir
        },
        root: srcDir,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
    },
    resolveLoader: {
        root: path.resolve(ctxDir, 'node_modules')
    },
    postcss: () => [autoprefixer],
    module: {
        loaders: [
            {
                test: /\.css$/,
                include: [vendorDir, /node_modules/],
                loaders: ['style', 'css?importLoaders=1', 'postcss']
            },
            {
                test: /\.less$/,
                include: [vendorDir, /node_modules/],
                loaders: ['style', 'css?importLoaders=2', 'postcss', 'less']
            },
            {
                test: /\.css$/,
                include: [srcDir],
                loaders: [
                    'style',
                    'css'
                        + '?modules'
                        + '&localIdentName=[local]-[hash:base64:5]'
                        + '&importLoaders=1',
                    'postcss'
                ]
            },
            {
                test: /\.less$/,
                include: [srcDir],
                loaders: [
                    'style',
                    'css'
                        + '?modules'
                        + '&localIdentName=[local]-[hash:base64:5]'
                        + '&importLoaders=2',
                    'postcss',
                    'less'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(eot|woff|ttf|svg|jpg|png|ico)$/,
                loader: 'url?limit=10000&name=[path][name].[hash:base64:5].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('commons.[hash].js'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/images/favicon.ico'
        })
    ]
};
