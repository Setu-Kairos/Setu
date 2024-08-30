import React from 'react';
import useStore from '../store/useStore';
import StudentHome from './StudentHome';
import MainHome from './MainHome';
import CounsellorHome from './CounsellorHome';

const Home = () => {
    const isStudentLoggedIn = useStore((state) => state.isStudentLoggedIn);
    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);

    return (
        <div>
            {isStudentLoggedIn && <StudentHome />}
            {isCounsellorLoggedIn && <CounsellorHome />}
            {(!isStudentLoggedIn && !isCounsellorLoggedIn) && <MainHome />}
        </div>
    );
};

export default Home;
