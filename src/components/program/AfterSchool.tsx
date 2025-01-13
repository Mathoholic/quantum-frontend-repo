"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CommonForm from '../common_form';

const AfterSchoolPrograms: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowForm(!showForm);
  };
  const handleClose = () => {
    setShowForm(false);
  };

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

  return (
    <div ref={sectionRef} className={`w-full py-16 px-8 md:px-20 font-comic bg-[#fcf2a2] ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className={`${isVisible ? 'animate-slideInLeft' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">After School Programs:</span>
          </h2>
          <p className="custom-paragraph text-gray-700 mt-6">
            Our After School Programs are crafted to keep children engaged, productive, and inspired in a fun and safe setting. We offer a diverse range of activities, including Art and Craft, Music, Dance, Fitness and Yoga, STEM, Tuitions, and Homework assistance (subject to availability). Please reach out to us for further details.
          </p>
          <button onClick={handleClick} className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition">
            Enquire Now
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 animate-fadeIn">
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
        {/* Image Content */}
        <div className={`flex justify-center items-center ${isVisible ? 'animate-slideInRight' : ''}`}>
          <Image
            src="/program/After-School.svg"
            alt="Children on a rainbow"
            width={596}
            height={529}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default AfterSchoolPrograms;
