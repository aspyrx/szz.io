import React from 'react';
import { bool, element } from 'prop-types';
import CSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';

import styles from './TransitionReplace.less';

export default function TransitionReplace(props) {
    const { children, fromRight, ...rest } = props;
    const className = classNames(styles.transitionReplace, {
        [styles.fromRight]: fromRight
    });

    return <CSSTransitionReplace
        className={className}
        {...rest}
    >
        {children}
    </CSSTransitionReplace>;
}

TransitionReplace.defaultProps = {
    overflowHidden: false,
    transitionAppear: true,
    transitionAppearTimeout: 750,
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 300,
    transitionName: [
        'appear', 'appearActive',
        'enter', 'enterActive',
        'leave', 'leaveActive'
    ].reduce((memo, key) => {
        memo[key] = styles[key];
        return memo;
    }, {})
};

TransitionReplace.propTypes = {
    children: element,
    fromRight: bool
};

