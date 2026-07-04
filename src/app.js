/**
 * Main app module.
 * @module src/App
 */

import React, {
    useEffect,
    useRef,
} from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
    useLocation,
} from 'react-router-dom';
import AsyncComponent from 'src/AsyncComponent';
import TransitionReplace from 'src/components/TransitionReplace';
import routeConfig, { routeConfigFlat } from 'src/routeConfig';

import Header from 'src/Header';

import * as styles from './app.less';

const locationsIndex = Object.create(null);
const locations = (function getLocations(config, index) {
    const { path, title, children } = config;
    const root = { path, title };
    index[''] = 0;

    const childLocations = Object.keys(children)
        .sort((a, b) => a.length - b.length)
        .map((key, i) => {
            index[key] = i + 1;
            return children[key];
        });

    const arr = [root].concat(childLocations);
    return arr;
}(routeConfig, locationsIndex));

/**
 * Transition the route's elements.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
function TransitionRoutes(props) {
    const { children } = props;
    const { pathname } = useLocation();
    const loc = pathname.split('/')[1];
    const locPrevRef = useRef(loc);
    const locPrev = locPrevRef.current;
    useEffect(() => {
        locPrevRef.current = loc;
    }, [loc]);

    return (
        <TransitionReplace
            component="main"
            fromRight={locationsIndex[locPrev] < locationsIndex[loc]}
        >
            <div key={loc}>
                {children}
            </div>
        </TransitionReplace>
    );
}

const routes = routeConfigFlat.reduce((rs, config) => {
    const { path, component } = config;
    const isRoot = (path === '/');

    rs.push((
        <Route
            key={path}
            path={path}
            exact={isRoot}
            strict
            component={component}
        />
    ));

    if (!isRoot && path.endsWith('/')) {
        // Redirect from `/<path>` to `/<path>/`.
        const from = path.slice(0, -1);
        rs.push((
            <Redirect
                key={from}
                from={from}
                exact
                strict
                to={path}
            />
        ));
    }

    return rs;
}, []);

/**
 * Asynchronous default route ("404 Not Found") component.
 * @returns {React.ReactElement} The app's elements.
 */
function NotFound() {
    return (
        <AsyncComponent getModule={() => import('src/NotFound')} />
    );
}

/**
 * React component for the entire app.
 * @returns {React.ReactElement} The app's elements.
 */
function App() {
    return (
        <div className={styles.containers}>
            <BrowserRouter basename={__webpack_public_path__}>
                <Header locations={locations} />
                <TransitionRoutes>
                    <Switch>
                        { routes }
                        <Route component={NotFound} />
                    </Switch>
                </TransitionRoutes>
            </BrowserRouter>
        </div>
    );
}

/**
 * Render the app.
 * @param {HTMLElement} rootElem - Element in which to render.
 */
export default function render(rootElem) {
    createRoot(rootElem).render(<App />);
}
