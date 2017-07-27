'use strict';

const path = require('path');

/**
 * Escapes the given string for usage in a RegExp.
 *
 * @param {string} str - The string to escape.
 * @returns {string} Thes escaped string.
 */
function escapeForRegExp(str) {
    return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

/**
 * Webpack loader for rewriting the directory given in `query.publicDir` to the
 * directory specified by `query.publicPath`.
 *
 * @returns {void}
 */
module.exports.pitch = function loader() {
    this.cacheable();

    let { publicDir, publicPath } = this.query;
    publicDir = path.resolve(publicDir) + '/';

    const newPath = this.resourcePath.replace(
        new RegExp(`^${escapeForRegExp(publicDir)}`),
        publicPath
    ).replace('\'', '\\\'');

    const module = `module.exports = '${newPath}'`;

    const done = this.async();
    if (!done) {
        return module;
    }
    done(null, module);
};

