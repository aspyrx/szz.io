/**
 * Implements a React component for wrapping functions that asynchronously load
 * React components.
 * @module src/AsyncComponent
 */

import React, { useEffect, useState } from 'react';
import {
    func,
} from 'prop-types';

import Spinner from 'src/components/Spinner';

/**
 * Function that asynchronously fetches a React component module.
 * @callback GetModule
 * @returns {Promise} Resolves with the component's module, whose default export
 * is the React component.
 */

/**
 * Use the given function to retrieve the actual component's module to render
 * only when the component is first mounted.
 *
 * Designed for usage with webpack dynamic `import()`.
 * @param {object} props - The component's props.
 * @param {GetModule} props.getModule - The module-fetching function.
 * @returns {React.ReactElement} - The component's elements.
 */
export default function AsyncComponent({
    getModule,
    ...props
}) {
    // Functions cannot be directly stored as state; use an object.
    const [cache, setCache] = useState({
        Component: null,
    });
    const { Component } = cache;

    useEffect(() => {
        if (Component) {
            return;
        }

        (async function getComponent() {
            const module = await getModule();
            setCache({ Component: module.default });
        })();
    }, [getModule, Component]);

    if (Component) {
        return <Component {...props} />;
    }
    return <Spinner />;
}
AsyncComponent.propTypes = {
    getModule: func.isRequired,
};
