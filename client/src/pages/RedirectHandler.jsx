import React from 'react';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../apiClient';

const RedirectHandler = () => {
    const navigate = useNavigate();
    const { ocAuth } = useOCAuth();

    const loginSuccess = async () => {
        console.log('Login successful!');

        try {
            const { edu_username: openIdUsername, eth_address: ethAddress } = ocAuth.authInfoManager._idInfo;

            if (!openIdUsername || !ethAddress) {
                throw new Error('Open ID username or Ethereum address is missing.');
            }

            const response = await authenticateUser(openIdUsername, ethAddress);

            if (response.status === 'exists') {
                // Store the token in localStorage
                localStorage.setItem('studentAuthToken', response.token);
                navigate('/', { state: { studentData: response.data } });
            } else {
                navigate('/student-form');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('An error occurred during login.');
        }
    };

    const loginError = (error) => {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message}`);
        navigate('/login');
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
