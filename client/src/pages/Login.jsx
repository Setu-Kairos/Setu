import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';

const Login = () => {
    const { ocAuth } = useOCAuth();
    const [userType, setUserType] = useState('student');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (userType === 'student') {
                await ocAuth.signInWithRedirect({ state: 'opencampus-student' });
            } else if (userType === 'counsellor') {
                navigate('/counsellor-login'); 
            }
        } catch (e) {
            console.error('Login failed:', e);
        }
    };
    return (
        <div className='text-white'>
            <div className='mb-4'>
                <label className='mr-2'>Login as:</label>
                <select 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className='text-black'>
                    <option value="student">Student</option>
                    <option value="counsellor">Counsellor</option>
                </select>
            </div>
            <button onClick={handleLogin} className='btn-primary'>
                Login
            </button>
        </div>
    );
};

export default Login;
