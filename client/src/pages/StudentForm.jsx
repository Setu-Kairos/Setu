import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { submitStudentForm } from '../apiClient';
import useStore from '../store/useStore';

const StudentForm = () => {
    const navigate = useNavigate();
    const { ocAuth } = useOCAuth();
    const setIsStudentLoggedIn = useStore((state) => state.setIsStudentLoggedIn); // Get the setter function

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: '',
        phone: '',
        class: '',
        school: '',
        city: '',
        state: '',
        dob: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { edu_username: openIdUsername, eth_address: ethAddress } = ocAuth.authInfoManager._idInfo;

            if (!openIdUsername || !ethAddress) {
                throw new Error('Open ID username or Ethereum address is missing.');
            }

            const dataToSubmit = {
                ...formData,
                openIdUsername,
                ethAddress,
            };

            const response = await submitStudentForm(dataToSubmit);

            if (response.status === 'success') {
                // Store the token in localStorage
                localStorage.setItem('studentAuthToken', response.token);
                setIsStudentLoggedIn(true); // Set global state to true

                // Navigate to the home page and pass the student data
                navigate('/', { state: { studentData: dataToSubmit } });
            } else {
                alert('An error occurred while submitting the form.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-black-gradient max-w-lg mx-auto text-white rounded-lg shadow-md my-5 py-2 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Student Information Form</h2>
            {[
                { label: "Name", name: "name", type: "text", placeholder: "Enter your name", required: true },
                { label: "Email", name: "email", type: "email", placeholder: "Enter your email", required: true },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
                { label: "Class", name: "class", type: "text", placeholder: "Enter your class", required: true },
                { label: "School", name: "school", type: "text", placeholder: "Enter your school name", required: true },
                { label: "City", name: "city", type: "text", placeholder: "Enter your city", required: true },
                { label: "State", name: "state", type: "text", placeholder: "Enter your state", required: true },
                { label: "Date of Birth", name: "dob", type: "date", required: true },
            ].map((field) => (
                <div key={field.name} className="mb-4">
                    <label htmlFor={field.name} className="block text-sm font-medium mb-2 ">
                        {field.label}:
                    </label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required={field.required}
                    />
                </div>
            ))}

            {/* Gender Dropdown */}
            <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium mb-2">
                    Gender:
                </label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
};

export default StudentForm;
