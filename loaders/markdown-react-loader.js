'use strict';

const marked = require('marked');

function toComponent(html) {
    html = html.replace(/\n/g, '\\n');
    return `var React = require('react');

module.exports.default = function() {
    return React.createElement('div', {
        className: 'markdown',
        dangerouslySetInnerHTML: {
            __html: '${html}'
        }
    });
}
`;
}

/**
 * Webpack loader for converting markdown into a stateless React component.
 *
 * The markdown is wrapped with a `div` tag with class `markdown`.
 *
 * @param {string} content - The markdown to convert.
 * @returns {void}
 */
module.exports = function loader(content) {
    this.cacheable();
    this.addDependency(this.resourcePath);

    const done = this.async();
    if (!done) {
        const html = toComponent(marked(content));
        return html;
    }

    marked(content, (err, html) => {
        if (err) {
            return done(err);
        }

        done(null, toComponent(html));
    });
};

