import React from 'react';
import Link from 'react-router/lib/Link';
import Route from 'react-router/lib/Route';
import classNames from 'classnames';

import cacheable from '~/components/cacheable';

import styles from './photography.less';

const photosCtx = require.context('~/images/photography', false, /\.jpg$/);
const photos = photosCtx.keys().map(key => photosCtx(key));

const basePath = '/photography';

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
    const prev = (index === 0 ? photos.length : index) - 1;
    const next = index === photos.length - 1 ? 0 : index + 1;

    return <div className={styles.photoModal}>
        <div className={styles.modalContent}>
            <Link to={`${basePath}/${prev}`} className={styles.prev} />
            <Link to={`${basePath}/${next}`} className={styles.next} />
            <Link to={`${basePath}`} className={styles.close} />
            <a href={src} target="_blank"><img src={src} /></a>
        </div>
    </div>;
}

PhotoModal.propTypes = {
    params: React.PropTypes.shape({
        index: React.PropTypes.string
    })
}

export default class Photography extends React.Component {
    render() {
        const {
            className, location: { pathname }, children, ...rest
        } = this.props;

        return <div className={classNames(className, styles.photography)} {...rest}>
            <Photos />
            {children
                ? React.cloneElement(children, { key: pathname })
                : null
            }
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

