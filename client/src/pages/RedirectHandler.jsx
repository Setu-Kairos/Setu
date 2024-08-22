import React from 'react';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
    const navigate = useNavigate();

    const loginSuccess = () => {
        console.log('Login successful!');
        navigate('/student-form'); // Redirect to form page after successful login
    };

    const loginError = (error) => {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message}`);  // Show an alert for quick feedback
        navigate('/login'); // Redirect to login page on error
    };

    return (
        <LoginCallBack
            successCallback={loginSuccess}
            errorCallback={loginError}
            customLoadingComponent={() => <div>Loading...</div>}
            customErrorComponent={() => <div>Error during login</div>}
        />
    );
};

export default RedirectHandler;
