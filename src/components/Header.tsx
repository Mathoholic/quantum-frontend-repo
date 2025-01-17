"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CommonForm from "./common_form";
import { useState, useEffect } from "react";

const Navbar = () => {
  const currentPath = usePathname();
  const [showForm, setShowForm] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isLinksVisible, setIsLinksVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For mobile menu toggle

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Why Quantum?", path: "/why-quantum" },
    { name: "Our Programs", path: "/our-programs" },
    { name: "Quantum Circle", path: "/qk-circle" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Gallery", path: "/gallery" },
  ];

  useEffect(() => {
    setTimeout(() => setIsLogoVisible(true), 100);
    setTimeout(() => setIsLinksVisible(true), 300);
    setTimeout(() => setIsButtonVisible(true), 500);
  }, [currentPath]);

  const handleClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="relative bg-[#fff6c8] flex items-center justify-between w-full shadow-md h-full transition-all duration-500 ease-in-out px-4 lg:py-2 xl:px-8 2xl:px-10">
      {/* Logo */}
      <div
        className={`flex transition-all duration-500 ${
          isLogoVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={60}
            className="transition-transform duration-500 2xl:p-2 lg:p1 hover:scale-110 2xl:w-48 2xl:h-28 xl:w-36 xl:h-20 lg:w-28 lg:h-16 md:w-20 md:h-14 w-16 h-12"
          />
        </Link>
      </div>

      {/* Menu Toggle for Small Screens */}
      <div className="md:hidden">
        <button
          onClick={toggleDropdown}
          className="text-black text-2xl focus:outline-none"
        >
          {isDropdownOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Navigation Links for Large Screens */}
      <div
        className={`hidden md:flex justify-center items-center rounded-full border border-black bg-gray-100 py-3 px-4 transition-all duration-500 ${
          isLinksVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        <ul className="flex flex-wrap justify-center items-center lg:gap-4 xl:gap-10 gap-2 w-full">
          {navigationLinks.map((link, index) => {
            const isActive = currentPath === link.path;
            const colors = [
              "text-purple-500",
              "text-blue-500",
              "text-green-500",
              "text-yellow-500",
              "text-orange-500",
              "text-red-500",
              "text-indigo-500",
            ];

            return (
              <li
                key={link.name}
                className="w-auto text-center transition-transform duration-300 font-bold"
              >
                <Link
                  href={link.path}
                  className={`block text-sm font-medium ${colors[index]} ${
                    isActive ? "opacity-90" : "hover:opacity-80"
                  } transition-transform duration-300 hover:scale-105 2xl:text-lg`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg md:hidden z-50">
          <ul className="flex flex-col gap-2 p-4">
            {navigationLinks.map((link, index) => {
              const isActive = currentPath === link.path;
              const colors = [
                "text-purple-500",
                "text-blue-500",
                "text-green-500",
                "text-yellow-500",
                "text-orange-500",
                "text-red-500",
                "text-indigo-500",
              ];

              return (
                <li
                  key={link.name}
                  className="w-full text-center transition-transform duration-300 font-bold"
                >
                  <Link
                    href={link.path}
                    className={`block text-sm font-medium ${colors[index]} ${
                      isActive ? "opacity-90" : "hover:opacity-80"
                    } transition-transform duration-300 hover:scale-105 2xl:text-lg`}
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Enquire Now Button */}
      <div
        className={`relative cursor-pointer transition-all duration-500 ${
          isButtonVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        } hover:scale-110 group`}
        onClick={handleClick}
      >
        <div className="relative inline-block px-4 py-2 bg-pink-500 text-white font-bold rounded-md 2xl:text-lg xl:text-base lg:text-sm md:text-xs text-xs 2xl:px-6 xl:px-5 lg:px-4 md:px-3 px-2">
          {/* Dotted Border */}
          <div className="absolute inset-0 border-dashed border-2 border-gray-700 transform translate-x-2 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"></div>
          <span className="relative z-10">Enquire Now</span>
        </div>
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
