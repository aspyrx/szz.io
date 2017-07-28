import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { string, object, shape } from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import asyncComponent from '~/components/async-component';
import Spinner from '~/components/Spinner';
import TransitionReplace from '~/components/TransitionReplace';
import NotFound from 'bundle-loader?lazy!~/NotFound';
import routeConfig, { routeConfigFlat } from '~/routeConfig';
import Header from '~/Header';

import styles from './app.less';
import '^/roboto/roboto.css';
import '^/octicons/octicons.less';

const asyncNotFound = asyncComponent(NotFound, Spinner);

const routes = routeConfigFlat.map((config, i) => {
    const { path, component } = config;
    return <Route
        key={i}
        path={path}
        exact={path === '/'}
        strict
        component={component}
    />;
});

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
            match: shape({
                params: shape({
                    key: string
                }).isRequired
            }).isRequired,
            location: object.isRequired
        };
    }

    constructor() {
        super();
        this.state = {
            fromRight: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { key: nextKey = '' } = nextProps.match.params;
        const { key = '' } = this.props.match.params;
        if (key === nextKey) {
            return;
        }

        const nextFromRight = locationsIndex[nextKey] > locationsIndex[key];
        const { fromRight } = this.state;
        if (nextFromRight !== fromRight) {
            this.setState({ fromRight: nextFromRight });
        }
    }

    render() {
        const { match, location } = this.props;
        const { fromRight } = this.state;
        const { key = '' } = match.params;

        return <TransitionReplace
            component='main'
            fromRight={fromRight}
        >
            <div key={key}>
                <Switch location={location}>
                    { routes }
                    <Route component={asyncNotFound} />
                </Switch>
            </div>
        </TransitionReplace>;
    }
}

function App() {
    return <BrowserRouter>
        <div className={styles.containers}>
            <Header locations={locations} />
            <Route path='/:key?/*' component={TransitionRoutes} />
        </div>
    </BrowserRouter>;
}

export function render(elem, done) {
    ReactDOM.render(<AppContainer>
        <App />
    </AppContainer>, elem, done);
}

