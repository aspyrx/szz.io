import React, {Component} from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';
import pages from '~/pages';
import Header from '~/components/header';

import styles from './app.less'
import 'normalize-css/normalize.css';
import '^/octicons/octicons.less';

import bg from '~/images/bg.svg';

function getChildPath(path) {
    const index = path.indexOf('/', 1);
    return index < 0 ? path : path.substring(0, index);
}

export default class App extends Component {
    static get propTypes() {
        return {
            children: React.PropTypes.node.isRequired,
            location: React.PropTypes.shape({
                pathname: React.PropTypes.string
            })
        };
    }

    constructor() {
        super();

        this.state = {
            linkIncrease: false
        }

        this.linkOrder = {};
        pages.forEach((module, i) => this.linkOrder[getChildPath(module.page.path)] = i);
    }

    componentWillReceiveProps(props) {
        let { location: { pathname } } = props;
        let { location: { pathname: currPath } } = this.props;

        pathname = getChildPath(pathname);
        currPath = getChildPath(currPath);

        if (pathname !== currPath) {
            if (this.linkOrder[pathname] > this.linkOrder[currPath]) {
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
                        appearActive: styles.appearActive,
                        toString() { return styles.replaceAnimated; }
                    }}
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={300}
                    overflowHidden={false}>
                    {React.cloneElement(children, {
                        key: getChildPath(pathname)
                    })}
                </ReactCSSTransitionReplace>
            </div>
        </div>;
    }
}

