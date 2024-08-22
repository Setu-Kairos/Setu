import React from 'react';
import { OCConnect } from '@opencampus/ocid-connect-js';

const OCAuthProvider = ({ children }) => {
    const opts = {
        redirectUri: 'http://localhost:5173/redirect', // Ensure this matches your configuration
    };

    return (
        <OCConnect opts={opts} sandboxMode={true}>
            {children}
        </OCConnect>
    );
};

export default OCAuthProvider;
