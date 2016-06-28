import React from 'react';
import classNames from 'classnames';

import styles from './icons.less';

import favicon from '~/images/favicon.png';

export function GithubIcon(props) {
    const { className, ...rest } = props;
    const classes = classNames(
        'mega-octicon',
        'octicon-mark-github',
        className
    );

    return <a className={classes} {...rest} />
}

GithubIcon.propTypes = {
    className: React.PropTypes.any
};

GithubIcon.defaultProps = {
    href: 'https://github.com/aspyrx',
    target: '_blank'
};

export function FacebookIcon(props) {
    const { className, ...rest } = props;
    return <a className={classNames(className, styles.facebookIcon)} {...rest} />;
}

FacebookIcon.propTypes = {
    className: React.PropTypes.any
};

FacebookIcon.defaultProps = {
    href: 'https://www.facebook.com/stan.zhang2',
    target: '_blank'
};

export class Favicon extends React.Component {
    componentWillMount() {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'shortcut icon';
        this.link = link;

        // remove existing favicons
        const links = head.getElementsByTagName("link");
        for (let i = links.length - 1; i >= 0; i--) {
            if (/\bicon\b/i.test(links[i].getAttribute("rel"))) {
                this.oldLink = links[i];
                head.removeChild(links[i])
            }
        }

        head.appendChild(link);

        const img = document.createElement('img');
        img.onload = function faviconImgOnLoad() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const { width, height } = canvas;
            const xOff = width / 2;
            const yOff = height / 2;
            const context = canvas.getContext('2d');
            let angle = 0;
            this.updateInterval = setInterval(function faviconUpdate() {
                angle = angle === 360 ? 0 : angle + 5;

                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, width, height);
                context.translate(xOff, yOff);
                context.rotate(angle * Math.PI / 180);
                context.drawImage(img, -xOff, -yOff);

                link.href = context.canvas.toDataURL();
            }.bind(this), 80);
        }.bind(this);

        img.src = favicon;
    }

    componentWillUnmount() {
        const { link, oldLink, updateInterval } = this;
        const head = document.getElementsByTagName('head')[0];
        head.removeChild(link);
        head.appendChild(oldLink);

        clearInterval(updateInterval);
    }

    render() {
        return null;
    }
}

