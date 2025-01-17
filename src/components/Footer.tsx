import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E8F9FF] pt-12 ">
      <div className="container mx-auto flex flex-col md:flex-row gap-12 lg:px-20 px-10 ">
        {/* Address Section */}
        <div className="md:w-1/2">
          <Image
            src="/logo.svg" // Replace with your logo path
            alt="Quantum School Logo"
            width={97}
            height={76}
            className="2xl:w-44 2xl:h-32 mb-4 pl-6 md:pl-0"
          />

          
            
<p className="lg:text-base text-[14px] text-gray-700 leading-7 flex  7 ">
  <strong className="font-bold flex ">
    
    Quantum Kids Preschool and Daycare
  </strong>
  
</p>
<p className="lg:text-base text-[12px] text-gray-700 leading-7 flex ">
<FaMapMarkerAlt className="mr-2 mt-1 text-xl" />
56, Sy no. 25, Sompura Village,<br/> Sarjapura hobli, Anekal Taluk,
  <br />
  Bangalore, Karnataka - 562125.
  <br />
  Landmark: Next to ARS SIGNATURE Phase 2
</p>


          <p className="mt-2 lg:text-base text-[14px] text-gray-700 font-semibold flex items-center">
            <FaPhoneAlt className="mr-2" /> +91 8971133673
          </p>
          <p className="mt-2 text-base text-gray-700 text-[14px] font-semibold flex items-center">
            <FaEnvelope className="mr-2" />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@quantumkids.in" className="underline">
              contact@quantumkids.in
            </a>
          </p>
        </div>

        {/* Right Sections */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-12">
          {/* Explore Section */}
          <div className="md:w-1/3">
            <h3 className="font-semibold lg:text-xl text-lg text-gray-900 mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/qk-circle" className="lg:text-lg text-[14px] text-gray-700 hover:underline">
                  Quantum Circle
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="lg:text-lg text-[14px] text-gray-700 hover:underline"
                >
                  Gallery & News
                </a>
              </li>
              <li>
                <a
                  href="/our-programs"
                  className="lg:text-lg text-[14px] text-gray-700 hover:underline"
                >
                  Our Programs
                </a>
              </li>
            </ul>
          </div>

          {/* General Pages Section */}
          <div className="md:w-1/3 ">
            <h3 className="font-semibold lg:text-xl text-lg text-gray-900 mb-4">
              General Pages
            </h3>
            <ul className="space-y-3">
            <li>
                <a
                  href="/"
                  className="lg:text-lg text-[14px] text-gray-700 hover:underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className="lg:text-lg text-[14px] text-gray-700 hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/why-quantum"
                  className="lg:text-lg text-[14px] text-gray-700 hover:underline"
                >
                  Why Quantum
                </a>
              </li>
              
              <li>
                <a
                  href="/contact-us"
                  className="lg:text-lg text-[14px] text-gray-700 hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="md:w-1/3">
            <h3 className="font-semibold lg:text-xl text-lg text-gray-900 mb-4">
              Social Media
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/quantum-kids-preschool-and-daycare"
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200 transition"
                aria-label="LinkedIn"
              >
                <Image
                  src="/icons/Linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.facebook.com/people/Quantumkids-preschool-and-daycare/61571233544577/"
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
                href="https://www.instagram.com/quantumkidspreschoolanddaycare/"
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
      <div className="mt-12 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
        <span className="block md:inline">
          Copyright © Quantum School. All rights reserved.
        </span>
        <a
          href="https://www.google.com/maps/place/12.864800,77.773698/data=!4m6!3m5!1s0!7e2!8m2!3d12.864799999999999!4d77.773698?entry=gps&coh=192189&g_ep=CAESBzI0LjQ5LjYYACCenQoqkAEsOTQyMjYwNDYsOTQyNDI1ODksOTQyMjMyOTksOTQyMTY0MTMsOTQyMTI0OTYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjgyMDQsOTQyMjk4MzksOTQyMzkxMjcsNDcwODcxMTgsNDcwODQzOTMsOTQyMTMyMDBCAklO"
          className="underline ml-1"
        >
          Find us on maps
        </a>
      </div>
    </footer>
  );
};

export default Footer;
