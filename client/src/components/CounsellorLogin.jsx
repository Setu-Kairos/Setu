import React, { useState } from 'react';
import { loginCounsellor } from '../apiClient';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const CounsellorLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {setCounsellorData, setIsCounsellorLoggedIn} = useStore();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginCounsellor(formData.email, formData.password);
            if (response.token) {
                localStorage.setItem('counsellorAuthToken', response.token);
                setIsCounsellorLoggedIn(true)
                setCounsellorData(response.counsellor)
                navigate('/'); // Adjust according to your route
                
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="text-black block text-sm font-medium mb-2">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-black p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="text-black block text-sm font-medium mb-2">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
                Login
            </button>
        </form>
    );
};

export default CounsellorLogin;
