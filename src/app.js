import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { string } from 'prop-types';
import {
    createBrowserRouter, createRoutesFromElements, RouterProvider,
    Route, Outlet, useLocation
} from 'react-router-dom';

import asyncComponent from 'src/components/async-component';
import Spinner from 'src/components/Spinner';
import TransitionReplace from 'src/components/TransitionReplace';
import NotFound from 'bundle-loader?lazy!src/NotFound';
import routeConfig, { routeConfigFlat } from 'src/routeConfig';
import Header from 'src/Header';

import styles from './app.less';

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

class TransitionRoutes extends Component {
    static get propTypes() {
        return {
            loc: string
        };
    }

    constructor() {
        super();
        this.state = {
            fromRight: false
        };
    }

    componentDidUpdate(prevProps) {
        const { loc: locPrev = '' } = prevProps;
        const { loc = '' } = this.props;
        if (loc === locPrev) {
            return;
        }

        const nextFromRight = locationsIndex[loc] > locationsIndex[locPrev];
        const { fromRight } = this.state;
        if (nextFromRight !== fromRight) {
            this.setState({ fromRight: nextFromRight });
        }
    }

    render() {
        const { loc } = this.props;
        const { fromRight } = this.state;

        return <TransitionReplace
            component='main'
            fromRight={fromRight}
        >
            <div key={loc}>
                <Outlet />
            </div>
        </TransitionReplace>;
    }
}

function App() {
    const { pathname } = useLocation();
    const loc = pathname.split('/')[1];

    return <div className={styles.containers}>
        <Header locations={locations} />
        <TransitionRoutes loc={loc} />
    </div>;
}

function routeFromConfig(config) {
    const { childRoutes, path, getComponent } = config;
    const routeProps = (path === '/')
        ? { index: true }
        : {
            path: path.substring(1) + (childRoutes ? '*' : '')
        };
    return <Route
        key={path}
        Component={asyncComponent(getComponent, Spinner)}
        {...routeProps}
    >
    </Route>;
}

const routes = createRoutesFromElements(
    <Route element={<App />}>
        {routeConfigFlat.map(routeFromConfig)}
        <Route path='/*' Component={asyncComponent(NotFound, Spinner)} />
    </Route>
);
const router = createBrowserRouter(routes);

export { createRoot };

export function render(root) {
    root.render(<RouterProvider router={router} />);
}

