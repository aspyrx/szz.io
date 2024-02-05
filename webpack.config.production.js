'use strict';

const config = require('./webpack.config.base.js');

const publicPath = '/';

config.output.publicPath = publicPath;

if (!config.module) {
    config.module = {};
}

config.mode = 'production';

if (!config.plugins) {
    config.plugins = [];
}

module.exports = config;
