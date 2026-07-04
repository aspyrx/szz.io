import React from 'react';
import { node } from 'prop-types';

/**
 * Anchor link.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Anchor(props) {
    const { children, ...rest } = props;
    return (
        <a {...rest} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}

Anchor.propTypes = {
    children: node,
};
