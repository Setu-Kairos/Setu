import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import Login from '../pages/Login';

const Navbar = () => {
    const { authState } = useOCAuth();

    // Check if studentAuthToken is present in localStorage
    const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('studentAuthToken')){
            setIsStudentAuthenticated(true);
        }
    }, [authState]);

    const handleLogout = () => {
        localStorage.removeItem('oc-token-storage');
        localStorage.removeItem('studentAuthToken');
        setIsStudentAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <nav className='bg-gray-700 py-1 px-8  flex flex-row justify-between w-full'>
            <Link to="/" className="text-white hover:text-gray-300">
                <img src="./src/assets/Education_Logo-removebg-preview.png" alt="" className="w-[70px]" />
            </Link>

            <div className="flex items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    {authState.isAuthenticated  ? (
                        <li>
                            <Link
                                to="/"
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Login />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
