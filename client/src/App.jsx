import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OCAuthProvider from './context/OCAuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import RedirectHandler from './pages/RedirectHandler';
import Navbar from './components/Navbar';
import StudentForm from './pages/StudentForm';

function App() {
    return (
        <OCAuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/redirect" element={<RedirectHandler />} />
                    <Route path='/student-form' element={<StudentForm />} />
                </Routes>
            </Router>
        </OCAuthProvider>
    );
}

export default App;
