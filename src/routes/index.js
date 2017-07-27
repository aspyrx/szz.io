import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import { GithubIcon, FacebookIcon } from '~/components/icons';
import cacheable from '~/components/cacheable';
import Anchor from '~/components/anchor';

import styles from './index.less';

import avatar from 'public/assets/avatar.jpg';

const Img = cacheable(function img(props) {
    return <img {...props} />;
});

function Bio(props) {
    return <div className={styles.bio} {...props}>
        <Anchor className={styles.avatar} href='https://github.com/aspyrx'>
            <Img src={avatar} loadedClass={styles.loaded} />
        </Anchor>
        <div className={styles.text}>
            <h1>Stan Zhang</h1>
            <h2>
                <Anchor href='https://ece.cmu.edu/'>
                    Electrical and Computer Engineering
                </Anchor>
                <span> major at </span>
                <Anchor href='https://www.cmu.edu/'>
                    Carnegie Mellon University
                </Anchor>
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
    className: string
};

