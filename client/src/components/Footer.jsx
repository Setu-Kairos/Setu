import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
    return (
        <footer className='w-full bg-black text-blue-300 py-6 pt-10'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center px-5'>
                {/* Logo or Brand Name */}
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-2xl font-bold text-blue-500'>Your Brand Name</h2>
                </div>

                {/* Navigation Links */}
                <div className='mb-4 md:mb-0'>
                    <ul className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center'>
                        <li><a href='/all-counsellors' className='hover:text-blue-400 transition duration-300'>Counsellos</a></li>
                        <li><a href='/contact' className='hover:text-blue-400 transition duration-300'>Contact Us</a></li>
                        <li><a className='hover:text-blue-400 transition duration-300'>Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Social Media Icons */}
                <SocialMediaLinks />
            </div>

            {/* Copyright */}
            <div className='text-center mt-4'>
                <p className='text-sm text-gray-400'>&copy; {new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
