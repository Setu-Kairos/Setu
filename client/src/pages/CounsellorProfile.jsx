import React from 'react';
import useStore from '../store/useStore';

const CounsellorProfile = () => {
    const { counsellorData } = useStore();

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900 p-4'>
            <div className='bg-gray-800 p-6 rounded text-white max-w-lg w-full'>
                <h1 className='text-2xl mb-4'>Counsellor Profile</h1>
                {counsellorData && (
                    <div className='text-center'>
                        <img 
                            src={counsellorData.photo} 
                            alt="Counsellor Photo" 
                            className="w-32 h-32 rounded-full object-cover mb-4 mx-auto" 
                        />
                        <p><strong>Name:</strong> {counsellorData.name}</p>
                        <p><strong>Age:</strong> {counsellorData.age}</p>
                        <p><strong>Email:</strong> {counsellorData.email}</p>
                        <p><strong>Bio:</strong> {counsellorData.bio}</p>
                        <p><strong>Type:</strong> {counsellorData.type}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CounsellorProfile;
