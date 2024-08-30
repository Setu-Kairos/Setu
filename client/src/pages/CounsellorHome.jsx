import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useStore from '../store/useStore';

const CounsellorHome = () => {
    const { counsellorData } = useStore();
    const type = counsellorData.type;

    const getRandomPatients = () => Math.floor(Math.random() * 21) + 5; // Random number between 5 and 25

    const patientsData = [
        { month: 'Jan', patients: getRandomPatients() },
        { month: 'Feb', patients: getRandomPatients() },
        { month: 'Mar', patients: getRandomPatients() },
        { month: 'Apr', patients: getRandomPatients() },
        { month: 'May', patients: getRandomPatients() },
        { month: 'Jun', patients: getRandomPatients() },
    ];
    const issuesData = type === 'Mental Health Counsellor' ? [
        { name: 'Stress', value: 40 },
        { name: 'Anxiety', value: 30 },
        { name: 'Depression', value: 20 },
        { name: 'Self-Esteem', value: 10 },
    ] : [
        { name: 'Career', value: 40 },
        { name: 'Exams', value: 30 },
        { name: 'Assignments', value: 20 },
        { name: 'Extra-Curricular', value: 10 },
    ];

    const COLORS = ['#003f5c', '#2f4b7c', '#665191', '#a05195'];

    return (
        <div className="p-8 bg-gray700">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-300">Welcome, {counsellorData.name}</h1>
            <div className="mb-8 bg-gray-400 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text=">Total Patients Treated: {patientsData.reduce((total, item) => total + item.patients, 0)}</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="p-6 rounded-lg shadow-md flex-1 bg-gray-400">
                    <h3 className="text-xl font-semibold mb-4">Patients Treated Over the Past 6 Months</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={patientsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="patients" fill="#4a3f8d" />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-lg shadow-md flex-1 bg-gray-400">
                    <h3 className="text-xl font-semibold mb-4">Types of Issues Treated</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={issuesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {issuesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CounsellorHome;
