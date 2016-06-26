import React, {Component} from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';
import pages from '~/pages';
import Header from '~/components/header';

import styles from './app.less'
import 'normalize-css/normalize.css';
import '^/octicons/octicons.less';

import favicon from '~/images/favicon.ico';
import bg from '~/images/bg.svg';

export default class App extends Component {
    static get propTypes() {
        return {
            children: React.PropTypes.node.isRequired,
            location: React.PropTypes.object
        };
    }

    constructor() {
        super();

        this.state = {
            linkIncrease: false
        }

        this.linkOrder = {};
        pages.map((module, i) => this.linkOrder[module.page.path] = i);
    }

    componentWillMount() {
        const head = document.getElementsByTagName('head')[0];
        const iconLink = document.createElement('link');
        iconLink.rel = 'shortcut icon';
        iconLink.href = favicon;
        head.appendChild(iconLink);
    }

    componentWillReceiveProps(props) {
        const { location: { pathname } } = props;
        const currPathname = this.props.location.pathname;
        if (pathname !== currPathname) {
            if (this.linkOrder[pathname] > this.linkOrder[currPathname]) {
                this.setState({ linkIncrease: true });
            } else {
                this.setState({ linkIncrease: false });
            }
        }
    }

    render() {
        const { location: { pathname }, children } = this.props;
        const { linkIncrease } = this.state;
        const replaceClass = classNames(styles.replaceAnimated, {
            [styles.increase]: linkIncrease
        });

        return <div className={styles.containers}>
            <object className={styles.bg} data={bg} type="image/svg+xml" />
            <div className={styles.container}>
                <Header pages={pages} />
            </div>
            <div className={styles.container}>
                <ReactCSSTransitionReplace className={replaceClass}
                    transitionName={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        leave: styles.leave,
                        leaveActive: styles.leaveActive,
                        appear: styles.appear,
                        appearActive: styles.appearActive
                    }}
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={300}
                    overflowHidden={false}>
                        {React.cloneElement(children, { key: pathname })}
                </ReactCSSTransitionReplace>
            </div>
        </div>;
    }
}

