'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import CommonForm from './common_form';
import { useState } from 'react';

const Navbar = () => {
    const currentPath = usePathname();
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    return (
        <nav className="relative bg-white flex justify-between items-center px-6 py-4 shadow-md border border-blue-300">
            <div className="text-2xl font-bold">
                <Image src="/logo.svg" alt="Logo" width={97} height={76} />
            </div>
            <ul className="flex gap-8">
                {['Home', 'Why Quantum?', 'Our Programs', 'Blogs', 'About Us', 'Contact Us', 'Gallery'].map((item) => {
                    const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                    const isActive = currentPath === path;
                    return (
                        <li
                            key={item}
                            className={`text-base font-medium transition-colors duration-300 ${isActive ? 'text-pink-500' : 'text-blue-700 hover:text-pink-500'}`}
                        >
                            <Link href={path}>{item}</Link>
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={handleClick}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
                Enquire Now
            </button>

            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg relative">
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
