import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OCAuthProvider from './context/OCAuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import RedirectHandler from './pages/RedirectHandler';
import Navbar from './components/Navbar';
import StudentForm from './pages/StudentForm';
import CounsellorForm from './pages/CounsellorForm';
import StudentProfile from './pages/StudentProfile';
import CounsellorProfile from './pages/CounsellorProfile';
import useStore from './store/useStore';
import AllCounsellors from './pages/AllCounsellors';



function App() {
    
    const { isCounsellorLoggedIn, counsellorData } = useStore((state) => ({
        isCounsellorLoggedIn: state.isCounsellorLoggedIn,
        counsellorData: state.counsellorData,
    }));

    useEffect(() => {
        if (isCounsellorLoggedIn) {
            console.log(counsellorData);
        }
    }, [isCounsellorLoggedIn, counsellorData]);
    return (
        <OCAuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/redirect" element={<RedirectHandler />} />
                    <Route path='/student-form' element={<StudentForm />} />
                    <Route path='/counsellor-login' element={<CounsellorForm />} />
                    <Route path="/student-profile" element={<StudentProfile />} />
                    <Route path="/counsellor-profile" element={<CounsellorProfile />} />
                    <Route path="/all-counsellors" element={<AllCounsellors />} /> 
                </Routes>
            </Router>
        </OCAuthProvider>
    );
}

export default App;
