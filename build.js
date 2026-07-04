import path from 'node:path';
import process from 'node:process';

import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import ProgressBar from 'progress';

import webpackConfigProduction from './webpack.config.production.js';
import webpackConfigLive from './webpack.config.live.js';
import webpackConfigDefault from './webpack.config.js';

const webpackProgress = new ProgressBar(
    '[:bar] :percent eta :etas  :msg', {
        total: 100, complete: '=', incomplete: ' ', width: 10,
    },
);

const webpackConfig = (function getWebpackConfig(action) {
    switch (action) {
        case 'production':
            return webpackConfigProduction();
        case 'live':
            return webpackConfigLive();
        default:
            return webpackConfigDefault();
    }
}(process.argv[2]));

webpackConfig.plugins.push(new webpack.ProgressPlugin((percent, msg) => {
    webpackProgress.update(percent, { msg: msg });
}));

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
            cached: false,
        }));
    }
};

switch (process.argv[2]) {
    case 'watch':
        webpackCompiler.watch({}, webpackBuildFinished);
        break;
    case 'live': {
        const pkgDir = import.meta.dirname;
        const server = new webpackDevServer({
            hot: true,
            historyApiFallback: true,
            port: process.argv[3] || 8080,
            static: [{
                directory: path.join(pkgDir, 'dist'),
            }, {
                directory: path.join(pkgDir, 'public'),
            }, {
                directory: path.join(pkgDir, 'doc'),
                publicPath: '/doc/',
            }],
            proxy: [{
                context: ['/api/'],
                target: 'http://localhost:8081',
            }],
            devMiddleware: {
                stats: { colors: true, timings: true, cached: false },
            },
        }, webpackCompiler);
        server.start();
        break;
    }
    default:
        webpackCompiler.run(webpackBuildFinished);
}
