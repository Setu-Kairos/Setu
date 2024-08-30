import React from 'react';
import useStore from '../store/useStore';

const Home = () => {
    const isStudentLoggedIn = useStore((state) => state.isStudentLoggedIn);
    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);

    return (
        <div className='h-[100vh] w-full flex flex-col justify-center items-center text-white'>
            <h1 className='text-white'>Welcome to MyApp</h1>
            {isStudentLoggedIn && <p>You are logged in as a Student!</p>}
            {isCounsellorLoggedIn && <p>You are logged in as a Counsellor!</p>}
            {!isStudentLoggedIn && !isCounsellorLoggedIn && <p>You are logged out.</p>}
        </div>
    );
};

export default Home;
