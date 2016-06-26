import React from 'react';
import Link from 'react-router/lib/Link';

import styles from './header.less';

function LogoS() {
    return <div className={styles.logoS}>
        <div className={styles.round} />
        <div className={styles.line} />
    </div>
}

function Logo() {
    return <div className={styles.logo}>
        <LogoS />
        <LogoS />
        <LogoS />
        .io
    </div>;
}

export default function Header(props) {
    const { pages } = props;
    return <div className={styles.header}>
        <Link to="/home"><Logo /></Link>
        <div className={styles.navigation}>
            {pages.map((module, i) => {
                const { page: { path, title } } = module;
                return <Link key={i}
                    to={path}
                    activeClassName={styles.active}>
                    {title}
                </Link>;
            })}
        </div>
    </div>;
}

const { arrayOf, shape, string } = React.PropTypes;
Header.propTypes = {
    pages: arrayOf(shape({
        module: shape({
            page: shape({
                path: string,
                title: string
            })
        })
    })).isRequired
}

