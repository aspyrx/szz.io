import React from 'react';
import { node } from 'prop-types';

export default function Anchor(props) {
    const { children, ...rest } = props;
    return <a {...rest} target='_blank' rel='noopener noreferrer'>
        {children}
    </a>;
}

Anchor.propTypes = {
    children: node
};

