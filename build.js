/* eslint-env node */
/* eslint no-console: "off" */
/* eslint strict: "off" */

'use strict';

const process = require('process');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ProgressBar = require('progress');

const production = process.argv[2] === 'production';
const webpackConfig = require(production ? './webpack.config.production.js' : './webpack.config.js');

const webpackBuildFinished = (err, stats) => {
    if (err) {
        console.log("\n\n===== WEBPACK BUILD FAILED =====");
        throw err;
    } else {
        console.log("\n\n===== WEBPACK BUILD FINISHED =====");
        console.log(stats.toString({ colors: true, timings: true, cached: false }));
    }
};

const webpackCompiler = webpack(webpackConfig);
const webpackProgress = new ProgressBar(
    '[:bar] :percent eta :etas  :msg', {
        total: 100, complete: '=', incomplete: ' ', width: 10
    }
);

let webpackPrevPercent = 0;
webpackCompiler.apply(new ProgressPlugin((percent, msg) => {
    webpackProgress.tick((percent - webpackPrevPercent) * 100, { 'msg': msg });
    webpackPrevPercent = percent;
}));

if (process.argv[2] === 'watch') {
    webpackCompiler.watch({}, webpackBuildFinished);
    return;
} else if (process.argv[2] === 'live') {
    const webpackDevServer = require('webpack-dev-server');
    webpackConfig.entry.app.push('webpack-dev-server/client?https:///', 'webpack/hot/dev-server');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    const server = new webpackDevServer(webpackCompiler, {
        hot: true,
        https: true,
        compress: true,
        historyApiFallback: true,
        stats: { colors: true, timings: true, cached: false }
    });
    server.listen(8081, "localhost");
    return;
}

webpackCompiler.run(webpackBuildFinished);

