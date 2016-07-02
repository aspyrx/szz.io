import React from 'react';
import classNames from 'classnames';

import cacheable from '~/components/cacheable';

import styles from './photography.less';

const photosCtx = require.context('~/images/photography', false, /\.jpg$/);
const photos = photosCtx.keys().map(key => photosCtx(key));

const Img = cacheable(function img(props) {
    return <img {...props} />;
});

function Photos(props) {
    const { onPhotoClick, ...rest } = props;
    return <div className={styles.photos} {...rest}>
        {photos.map((photo, i) => {
            return <div key={i} className={styles.photo}>
                <Img src={photo}
                    loadedClass={styles.loaded}
                    onClick={function onClick(e) {
                        if (onPhotoClick) {
                            onPhotoClick(e, photo, i);
                        }
                    }}
                />
            </div>;
        })}
    </div>;
}

Photos.propTypes = {
    onPhotoClick: React.PropTypes.func
}

function PhotoModal(props) {
    const { className, index, setIndex, close, ...rest } = props;
    const classes = classNames(styles.photoModal, className);
    const src = photos[index];

    function prev() {
        setIndex(index - 1);
    }

    function next() {
        setIndex(index + 1);
    }

    return <div className={classes} {...rest}>
        <div className={styles.prev} onClick={prev} />
        <div className={styles.close} onClick={close} />
        <div className={styles.next} onClick={next} />
        <a href={src} target="_blank"><img src={src} /></a>
    </div>;
}

PhotoModal.propTypes = {
    className: React.PropTypes.any,
    index: React.PropTypes.number,
    setIndex: React.PropTypes.func,
    close: React.PropTypes.func
}

export default class Photography extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const setPhotoModalIndex = function setPhotoModalIndex(i) {
            const { photoModalIndex } = this.state;
            const photoModalIncrease = i > photoModalIndex;
            if (i < 0) {
                i = photos.length - 1;
            } else if (i >= photos.length) {
                i = 0;
            }

            this.setState({ photoModalIndex: i, photoModalIncrease });
        }.bind(this);

        const onPhotoClick = function onPhotoClick(e, photo, i) {
            setPhotoModalIndex(i);
            this.setState({ photoModalShowing: true });
        }.bind(this);

        const photoModalClose = function photoModalClose() {
            this.setState({ photoModalShowing: false });
        }.bind(this);


        const {
            photoModalShowing, photoModalIndex, photoModalIncrease
        } = this.state;

        const photoModalClass = classNames({
            [styles.increase]: photoModalIncrease
        });

        const { className, ...rest } = this.props;

        return <div className={classNames(className, styles.photography)} {...rest}>
            <Photos onPhotoClick={onPhotoClick} />
            {photoModalShowing
                ? <PhotoModal className={photoModalClass}
                    index={photoModalIndex}
                    close={photoModalClose}
                    setIndex={setPhotoModalIndex} />
                : null
            }
        </div>;
    }
}

Photography.propTypes = {
    className: React.PropTypes.any
}

export const page = {
    path: '/photography',
    title: 'photography'
};

