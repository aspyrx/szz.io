import webpackConfigBase from './webpack.config.base.js';

/**
 * @returns {object} Default webpack configuration.
 */
export default function webpackConfigDefault() {
    const config = webpackConfigBase();

    if (!config.performance) {
        config.performance = {};
    }

    config.performance.hints = false;

    if (!config.plugins) {
        config.plugins = [];
    }

    return config;
}
