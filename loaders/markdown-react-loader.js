import { Marked } from 'marked';

/**
 * Convert HTML to React component script.
 * @param {string} html - The HTML.
 * @returns {string} The React component script.
 */
function toComponent(html) {
    html = html.replace(/\n/g, '\\n');
    return `import React from 'react';

export default function() {
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
 * The markdown is wrapped with a `div` tag with class `markdown`.
 * @param {string} content - The markdown to convert.
 * @returns {void}
 */
export default async function loader(content) {
    this.cacheable();
    this.addDependency(this.resourcePath);

    const done = this.async();
    if (!done) {
        const marked = new Marked();
        return toComponent(marked.parse(content));
    }

    const marked = new Marked({
        async: true,
    });
    try {
        const html = await marked.parse(content);
        return done(null, toComponent(html));
    } catch (err) {
        return done(err);
    }
};
