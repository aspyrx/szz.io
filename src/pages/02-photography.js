import React from 'react';
import Link from 'react-router/lib/Link';
import Route from 'react-router/lib/Route';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import cacheable from '~/components/cacheable';

import styles from './photography.less';

const basePath = '/photography';

function getChildPath(path) {
    return path.substring(basePath.length);
}

function getFilename(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

const photosCtx = require.context('~/images/photography', false, /\.jpg$/);
const photos = photosCtx.keys().map(key => photosCtx(key));
const photosMap = Object.create(null);
photos.forEach((photo, index) => photosMap[getFilename(photo)] = {
    index, photo
});

const Img = cacheable(function img(props) {
    return <img {...props} />;
});

function Photos(props) {
    return <div className={styles.photos} {...props}>
        {photos.map(photo => {
            const filename = getFilename(photo);
            return <Link key={filename}
                to={`${basePath}/${filename}`}
                className={styles.photo}>
                <Img src={photo} loadedClass={styles.loaded} />
            </Link>;
        })}
    </div>;
}

function PhotoModal(props) {
    let { params: { filename } } = props;

    const { index, photo } = photosMap[filename];

    return <div className={styles.photoModal}>
        <Link to={`${basePath}`} className={styles.close} />
        <a href={photo} target="_blank">
            <img src={photo} className={styles.image} />
        </a>
        {index > 0
            ? <Link className={styles.prev}
                to={`${basePath}/${getFilename(photos[index - 1])}`} />
            : null
        }
        {index < photos.length - 1
            ? <Link className={styles.next}
                to={`${basePath}/${getFilename(photos[index + 1])}`} />
            : null
        }
    </div>;
}

PhotoModal.propTypes = {
    params: React.PropTypes.shape({
        filename: React.PropTypes.string
    })
}

export default class Photography extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillReceiveProps(props) {
        const { location: { pathname } } = props;
        const { location: { pathname: currPath } } = this.props;

        const file = photosMap[getFilename(getChildPath(pathname))];
        const currFile = photosMap[getFilename(getChildPath(currPath))];

        if (file && currFile) {
            if (file.index > currFile.index) {
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

        const transitionClasses = classNames(styles.transitionAnimated, {
            [styles.increase]: linkIncrease
        });

        return <div className={classNames(className, styles.photography)} {...rest}>
            <Photos />
            <ReactCSSTransitionGroup className={transitionClasses}
                transitionName={{
                    appear: styles.appear,
                    appearActive: styles.appearActive,
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    leave: styles.leave,
                    leaveActive: styles.leaveActive,
                    toString() { return styles.replaceAnimated; }
                }}
                transitionAppear={true}
                transitionAppearTimeout={750}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}>
                {children
                    ? React.cloneElement(children, {
                        key: getChildPath(pathname)
                    })
                    : null
                }
             </ReactCSSTransitionGroup>
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
    routes: <Route path={`${basePath}/:filename`} component={PhotoModal} />
};

