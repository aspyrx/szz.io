import React from 'react';
import { string, shape } from 'prop-types';
import { Link, NavLink }  from 'react-router-dom';

import styles from './header.less';

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
    const { path, title } = props.config;
    return <NavLink key={path}
        to={path}
        activeClassName={styles.active}
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
    return <div className={styles.header}>
        <Link to='/'><Logo /></Link>
        <div className={styles.navigation}>
            {renderNav('', routeConfig.children)}
        </div>
    </div>;
}

