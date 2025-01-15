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

  return (
    <nav className="relative bg-[#d5f3f5] flex justify-around items-center  w-full shadow-md h-full transition-all duration-500 ease-in-out md:px-10 lg:px-16 xl:px-10 2xl:px-20">
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
            className="transition-transform duration-500 hover:scale-110 2xl:w-44 2xl:h-32 lg:w-36 lg:h-28 md:w-32 md:h-24 w-28 h-20"
          />
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <ul
          className={`flex flex-wrap justify-center items-center xl:gap-2 2xl:gap-6 w-full transition-all duration-500 ${
            isLinksVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          {navigationLinks.map((link, index) => {
            const isActive = currentPath === link.path;
            const colors = [
              "bg-purple-500",
              "bg-blue-500",
              "bg-green-500",
              "bg-yellow-500",
              "bg-orange-500",
              "bg-red-500",
              "bg-indigo-500",
            ];

            return (
              <li
                key={link.name}
                className="w-full sm:w-auto text-center transition-transform duration-300"
              >
                <Link
                  href={link.path}
                  className={`block text-white text-sm font-medium px-4 py-2 rounded-lg ${
                    colors[index]
                  } ${
                    isActive ? "opacity-90" : "hover:opacity-80"
                  } transition-transform duration-300 hover:scale-105 2xl:text-lg 2xl:px-6 2xl:py-3`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`relative cursor-pointer transition-all duration-500 ${
          isButtonVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        } hover:scale-110`}
        onClick={handleClick}
      >
        <Image
          src="/cloud.svg"
          alt="Enquire Now"
          height={234}
          width={105}
          className="transition-opacity duration-500 hover:opacity-80 2xl:w-64 xl:w-56 lg:w-48 md:w-40 w-32"
        />
      </div>
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
