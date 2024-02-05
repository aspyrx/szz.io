import React from 'react';

import { GithubIcon, FacebookIcon } from 'src/components/icons';
import cacheable from 'src/components/cacheable';
import Anchor from 'src/components/Anchor';

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
                <span>Staff Engineer, ESXi VMkernel core,&nbsp;</span>
                <Anchor href='https://www.vmware.com/'>
                    VMware by Broadcom
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

