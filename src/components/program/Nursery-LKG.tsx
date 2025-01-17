'use client'

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import "@/styles/globals.css";

const ProgramSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const featuresNursery = [
    { text: "Age Group: 3+ years.", color: "bg-pink-100 text-pink-800" },
    { text: "Build a strong foundation for academic and personal growth.", color: "bg-green-100 text-green-800" },
    { text: "Focus on literacy, social skills, creativity, and independence.", color: "bg-blue-100 text-blue-800" },
    { text: "Experiential activities to explore and understand the world.", color: "bg-orange-100 text-orange-800" },
    { text: "3 hours with a 12:1 student-teacher ratio.", color: "bg-purple-100 text-purple-800" },
  ];

  const featuresLKG = [
    { text: "Age Group: 4+ years.", color: "bg-pink-100 text-pink-800" },
    { text: "Develop critical thinking, pre-reading, writing, and math skills.", color: "bg-green-100 text-green-800" },
    { text: "Encourages problem-solving, teamwork, and creativity.", color: "bg-blue-100 text-blue-800" },
    { text: "Prepares children for structured learning while nurturing confidence.", color: "bg-orange-100 text-orange-800" },
    { text: "4 hours with a 15:1 student-teacher ratio.", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div ref={sectionRef} className={`w-full py-16 px-8 md:px-20 font-poppins bg-[#fcbbd0] ${isVisible ? 'animate-fadeIn' : ''}`}>
      {/* Nursery Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className={`${isVisible ? 'animate-slideInLeft' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold font-comic text-gray-800 mb-6">
            <span style={{ color: "#6ab846" }}>N</span>
            <span style={{ color: "#8d549e" }}>u</span>
            <span style={{ color: "#8d549e" }}>r</span>
            <span style={{ color: "#f06f13" }}>s</span>
            <span style={{ color: "#f06f13" }}>e</span>
            <span style={{ color: "#087278" }}>r</span>
            <span style={{ color: "#087278" }}>y</span>
            <span style={{ color: "#f06f13" }}>:</span>
          </h2>
          <ul className="space-y-4 mt-4">
            {featuresNursery.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-sm md:text-base font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`flex justify-center items-center ${isVisible ? 'animate-slideInRight' : ''}`}>
          <Image
            src="/program/nursery.svg"
            alt="Illustration of children engaging in nursery activities"
            width={596}
            height={529}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* LKG Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <div className={`flex justify-center items-center ${isVisible ? 'animate-slideInLeft' : ''}`}>
          <Image
            src="/program/lkg.svg"
            alt="Illustration of children participating in LKG activities"
            width={590}
            height={504}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className={`${isVisible ? 'animate-slideInRight' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold font-comic text-gray-800 mb-6">
            <span style={{ color: "#ed477c" }}>L</span>
            <span style={{ color: "#e04a2f" }}>K</span>
            <span style={{ color: "#652f8f" }}>G</span>
            <span style={{ color: "#087278" }}>:</span>
          </h2>
          <ul className="space-y-4 mt-4">
            {featuresLKG.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-sm md:text-base font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
