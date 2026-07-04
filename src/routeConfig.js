/**
 * Static route configuration for the app.
 * @module src/routeConfig
 */
import React from 'react';

import {
    bool,
    number,
    object,
    objectOf,
    shape,
    string,
} from 'prop-types';

import AsyncComponent from 'src/AsyncComponent';

/**
 * Route configuration object.
 * @typedef {object} Route
 * @property {string} title - The route's title. Used for labels/link text.
 * @property {boolean} isHidden - True if the route is hidden.
 * @property {string} path - The full path for the route.
 * @property {string[]} parts - The individual parts of the path.
 * @property {number} rank - The route's sorting rank (0 by default).
 * @property {module:src/routeConfig~Children} children - The child routes.
 * @property {React.ElementType} component - The React component for the route.
 */

/**
 * Child route configuration object. Each key is the next path component.
 * @typedef {{string: Route}} Children
 */

const routeConfigCtx = import.meta.webpackContext(
    './routes', {
        recursive: true,
        include: /\/route.json$/,
    },
);

const routeConfig = { children: {} };

/**
 * Configures the route specified by the given configuration file.
 * @param {string} configPath - Path to the configuration file.
 * @returns {module:src/routeConfig~Route} The configured route.
 */
function configure(configPath) {
    const {
        title,
        isHidden = false,
        rank = 0,
    } = routeConfigCtx(configPath);
    const path = configPath.match(/.(\/|\/.*\/)route.json$/)[1];

    /**
     * Callback for retrieving the component.
     * @returns {React.Component} The component.
     */
    async function getModule() {
        try {
            return await import(
                /* webpackInclude: /\/index.js$/ */
                `src/routes${path}index.js`,
            );
        } catch (err) {
            void err;
            return await import(
                /* webpackInclude: /\/index.md$/ */
                `src/routes${path}index.md`,
            );
        }
    }

    // Find the route's proper location in the configuration
    const parts = path.split('/').slice(1, -1);
    const route = parts.reduce((node, key) => {
        if (!(key in node.children)) {
            // Pre-configure empty node
            node.children[key] = { children: {} };
        }

        return node.children[key];
    }, routeConfig);

    const titleText = `${title} | Stan Zhang`;
    route.title = title;
    route.isHidden = isHidden;
    route.path = path;
    route.rank = rank;
    route.component = function () {
        return (
            <>
                <title>{titleText}</title>
                <AsyncComponent getModule={getModule} />
            </>
        );
    };
    route.parts = parts;
    return route;
}

const routeConfigFlat = routeConfigCtx.keys()
    .map(configure)
    .sort((a, b) => b.parts.length - a.parts.length);

const routeShape = shape({
    title: string.isRequired,
    isHidden: bool,
    path: string.isRequired,
    rank: number,
    children: object.isRequired,
});

const routeChildrenShape = objectOf(routeShape);

export {
    /**
     * Top-level route configuration.
     * @type {module:src/routeConfig~Route}
     */
    routeConfig as default,
    /**
     * A list of all configured routes, sorted from most to least specific.
     * @type {module:src/routeConfig~Route[]}
     */
    routeConfigFlat,
    /**
     * Validator for `Route` in props.
     */
    routeShape,
    /**
     * Validator for `Children` in props.
     */
    routeChildrenShape,
};
