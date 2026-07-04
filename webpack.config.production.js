import webpackConfigBase from './webpack.config.base.js';

const publicPath = '/';

/**
 * @returns {object} Production webpack configuration.
 */
export default function webpackConfigProduction() {
    const config = webpackConfigBase();

    config.output.publicPath = publicPath;
    config.mode = 'production';
    return config;
}
