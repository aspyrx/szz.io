import React from 'react';
import Link from 'react-router/lib/Link';
import Route from 'react-router/lib/Route';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';

import cacheable from '~/components/cacheable';

import styles from './photography.less';

const photosCtx = require.context('~/images/photography', false, /\.jpg$/);
const photos = photosCtx.keys().map(key => photosCtx(key));

const basePath = '/photography';

function getChildPath(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

const Img = cacheable(function img(props) {
    return <img {...props} />;
});

function Photos(props) {
    return <div className={styles.photos} {...props}>
        {photos.map((photo, i) => {
            return <Link key={i}
                to={`${basePath}/${i}`}
                className={styles.photo}>
                <Img src={photo} loadedClass={styles.loaded} />
            </Link>;
        })}
    </div>;
}

function PhotoModal(props) {
    let { params: { index } } = props;
    index = Number(index);

    const src = photos[index];
    return <div className={styles.photoModal}>
        <Link to={`${basePath}`} className={styles.close} />
        <a href={src} target="_blank">
            <img src={src} className={styles.image} />
        </a>
        {index > 0
            ? <Link to={`${basePath}/${index - 1}`} className={styles.prev} />
            : null
        }
        {index < photos.length - 1
            ? <Link to={`${basePath}/${index + 1}`} className={styles.next} />
            : null
        }
    </div>;
}

PhotoModal.propTypes = {
    params: React.PropTypes.shape({
        index: React.PropTypes.string
    })
}

export default class Photography extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillReceiveProps(props) {
        let { location: { pathname } } = props;
        let { location: { pathname: currPath } } = this.props;

        pathname = getChildPath(pathname);
        currPath = getChildPath(currPath);

        if (pathname !== currPath) {
            if (photos[pathname] > photos[currPath]) {
                this.setState({ linkIncrease: true });
            } else {
                this.setState({ linkIncrease: false });
            }
        }
    }

    render() {
        const {
            className, location: { pathname }, children, ...rest
        } = this.props;

        const { linkIncrease } = this.state;

        const replaceClass = classNames(styles.replaceAnimated, {
            [styles.increase]: linkIncrease
        });

        return <div className={classNames(className, styles.photography)} {...rest}>
            <Photos />
            <ReactCSSTransitionReplace className={replaceClass}
                transitionName={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    leave: styles.leave,
                    leaveActive: styles.leaveActive,
                    toString() { return styles.replaceAnimated; }
                }}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                overflowHidden={false}>
                {children
                    ? React.cloneElement(children, {
                        key: getChildPath(pathname)
                    })
                    : null
                }
             </ReactCSSTransitionReplace>
        </div>;
    }
}

Photography.propTypes = {
    className: React.PropTypes.any,
    location: React.PropTypes.shape({
        pathname: React.PropTypes.string
    }),
    children: React.PropTypes.node
}

export const page = {
    path: basePath,
    title: 'photography',
    routes: <Route path={`${basePath}/:index`} component={PhotoModal} />
};

