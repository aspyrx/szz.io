'use strict';

const config = require('./webpack.config.js');

config.output.filename = '[name].js';

config.entry.main.unshift(
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server'
);

if (!config.optimization) {
    config.optimization = {};
}

config.optimization.runtimeChunk = 'single';
config.optimization.moduleIds = 'named';

module.exports = config;
