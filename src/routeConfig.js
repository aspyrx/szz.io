import asyncComponent from '~/components/async-component';
import Spinner from '~/components/Spinner';

const routeConfigCtx = require.context(
    '~/routes',
    true,
    /\/route.json$/
);

const routeComponentCtx = require.context(
    'bundle-loader?lazy!~/routes',
    true,
    /\/index.(js|md)$/
);

const routeConfig = { children: Object.create(null) };

function configure(configPath) {
    const { title } = routeConfigCtx(configPath);
    const path = configPath.match(/.(\/|\/.*\/)route.json$/)[1];

    let getComponent;
    try {
        getComponent = routeComponentCtx(`.${path}index.js`);
    } catch (err) {
        getComponent = routeComponentCtx(`.${path}index.md`);
    }
    const component = asyncComponent(getComponent, Spinner);

    // Find the route's proper location in the configuration
    const parts = path.split('/').slice(1, -1);
    const route = parts.reduce((node, key) => {
        if (!(key in node.children)) {
            // Pre-configure empty node
            node.children[key] = { children: Object.create(null) };
        }

        return node.children[key];
    }, routeConfig);

    route.title = title;
    route.path = path;
    route.component = component;
    return route;
}

const routeConfigFlat = routeConfigCtx.keys()
    .map(configure)
    .sort((a, b) => b.path.length - a.path.length);

export { routeConfig as default, routeConfigFlat };

