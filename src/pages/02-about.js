import React from 'react';

import styles from './about.less';

export default function About(props) {
    return <div className={styles.about} {...props}>
    </div>
}

export const page = {
    path: '/about',
    title: 'about'
}

