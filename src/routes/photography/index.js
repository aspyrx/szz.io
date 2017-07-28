import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { string, object, shape } from 'prop-types';
import classNames from 'classnames';

import TransitionReplace from '~/components/TransitionReplace';
import Anchor from '~/components/Anchor';
import cacheable from '~/components/cacheable';

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

function PhotoPreview(props) {
    const { filename, className } = props;
    const photo = photosMap[filename];
    if (!photo) {
        return <Redirect to='/photography/' />;
    }

    const { index, url } = photo;

    const next = index > 0
        ? <Link
            className={styles.prev}
            to={`./${photos[index - 1].filename}`}
        />
        : null;

    const prev = index < photos.length - 1
        ? <Link
            className={styles.next}
            to={`./${photos[index + 1].filename}`}
        />
        : null;

    const classes = classNames(className, styles.photoPreview);
    return <div className={classes}>
        <Link to='/photography/' className={styles.close} />
        <Anchor href={url}>
            <img src={url} className={styles.image} />
        </Anchor>
        {next}
        {prev}
    </div>;
}

PhotoPreview.propTypes = {
    className: string,
    filename: string.isRequired
};

class TransitionPreviews extends Component {
    static get propTypes() {
        return {
            match: shape({
                params: shape({
                    filename: string.isRequired
                }).isRequired
            }).isRequired,
            location: object.isRequired
        };
    }

    constructor() {
        super();
        this.state = {
            fromRight: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { filename: nextFilename } = nextProps.match.params;
        const { filename } = this.props.match.params;
        if (filename === nextFilename) {
            return;
        }

        const { index: nextIndex } = photosMap[nextFilename];
        const { index } = photosMap[filename];
        const nextFromRight = nextIndex > index;
        const { fromRight } = this.state;

        if (nextFromRight !== fromRight) {
            this.setState({ fromRight: nextFromRight });
        }
    }

    render() {
        const { filename } = this.props.match.params;
        const { fromRight } = this.state;

        return <TransitionReplace
            {...previewTransition}
            fromRight={fromRight}
        >
            <PhotoPreview key={filename} filename={filename} />
        </TransitionReplace>;
    }
}

export default class Photography extends React.Component {
    render() {
        return <section className={styles.photography}>
            <Thumbnails />
            <Route
                path='/photography/preview/:filename'
                component={TransitionPreviews}
            />
        </section>;
    }
}

