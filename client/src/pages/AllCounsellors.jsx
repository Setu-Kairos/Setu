import React, { useEffect, useState } from 'react';
import { fetchAllCounsellors } from '../apiClient';

const AllCounsellors = () => {
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState(''); // New state for filtering by type

    useEffect(() => {
        const loadCounsellors = async () => {
            try {
                const data = await fetchAllCounsellors();
                setCounsellors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCounsellors();
    }, []);

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filteredCounsellors = filterType
        ? counsellors.filter(counsellor => counsellor.type === filterType)
        : counsellors;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='min-h-screen bg-gray-900 p-4'>
            <h1 className='text-white text-3xl mb-6 text-center'>All Counsellors</h1>
            
            {/* Filter Dropdown */}
            <div className='mb-6 text-center'>
                <label htmlFor="filterType" className="text-white mr-4">Filter by Type:</label>
                <select
                    id="filterType"
                    value={filterType}
                    onChange={handleFilterChange}
                    className='p-2 rounded text-black'
                >
                    <option value="">All</option>
                    <option value="Mental Health Counsellor">Mental Health Counsellor</option>
                    <option value="Academic Counsellor">Academic Counsellor</option>
                </select>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {filteredCounsellors.map((counsellor) => (
                    <div key={counsellor._id} className='bg-gray-800 p-6 rounded text-white'>
                        <img 
                            src={counsellor.photo} 
                            alt={`${counsellor.name}`} 
                            className='w-32 h-32 rounded-full object-cover mb-4 mx-auto' 
                        />
                        <h2 className='text-xl mb-2'>{counsellor.name}</h2>
                        <p><strong>Age:</strong> {counsellor.age}</p>
                        <p><strong>Email:</strong> {counsellor.email}</p>
                        <p><strong>Bio:</strong> {counsellor.bio}</p>
                        <p><strong>Type:</strong> {counsellor.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCounsellors;
