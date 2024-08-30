import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
    {
        href: 'https://facebook.com',
        icon: <FaFacebook style={{ height: '1.5rem', width: '1.5rem' }} />,
    },
    {
        href: 'https://twitter.com',
        icon: <FaTwitter style={{ height: '1.5rem', width: '1.5rem' }} />,
    },
    {
        href: 'https://linkedin.com',
        icon: <FaLinkedin style={{ height: '1.5rem', width: '1.5rem' }} />,
    },
];

const SocialMediaLinks = () => {
    return (
        <div className='flex space-x-4'>
            {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target='_blank' rel='noopener noreferrer'>
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialMediaLinks;
