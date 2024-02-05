'use strict';

const config = require('./webpack.config.base.js');

if (!config.performance) {
    config.performance = {};
}

config.performance.hints = false;

if (!config.plugins) {
    config.plugins = [];
}

module.exports = config;
