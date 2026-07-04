/**
 * 404 page React component.
 * @module src/NotFound
 */

import React from 'react';
import {
    useLocation,
} from 'react-router-dom';

/**
 * The 404 page. Used with `react-router` to display the appropriate pathname.
 * @returns {React.ReactElement} The rendered component.
 */
export default function NotFound() {
    const { pathname } = useLocation();

    return (
        <>
            <h1>404 - Not Found</h1>
            <p>
                The location
                {' '}
                <code>{pathname}</code>
                {' '}
                does not exist.
            </p>
        </>
    );
}
