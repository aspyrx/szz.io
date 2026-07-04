import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import * as styles from './Header.less';

/**
 * The "S" in the logo.
 * @returns {React.ReactElement} The component's elements.
 */
function LogoS() {
    return (
        <div className={styles.logoS}>
            <div className={styles.round} />
            <div className={styles.line} />
        </div>
    );
}

/**
 * The logo.
 * @returns {React.ReactElement} The component's elements.
 */
function Logo() {
    return (
        <div className={styles.logo}>
            <LogoS />
            <LogoS />
            <LogoS />
            <span className={styles.logoText}>.io</span>
        </div>
    );
}

/**
 * Header link.
 * @param {object} props The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
function HeaderLink(props) {
    const { config: { path, title }, ...rest } = props;
    return (
        <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? styles.active : '')}
            {...rest}
        >
            {title}
        </NavLink>
    );
}

HeaderLink.propTypes = {
    config: shape({
        path: string.isRequired,
        title: string.isRequired,
    }).isRequired,
};

/**
 * Header.
 * @param {object} props The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Header(props) {
    const links = props.locations.map((config) => {
        return <HeaderLink key={config.path} config={config} />;
    });

    return (
        <header className={styles.header}>
            <Link to="/"><Logo /></Link>
            <nav>
                {links}
            </nav>
        </header>
    );
}

Header.propTypes = {
    locations: arrayOf(shape({
        path: string.isRequired,
        title: string.isRequired,
    })).isRequired,
};
