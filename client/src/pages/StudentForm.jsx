import React, { useState } from 'react';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        school: '',
        class:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Handle form submission, such as sending data to the backend
    };

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-gradient-to-r from-blue-500 to-blue-900 text-white">
            <h2 className="text-2xl mb-4">Student Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex  flex-row justify-center items-center space-x-3'>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="px-2 py-1 rounded text-black"
                    />
                </div>
                <div className='flex  flex-row justify-center items-center space-x-3' >
                    <label>Age: </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="px-2 py-1 rounded text-black"
                    />
                </div>
                <div className='flex  flex-row justify-center items-center space-x-3'>
                    <label>School: </label>
                    <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className="px-2 py-1 rounded text-black"
                    />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default StudentForm;
