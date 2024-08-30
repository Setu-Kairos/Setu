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
import ErrorBoundary from './ErrorBoundary';
import Footer from './components/Footer';



function App() {

    return (
        <ErrorBoundary>
            <OCAuthProvider>
                <Router>
                    <div className="min-h-screen"> {/* This div ensures Routes takes at least 100vh */}
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
                    </div>
                    <Footer />
                </Router>
            </OCAuthProvider>
        </ErrorBoundary>

    );
}

export default App;
