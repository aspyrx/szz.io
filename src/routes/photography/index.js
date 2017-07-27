import React from 'react';
import { Route, Link } from 'react-router-dom';
import { string, shape } from 'prop-types';

import Anchor from '~/components/anchor';
import cacheable from '~/components/cacheable';

import styles from './index.less';

function getFilename(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

const photosCtx = require.context(
    'public/photography', false, /\.jpg$/
);
const photosMap = Object.create(null);
const photos = photosCtx.keys().map((key, index) => {
    const url = photosCtx(key);
    const filename = getFilename(url);
    const photo = { filename, url, index };
    photosMap[filename] = photo;
    return photo;
});

const Img = cacheable(function img(props) {
    return <img {...props} />;
});

function Thumbnails() {
    const thumbs = photos.map(photo => {
        const { filename, url } = photo;
        return <Link key={filename}
            to={`./${filename}`}
            className={styles.thumbnail}>
            <Img src={url} loadedClass={styles.loaded} />
        </Link>;
    });

    return <div className={styles.thumbnails}>
        {thumbs}
    </div>;
}

function PhotoModal(props) {
    let { filename } = props.match.params;

    const { index, url } = photosMap[filename];

    const next = index > 0
        ? <Link className={styles.prev}
            to={`./${photos[index - 1].filename}`} />
        : null;

    const prev = index < photos.length - 1
        ? <Link className={styles.next}
            to={`./${photos[index + 1].filename}`} />
        : null;

    return <div className={styles.photoModal}>
        <Link to='../' className={styles.close} />
        <Anchor href={url}>
            <img src={url} className={styles.image} />
        </Anchor>
        {next}
        {prev}
    </div>;
}

PhotoModal.propTypes = {
    match: shape({
        params: shape({
            filename: string.isRequired
        }).isRequired
    }).isRequired
};

export default class Photography extends React.Component {
    render() {
        return <div className={styles.photography}>
            <Thumbnails />
            <Route path='/photography/:filename' component={PhotoModal} />
        </div>;
    }
}

