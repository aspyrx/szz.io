/*
 * home.js - Home page for the app.
 */

import React from 'react';
import classNames from 'classnames';
import {GithubIcon, FacebookIcon} from '~/components/icons';
import cacheable from '~/components/cacheable';

import styles from './home.less';

import avatar from '~/images/avatar.jpg';

const Img = cacheable(function img(props) {
    return <img {...props} />
});

function Bio(props) {
    return <div className={styles.bio} {...props}>
        <a className={styles.avatar}
            href="https://github.com/aspyrx"
            target="_blank">
            <Img src={avatar} loadedClass={styles.loaded} />
        </a>
        <div className={styles.text}>
            <h1>Stan Zhang</h1>
            <h2><a href="https://ece.cmu.edu/" target="_blank">
                    Electrical and Computer Engineering
                </a>
                <span> major at </span>
                <a href="https://www.cmu.edu/" target="_blank">
                    Carnegie Mellon University
                </a>
                <span>.</span>
            </h2>
            <span className={styles.icons}>
                <GithubIcon />
                <FacebookIcon />
            </span>
        </div>
    </div>;
}

export default function Home(props) {
    const { className } = props;
    return <div className={classNames(className, styles.home)}>
        <Bio />
    </div>;
}

Home.propTypes = {
    className: React.PropTypes.any
}

export const page = {
    path: '/home',
    title: 'home'
};

