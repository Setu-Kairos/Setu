import React, { useState } from 'react';
import CounsellorLogin from '../components/CounsellorLogin';
import CounsellorRegister from '../components/CounsellorRegister';

const CounsellorForm = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-black-gradient max-w-lg mx-auto text-white rounded-lg shadow-md my-5 py-2 px-4">
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => handleTabClick('login')}
                    className={`w-1/2 py-2 text-lg font-medium ${activeTab === 'login' ? 'bg-indigo-600' : 'bg-indigo-500'} text-white rounded-l-md`}
                >
                    Login
                </button>
                <button
                    onClick={() => handleTabClick('register')}
                    className={`w-1/2 py-2 text-lg font-medium ${activeTab === 'register' ? 'bg-indigo-600' : 'bg-indigo-500'} text-white rounded-r-md`}
                >
                    Register
                </button>
            </div>

            {activeTab === 'login' ? <CounsellorLogin /> : <CounsellorRegister />}
        </div>
    );
};

export default CounsellorForm;
