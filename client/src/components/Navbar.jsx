import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import Login from '../pages/Login';
import useStore from '../store/useStore';

const Navbar = () => {
    const isStudentLoggedIn = useStore((state) => state.isStudentLoggedIn);
    const setIsStudentLoggedIn = useStore((state) => state.setIsStudentLoggedIn);

    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);
    const setIsCounsellorLoggedIn = useStore((state) => state.setIsCounsellorLoggedIn)



    const handleLogout = () => { 
        localStorage.removeItem('oc-token-storage');
        localStorage.removeItem('studentAuthToken');
        localStorage.removeItem('counsellorAuthToken');
        setIsStudentLoggedIn(false);
        setIsCounsellorLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav className='bg-blue-700 py-1 px-8 flex flex-row justify-between w-full'>
            <Link to="/" className="text-white hover:text-gray-300">
                <img src="../assets/Education_Logo__1_-removebg-preview.png" alt="Logo" className="w-[70px]" />
            </Link>

            <div className="flex items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    {isStudentLoggedIn && (
                        <li>
                            <Link to="/student-profile" className="text-white hover:text-gray-300">
                                Student Profile
                            </Link>
                        </li>
                    )}
                    {isCounsellorLoggedIn && (
                        <li>
                            <Link to="/counsellor-profile" className="text-white hover:text-gray-300">
                                Counsellor Profile
                            </Link>
                        </li>
                    )}
                    {(isStudentLoggedIn || isCounsellorLoggedIn) ? (
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
