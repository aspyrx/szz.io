import React, { Component, forwardRef } from 'react';
import {
    Routes, Route, Link, Navigate,
    useParams
} from 'react-router-dom';
import { string } from 'prop-types';
import classNames from 'classnames';

import TransitionReplace from 'src/components/TransitionReplace';
import Anchor from 'src/components/Anchor';
import cacheable from 'src/components/cacheable';

import styles from './index.less';

const previewTransition = {
    className: styles.transitionReplace,
    fromRightName: styles.fromRight,
    transitionName: [
        'appear', 'appearActive',
        'enter', 'enterActive',
        'leave', 'leaveActive'
    ].reduce((memo, key) => {
        memo[key] = styles[key];
        return memo;
    }, {})
};

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
        return <Link
            key={filename}
            to={`./preview/${filename}`}
            className={styles.thumbnail}
        >
            <Img src={url} loadedClass={styles.loaded} />
        </Link>;
    });

    return <nav className={styles.thumbnails}>
        {thumbs}
    </nav>;
}

const PhotoPreview = forwardRef(function PhotoPreview(props, ref) {
    const { filename, className } = props;
    const photo = photosMap[filename];
    if (!photo) {
        return <Navigate to='..' />;
    }

    const { index, url } = photo;

    const next = index > 0
        ? <Link
            className={styles.prev}
            to={`../${photos[index - 1].filename}`}
            relative="path"
        />
        : null;

    const prev = index < photos.length - 1
        ? <Link
            className={styles.next}
            to={`../${photos[index + 1].filename}`}
            relative="path"
        />
        : null;

    const classes = classNames(className, styles.photoPreview);
    return <div className={classes} ref={ref}>
        <Link to='..' className={styles.close} />
        <Anchor href={url}>
            <img src={url} className={styles.image} />
        </Anchor>
        {next}
        {prev}
    </div>;
});

PhotoPreview.propTypes = {
    className: string,
    filename: string.isRequired
};

class TransitionPreviews extends Component {
    static get propTypes() {
        return {
            filename: string
        };
    }

    constructor() {
        super();
        this.state = {
            fromRight: false
        };
    }

    componentDidUpdate(prevProps) {
        const { filename: prevFilename } = prevProps;
        const { filename } = this.props;
        if (filename === prevFilename) {
            return;
        }

        const { index: prevIndex } = photosMap[prevFilename];
        const { index } = photosMap[filename];
        const nextFromRight = index > prevIndex;
        const { fromRight } = this.state;

        if (nextFromRight !== fromRight) {
            this.setState({ fromRight: nextFromRight });
        }
    }

    render() {
        const { filename } = this.props;
        const { fromRight } = this.state;

        return <TransitionReplace
            {...previewTransition}
            fromRight={fromRight}
        >
            <PhotoPreview key={filename} filename={filename} />
        </TransitionReplace>;
    }
}

function Preview() {
    const { filename } = useParams();
    return <TransitionPreviews filename={filename} />;
}

export default class Photography extends React.Component {
    render() {
        return <section className={styles.photography}>
            <Thumbnails />
            <Routes>
                <Route
                    path='preview/:filename'
                    element={<Preview />}
                />
            </Routes>
        </section>;
    }
}

