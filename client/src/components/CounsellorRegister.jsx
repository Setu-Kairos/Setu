import React, { useState } from 'react';
import { registerCounsellor } from '../apiClient';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const CounsellorRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        bio: '',
        photo: null, // Photo will be a file, so we start with null
        type: '',
    });
    const {setCounsellorData, setIsCounsellorLoggedIn} = useStore();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'photo') {
            setFormData({
                ...formData,
                photo: files[0], // Set the selected file as the photo
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const data = new FormData();
        data.append('name', formData.name);
        data.append('age', formData.age);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('bio', formData.bio);
        if (formData.photo) {
            data.append('photo', formData.photo); // Add the photo file to the FormData
        }
        data.append('type', formData.type);

        try {
            const response = await registerCounsellor(data);

            if (response.token) {
                localStorage.setItem('counsellorAuthToken', response.token);
                setIsCounsellorLoggedIn(true)
                setCounsellorData(response.counsellor)
                navigate('/');
            } else {
                alert('Error During Registration');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {[
                { label: "Name", name: "name", type: "text", placeholder: "Enter your name", required: true },
                { label: "Age", name: "age", type: "number", placeholder: "Enter your age", required: true },
                { label: "Email", name: "email", type: "email", placeholder: "Enter your email", required: true },
                { label: "Password", name: "password", type: "password", placeholder: "Enter your password", required: true },
            ].map((field) => (
                <div key={field.name} className="mb-4">
                    <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                        {field.label}:
                    </label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required={field.required}
                    />
                </div>
            ))}

            <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio:</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder='Enter bio'
                    className="w-full p-2 border bg-white text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium mb-2">Counsellor Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                >
                    <option value="">Select Counsellor Type</option>
                    <option value="Mental Health Counsellor">Mental Health Counsellor</option>
                    <option value="Academic Counsellor">Academic Counsellor</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-medium mb-2">Photo:</label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleChange}
                    className="w-full p-2 border bg-white text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    accept="image/*"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
                Register
            </button>
        </form>
    );
};

export default CounsellorRegister;
