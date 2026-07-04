import React, {
    useEffect,
    useRef,
} from 'react';
import {
    Link,
    Redirect,
    Route,
    useParams,
    useRouteMatch,
} from 'react-router-dom';

import TransitionReplace from 'src/components/TransitionReplace';
import Anchor from 'src/components/Anchor';
import cacheable from 'src/components/cacheable';

import * as styles from './index.less';

const previewTransition = {
    className: styles.transitionReplace,
    fromRightName: styles.fromRight,
    transitionName: [
        'appear', 'appearActive',
        'enter', 'enterActive',
        'leave', 'leaveActive',
    ].reduce((memo, key) => {
        memo[key] = styles[key];
        return memo;
    }, {}),
};

/**
 * Get filename from path.
 * @param {string} path - The path.
 * @returns {string} The filename.
 */
function getFilename(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

const photosCtx = import.meta.webpackContext(
    'public/photography', {
        recursive: false,
        include: /\.jpg$/,
    },
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

/**
 * Thumbnails grid.
 * @returns {React.ReactElement} The component's elements.
 */
function Thumbnails() {
    const match = useRouteMatch();
    const thumbs = photos.map((photo) => {
        const { filename, url } = photo;
        return (
            <Link
                key={filename}
                to={`${match.url}preview/${filename}`}
                className={styles.thumbnail}
            >
                <Img src={url} loadedClass={styles.loaded} />
            </Link>
        );
    });

    return (
        <nav className={styles.thumbnails}>
            {thumbs}
        </nav>
    );
}

/**
 * Preview modal.
 * @returns {React.ReactElement} The component's elements.
 */
function Preview() {
    const { filename } = useParams();
    const filenamePrevRef = useRef(filename);
    const filenamePrev = filenamePrevRef.current;
    useEffect(() => {
        filenamePrevRef.current = filename;
    }, [filename]);

    const photo = photosMap[filename];
    if (!photo) {
        return <Redirect to=".." />;
    }
    const { index, url } = photo;

    let fromRight = false;
    const photoPrev = photosMap[filenamePrev];
    if (photoPrev) {
        const { index: indexPrev } = photoPrev;
        fromRight = indexPrev < index;
    }

    const next = index > 0
        ? (
                <Link
                    className={styles.prev}
                    to={`./${photos[index - 1].filename}`}
                    relative="path"
                />
            )
        : null;

    const prev = index < photos.length - 1
        ? (
                <Link
                    className={styles.next}
                    to={`./${photos[index + 1].filename}`}
                    relative="path"
                />
            )
        : null;

    return (
        <TransitionReplace
            {...previewTransition}
            fromRight={fromRight}
        >
            <div key={filename} className={styles.photoPreview}>
                <Link to=".." className={styles.close} />
                <Anchor href={url}>
                    <img src={url} className={styles.image} />
                </Anchor>
                {next}
                {prev}
            </div>
        </TransitionReplace>
    );
}

/**
 * Photography page.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Photography() {
    const match = useRouteMatch();
    return (
        <section className={styles.photography}>
            <Thumbnails />
            <Route
                path={`${match.path}preview/:filename`}
                component={Preview}
            />
        </section>
    );
}
