import React from 'react';
import classNames from 'classnames';

import styles from './photography.less';

const photosCtx = require.context('~/images/photography', false, /\.jpg$/);
const photos = photosCtx.keys().map(key => photosCtx(key));

function Photos(props) {
    const { onPhotoClick, ...rest } = props;
    return <div className={styles.photos} {...rest}>
        {photos.map((photo, i) => <div key={i} className={styles.photo}>
            <img src={photo} onClick={function onClick(e) {
                if (onPhotoClick) {
                    onPhotoClick(e, photo, i);
                }
            }} />
        </div>)}
    </div>;
}

Photos.propTypes = {
    onPhotoClick: React.PropTypes.func
}

function PhotoModal(props) {
    const { close, index, ...rest } = props;
    return <div className={styles.photoModal} onClick={close} {...rest}>
        <img src={photos[index]} />
    </div>;
}

PhotoModal.propTypes = {
    close: React.PropTypes.func,
    index: React.PropTypes.number
}

export default class Photography extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const onPhotoClick = function onPhotoClick(e, photo, i) {
            this.setState({ photoModalIndex: i, photoModalShowing: true });
        }.bind(this);

        const photoModalClose = function photoModalClose() {
            this.setState({ photoModalShowing: false });
        }.bind(this);

        const { className, ...rest } = this.props;
        const { photoModalShowing, photoModalIndex } = this.state;
        return <div className={classNames(className, styles.photography)} {...rest}>
            <Photos onPhotoClick={onPhotoClick} />
            {photoModalShowing
                ? <PhotoModal index={photoModalIndex} close={photoModalClose} />
                : null}
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

