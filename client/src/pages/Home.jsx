import React from 'react';
import { useOCAuth } from '@opencampus/ocid-connect-js';

const Home = () => {
    const { authState, ocAuth } = useOCAuth();

    

    return (
        <div className='bg-discount-gradient h-[100vh] w-full flex flex-col justify-center items-center'>
            <h1 className='text-white'>Welcome to MyApp</h1>
            {authState.isAuthenticated ? (
                <div>
                    <p>You are logged in!</p>
                    <pre>{JSON.stringify(ocAuth.getAuthInfo(), null, 2)}</pre>

                </div>
            ) : (
                <div>
                    <p>You are logged out.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
