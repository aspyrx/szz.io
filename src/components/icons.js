import React from 'react';
import classNames from 'classnames';

import styles from './icons.less';

export function GithubIcon(props) {
    const { className, ...rest } = props;
    const classes = classNames(
        'mega-octicon',
        'octicon-mark-github',
        className
    );

    return <a className={classes} {...rest} />
}

GithubIcon.propTypes = {
    className: React.PropTypes.any
};

GithubIcon.defaultProps = {
    href: 'https://github.com/aspyrx',
    target: '_blank'
};

export function FacebookIcon(props) {
    const { className, ...rest } = props;
    return <a className={classNames(className, styles.facebookIcon)} {...rest} />;
}

FacebookIcon.propTypes = {
    className: React.PropTypes.any
};

FacebookIcon.defaultProps = {
    href: 'https://www.facebook.com/stan.zhang2',
    target: '_blank'
};

