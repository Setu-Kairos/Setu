import React, { useState, useEffect } from 'react';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { fetchStudentData } from '../apiClient'; // Adjust the import path as necessary

const StudentProfile = () => {
    const { ocAuth } = useOCAuth(); // Removed authState as it's not needed nymore
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('studentAuthToken');
            if (token) {
                try {
                    const { edu_username: openIdUsername } = ocAuth.authInfoManager._idInfo;

                    if (!openIdUsername) {
                        throw new Error('Open ID username is missing.');
                    }

                    const data = await fetchStudentData(openIdUsername);
                    setStudentData(data.data); // Adjusted to directly set the 'data' field
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // Stop loading if there's no token
            }
        };

        fetchData();
    }, [ocAuth]);

    return (
        <div className='p-4'>
            <h1 className='text-white text-2xl'>Student Profile</h1>
            {loading && <p>Loading student data...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {studentData && (
                <div className='bg-gray-800 p-4 rounded text-white mt-4'>
                    <p><strong>OpenID Username:</strong> {studentData.openIdUsername}</p>
                    <p><strong>Ethereum Address:</strong> {studentData.ethAddress}</p>
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Gender:</strong> {studentData.gender}</p>
                    <p><strong>Email:</strong> {studentData.email}</p>
                    <p><strong>Phone:</strong> {studentData.phone}</p>
                    <p><strong>Class:</strong> {studentData.class}</p>
                    <p><strong>School:</strong> {studentData.school}</p>
                    <p><strong>City:</strong> {studentData.city}</p>
                    <p><strong>State:</strong> {studentData.state}</p>
                    <p><strong>Date of Birth:</strong> {new Date(studentData.dob).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
};

export default StudentProfile;
