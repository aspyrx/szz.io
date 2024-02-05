'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const ctxDir = path.resolve(__dirname);
const srcDir = path.resolve(ctxDir, 'src');
const loadersDir = path.resolve(ctxDir, 'loaders');
const publicDir = path.resolve(ctxDir, 'public');
const vendorDir = path.resolve(ctxDir, 'vendor');
const outDir = path.resolve(ctxDir, 'dist');

const publicPath = '/';

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    context: ctxDir,
    entry: {
        main: ['normalize.css', srcDir],
        lib: [
            'react', 'react-dom',
            'react-router', 'react-router-dom'
        ]
    },
    output: {
        clean: true,
        path: outDir,
        publicPath,
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'src': srcDir,
            'public': publicDir,
            'vendor': vendorDir
        }
    },
    resolveLoader: {
        alias: {
            '>': loadersDir
        }
    },
    module: {
        rules: [{
            include: [publicDir],
            use: [{
                loader: '>/public-loader',
                options: {
                    publicPath,
                    publicDir
                }
            }]
        }, {
            test: /\.css$/,
            include: [/node_modules/, vendorDir],
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.less$/,
            include: [srcDir],
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[hash:base64:5]'
                        }
                    }
                },
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.less$/,
            include: [vendorDir],
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.js$/,
            include: [
                srcDir,
                // https://github.com/webpack/loader-utils/issues/92
                /node_modules\/loader-utils/
            ],
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.md$/,
            use: [{
                loader: '>/markdown-react-loader'
            }]
        }, {
            test: /\.(eot|woff|ttf|svg|jpg|png|ico)$/,
            exclude: [publicDir],
            type: 'asset'
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // SPA 404 redirect.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: '404.html'
        }),
        new ESLintPlugin()
    ]
};
