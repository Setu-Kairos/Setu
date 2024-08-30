import React from 'react';
import useStore from '../store/useStore';
import StudentHome from './StudentHome';
import MainHome from './MainHome';

const Home = () => {
    const isStudentLoggedIn = useStore((state) => state.isStudentLoggedIn);
    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);

    return (
        <div>
            {isStudentLoggedIn && <StudentHome />}
            {/* Add other components or elements here if needed */}
            {(!isStudentLoggedIn && !isCounsellorLoggedIn) && <MainHome />}
        </div>
    );
};

export default Home;
