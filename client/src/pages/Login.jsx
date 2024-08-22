import React from 'react';
import { useOCAuth } from '@opencampus/ocid-connect-js';

const Login = () => {
    const { ocAuth } = useOCAuth();

    const handleLogin = async () => {
        try {
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
        } catch (e) {
            console.error('Login failed:', e);
        }
    };

    return (
        <div className='text-white'>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
