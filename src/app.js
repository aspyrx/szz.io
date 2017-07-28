import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import asyncComponent from '~/components/async-component';
import Spinner from '~/components/Spinner';
import NotFound from 'bundle-loader?lazy!~/NotFound';
import { routes } from '~/routeConfig';
import Header from '~/Header';

import styles from './app.less';
import '^/roboto/roboto.css';
import '^/octicons/octicons.less';

const asyncNotFound = asyncComponent(NotFound, Spinner);

class App extends Component {
    render() {
        return <BrowserRouter>
            <div className={styles.containers}>
                <Header />
                <main>
                    <Switch>
                        { routes }
                        <Route component={asyncNotFound} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>;
    }
}

export function render(elem, done) {
    ReactDOM.render(<AppContainer>
        <App />
    </AppContainer>, elem, done);
}

