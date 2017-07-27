import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import asyncComponent from '~/components/asyncComponent';
import Spinner from '~/components/spinner';
import NotFound from 'bundle-loader?lazy!~/404';
import { routes } from '~/routeConfig';
import Header from '~/components/header';

import styles from './app.less';
import '^/octicons/octicons.less';

const asyncNotFound = asyncComponent(Spinner, NotFound);

class App extends Component {
    render() {
        return <BrowserRouter>
            <div className={styles.containers}>
                <div className={styles.container}>
                    <Header />
                </div>
                <div className={styles.container}>
                    <Switch>
                        { routes }
                        <Route component={asyncNotFound} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>;
    }
}

export function render(elem, done) {
    ReactDOM.render(<AppContainer>
        <App />
    </AppContainer>, elem, done);
}

