'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import CommonForm from './common_form';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const currentPath = usePathname();
    const [showForm, setShowForm] = useState(false);
    const [isLogoVisible, setIsLogoVisible] = useState(false);
    const [isLinksVisible, setIsLinksVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLogoVisible(true), 100);
        setTimeout(() => setIsLinksVisible(true), 300);
        setTimeout(() => setIsButtonVisible(true), 500);
    }, []);

    const handleClick = () => {
        setShowForm(!showForm);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    return (
        <nav className="relative bg-[#d5f3f5] flex justify-between items-center px-10 py-3 w-full shadow-md h-[129px] gap-[142px] transition-all duration-500 ease-in-out">
            {/* Logo Section */}
            <div className={`flex  transition-all duration-500 ${isLogoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <Image src="/logo.svg" alt="Logo" width={97} height={76} className="transition-transform duration-500 hover:scale-110" />
            </div>

            {/* Navigation Links */}
            <ul className={`flex gap-2   item-center w-screen transition-all duration-500 ${isLinksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                {['Home', 'Why Quantum?', 'Our Programs', 'QK Circle', 'About Us', 'Contact Us', 'Gallery'].map((item, index) => {
                    const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                    const isActive = currentPath === path;
                    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-indigo-500'];
                    return (
                        <li key={item} className="transition-colors duration-300">
                            <Link
                                href={path}
                                className={`text-white text-sm font-medium px-4 py-2 rounded-lg ${colors[index]} ${isActive ? 'opacity-90' : 'hover:opacity-80'} transition-transform duration-300 hover:scale-105`}
                            >
                                {item}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Cloud Image Button with Text */}
            <div
                className={`relative cursor-pointer transition-all duration-500 ${isButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} hover:scale-110`}
                onClick={handleClick}
            >
                {/* Cloud Image */}
                <Image
                    src="/cloud.svg"
                    alt="Enquire Now"
                    // layout="fill"
                    // objectFit="contain"
                    height={200}
                    width={200}
                    className="transition-opacity duration-500 hover:opacity-80"
                />
                {/* "Enquire Now" Text */}
                
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg relative transition-transform duration-300 transform scale-95">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-pink-500 text-white text-2xl rounded-full hover:bg-pink-600 focus:outline-none transition-colors duration-300"
                        >
                            &times;
                        </button>
                        <CommonForm />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
