import React from 'react';

import { GithubIcon, FacebookIcon } from '~/components/icons';
import cacheable from '~/components/cacheable';
import Anchor from '~/components/Anchor';

import styles from './index.less';

import avatar from 'public/assets/avatar.jpg';

const Img = cacheable(function img(props) {
    return <img {...props} />;
});

export default function Home() {
    return <section className={styles.home}>
        <header>
            <Anchor className={styles.avatar} href='https://github.com/aspyrx'>
                <Img src={avatar} loadedClass={styles.loaded} />
            </Anchor>
            <h1>Stan Zhang</h1>
        </header>
        <main>
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
        </main>
        <footer className={styles.icons}>
            <GithubIcon />
            <FacebookIcon />
        </footer>
    </section>;
}

