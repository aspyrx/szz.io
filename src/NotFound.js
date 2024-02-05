import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
    const { pathname } = useLocation();
    return <div>
        <h1>404 - Not Found</h1>
        <p>The location <code>{pathname}</code> does not exist.</p>
    </div>;
}

