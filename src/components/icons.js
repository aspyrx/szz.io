import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import Anchor from 'src/components/Anchor';
import * as styles from './icons.less';
import 'vendor/octicons/octicons.less';

/**
 * GitHub icon.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
export function GithubIcon(props) {
    const { className, ...rest } = props;
    const classes = classNames(
        'mega-octicon',
        'octicon-mark-github',
        className,
    );
    return <Anchor {...rest} className={classes} />;
}

GithubIcon.propTypes = {
    className: string,
};

GithubIcon.defaultProps = {
    href: 'https://github.com/aspyrx',
};

/**
 * Facebook icon.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
export function FacebookIcon(props) {
    const { className, ...rest } = props;
    const classes = classNames(className, styles.facebookIcon);
    return <Anchor {...rest} className={classes} />;
}

FacebookIcon.propTypes = {
    className: string,
};

FacebookIcon.defaultProps = {
    href: 'https://www.facebook.com/stan.zhang2',
};
