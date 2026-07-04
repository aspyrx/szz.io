import React from 'react';
import { bool, string, element } from 'prop-types';
import CSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';

import * as styles from './TransitionReplace.less';

/**
 * Transition the child element's replacement.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
export default function TransitionReplace(props) {
    const { children, className, fromRight, fromRightName, ...rest } = props;
    const classes = classNames(className, {
        [fromRightName]: fromRight,
    });

    return (
        <CSSTransitionReplace className={classes} {...rest}>
            {children}
        </CSSTransitionReplace>
    );
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
        'leave', 'leaveActive',
    ].reduce((memo, key) => {
        memo[key] = styles[key];
        return memo;
    }, {}),
    className: styles.transitionReplace,
    fromRightName: styles.fromRight,
};

TransitionReplace.propTypes = {
    children: element,
    className: string,
    fromRight: bool,
    fromRightName: string,
};
