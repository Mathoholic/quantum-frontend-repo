'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
    const currentPath = usePathname();

    return (
        <nav className="bg-white flex justify-between items-center px-6 py-4 shadow-md border border-blue-300">
            <div className="text-2xl font-bold">
                <Image src="/logo.svg" alt="Logo" width={97} height={76} />
            </div>
            <ul className="flex gap-8">
                {['Home', 'Why Quantum?', 'Admissions', 'Our Programs', 'Blogs', 'About Us', 'Contact Us', 'Gallery'].map((item) => {
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
            <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300">
                Enquire Now
            </button>
        </nav>
    );
};

export default Navbar;
