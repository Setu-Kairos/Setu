import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import sHome from '../assets/sHome.jpg'

const StudentHome = () => {
    const { ocAuth } = useOCAuth();
    const isStudentLoggedIn = useStore((state) => state.isStudentLoggedIn);
    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isStudentLoggedIn && ocAuth && ocAuth.authInfoManager?._idInfo?.edu_username) {
            const { edu_username: openIdUsername } = ocAuth.authInfoManager._idInfo;
            setName(openIdUsername);
        }
    }, [isStudentLoggedIn, ocAuth]);

    const handleSeeCounsellors = () => {
        navigate('/all-counsellors');
    };

    const features = [
        {
            title: 'Decentralized Identity',
            description: 'Chat with top counsellors without revealing your identity.',
        },
        {
            title: '24/7 Availability',
            description: 'Access counseling services anytime, anywhere, with our 24/7 support.',
        },
        {
            title: 'Confidential & Secure',
            description: 'Your privacy is our priority. All interactions are confidential and secure.',
        },
    ];

    const howItWorksSteps = [
        'Sign up and log in using your decentralized identity.',
        'Browse through our list of qualified counsellors.',
        'Start a confidential chat session with the counsellor of your choice.',
        'Receive guidance and support tailored to your needs.',
    ];

    const testimonials = [
        {
            name: 'John Doe',
            feedback: 'This platform has been a lifesaver. I was able to get the help I needed without worrying about my privacy.',
        },
        {
            name: 'Jane Smith',
            feedback: 'The counsellors are very professional and understanding. I felt heard and supported throughout.',
        },
    ];

    return (
        <div className='h-full w-full flex flex-col items-center'>
            {/* Welcome Section  */}
            <section className='w-full flex flex-col justify-center items-center mt-20 px-5'>
                <div className='flex flex-col sm:flex-row h-full w-full text-center sm:text-start'>
                    {/* Left Section */}
                    <div className='md:w-1/2 w-full flex flex-col items-center sm:items-start p-10'>
                        <h1 className='text-3xl md:text-6xl font-bold mb-4 text-blue-300'>
                            Welcome <span className='text-gradient'>{name}</span>
                        </h1>
                        <p className='text-lg mb-6 text-blue-300'>Discuss your problem with a counsellor right now.</p>
                        <button
                            onClick={handleSeeCounsellors}
                            className='px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
                        >
                            See Counsellors
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className='md:w-1/2 w-full flex items-start'>
                        <img
                            src={sHome}
                            alt='Student studying'
                            className='h-3/4 w-auto max-w-full'
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='w-full py-10 mt-10 px-5 bg-gray-900'>
                <h2 className='text-3xl md:text-6xl font-bold text-center mb-8 text-blue-500'>Our Features</h2>
                <div className='flex flex-col sm:flex-row justify-center items-center'>
                    {features.map((feature, index) => (
                        <div key={index} className='md:w-1/3 p-5 flex flex-col items-center sm:items-start'>
                            <h3 className='text-xl font-semibold mb-3 text-gray-200'>{feature.title}</h3>
                            <p className='text-blue-300 text-center sm:text-start'>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className='w-full py-10 mt-10 px-5'>
                <h2 className='text-3xl md:text-6xl font-bold text-center mb-8 text-blue-500'>How It Works</h2>
                <div className='flex flex-col items-center'>
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className='mb-4 text-lg text-blue-300'>
                            {index + 1}. {step}
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='w-full py-10 mt-10 px-5 bg-gray-900'>
                <h2 className='text-3xl md:text-6xl font-bold text-center mb-8 text-blue-500'>Testimonials</h2>
                <div className='flex flex-col sm:flex-row justify-center items-center flex-wrap'>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className='md:w-1/3 p-5 flex flex-col items-center sm:items-start'>
                            <h3 className='text-xl font-semibold mb-3 text-gray-200'>{testimonial.name}</h3>
                            <p className='text-blue-300 text-center sm:text-start'>
                                "{testimonial.feedback}"
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StudentHome;
