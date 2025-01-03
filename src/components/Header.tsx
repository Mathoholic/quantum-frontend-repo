'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
    const currentPath = usePathname();

    return (
        <nav className="bg-sky-100 flex justify-between items-center px-6 py-4 shadow-md">
            <div className="text-2xl font-bold text-blue-900">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <ul className="flex gap-8">
                {['Home', 'Why Quantum?', 'Admissions', 'Our Programs', 'Blogs', 'About Us', 'Contact Us'].map((item) => {
                    const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                    const isActive = currentPath === path;
                    return (
                        <li key={item} className={`text-base transition-colors duration-300 ${isActive ? 'text-pink-500' : 'text-blue-700 hover:text-pink-500'}`}>
                            <Link href={path}>{item}</Link>
                        </li>
                    );
                })}
            </ul>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                Contact Now
            </button>
        </nav>
    );
};

export default Navbar;
