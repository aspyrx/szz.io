import React from 'react';
import { string, shape } from 'prop-types';
import { Link, NavLink }  from 'react-router-dom';

import styles from './Header.less';

import routeConfig from '~/routeConfig';

function LogoS() {
    return <div className={styles.logoS}>
        <div className={styles.round} />
        <div className={styles.line} />
    </div>;
}

function Logo() {
    return <div className={styles.logo}>
        <LogoS />
        <LogoS />
        <LogoS />
        <span className={styles.logoText}>.io</span>
    </div>;
}

function HeaderLink(props) {
    const { config: { path, title }, ...rest } = props;
    return <NavLink key={path}
        to={path}
        activeClassName={styles.active}
        {...rest}
    >
        {title}
    </NavLink>;
}

HeaderLink.propTypes = {
    config: shape({
        path: string.isRequired,
        title: string.isRequired
    }).isRequired
};

function renderNav(parent, children) {
    return Object.keys(children).map(name => {
        const config = children[name];
        return <HeaderLink key={config.path} config={config} />;
    });
}

export default function Header() {
    return <header className={styles.header}>
        <Link to='/'><Logo /></Link>
        <nav className={styles.navigation}>
            <HeaderLink config={routeConfig} exact />
            {renderNav('', routeConfig.children)}
        </nav>
    </header>;
}

