import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E8F9FF] py-12">
      <div className="container mx-auto flex flex-col md:flex-row gap-12 px-6 md:px-16">
        {/* Address Section */}
        <div className="md:w-1/2">
          <Image
            src="/logo.svg" // Replace with your logo path
            alt="Quantum School Logo"
            width={97} height={76}
            className="mb-6"
          />
          <p className="text-sm text-gray-700 leading-7">
            Quantum Kids preschool and daycare
            <br />
            123 Quantum Street, Sector 45, Gurgaon,
            <br />
            Haryana 122003, India
            <br />
            +91 9876543210
          </p>
          <p className="mt-4 text-sm text-gray-700">
            <a
              href="mailto:info@quantumschool.in"
              className="block hover:underline"
            >
              info@quantumschool.in
            </a>
            <a
              href="mailto:admissions@quantumschool.in"
              className="block hover:underline"
            >
              admissions@quantumschool.in
            </a>
          </p>
        </div>

        {/* Right Sections */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-12">
          {/* Explore Section */}
          <div className="md:w-1/3">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-sm text-gray-700 hover:underline">
                  Welcome
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-sm text-gray-700 hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-sm text-gray-700 hover:underline">
                  Gallery & News
                </a>
              </li>
              <li>
                <a href="/our-programs" className="text-sm text-gray-700 hover:underline">
                  Our Programs
                </a>
              </li>
            </ul>
          </div>

          {/* General Pages Section */}
          <div className="md:w-1/3">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              General Pages
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/faculty" className="text-sm text-gray-700 hover:underline">
                  Faculty
                </a>
              </li>
              <li>
                <a href="/admission-guide" className="text-sm text-gray-700 hover:underline">
                  Admission Guide
                </a>
              </li>
              <li>
                <a href="/location" className="text-sm text-gray-700 hover:underline">
                  Location
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-700 hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="md:w-1/3">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Social Media
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200 transition"
                aria-label="Twitter"
              >
                <Image
                  src="/icons/Linkedin.png" 
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://facebook.com"
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200 transition"
                aria-label="Facebook"
              >
                <Image
                  src="/icons/facebook.png" 
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200 transition"
                aria-label="Instagram"
              >
                <Image
                  src="/icons/instagram.jpeg" 
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-600">
        Copyright © Quantum School. All rights reserved.
        <br />
        <a href="https://maps.google.com" className="hover:underline">
          Find us on maps
        </a>
      </div>
    </footer>
  );
};

export default Footer;
