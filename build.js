'use strict';

const process = require('process');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ProgressBar = require('progress');

const webpackConfig = (function getWebpackConfig(action) {
    switch (action) {
        case 'production':
            return require('./webpack.config.production.js');
        case 'live':
            return require('./webpack.config.live.js');
        default:
            return require('./webpack.config.js');
    }
}(process.argv[2]));

const webpackCompiler = webpack(webpackConfig);

const webpackBuildFinished = (err, stats) => {
    if (err) {
        console.log('\n\n===== WEBPACK BUILD FAILED =====');
        throw err;
    } else {
        console.log('\n\n===== WEBPACK BUILD FINISHED =====');
        console.log(stats.toString({
            colors: true,
            timings: true,
            cached: false
        }));
    }
};

const webpackProgress = new ProgressBar(
    '[:bar] :percent eta :etas  :msg', {
        total: 100, complete: '=', incomplete: ' ', width: 10
    }
);

webpackCompiler.apply(new ProgressPlugin((percent, msg) => {
    webpackProgress.update(percent, { 'msg': msg });
}));

switch (process.argv[2]) {
    case 'watch':
        webpackCompiler.watch({}, webpackBuildFinished);
        return;
    case 'live': {
        const webpackDevServer = require('webpack-dev-server');
        const server = new webpackDevServer(
            webpackCompiler, webpackConfig.devServer
        );
        server.listen(8080, 'localhost');
        return;
    }
    default:
        webpackCompiler.run(webpackBuildFinished);
}

