"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import CommonForm from '../common_form';

const AfterSchoolPrograms: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  
      const handleClick = () => {
          setShowForm(!showForm);
      };
      const handleClose = () => {
        setShowForm(false);
    };
  return (
    <div className="w-full h-auto py-16 px-8 md:px-20 font-sans gap-20 bg-[#fcf2a2]">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2
            className="text-left text-[36px] md:text-[48px] font-comic font-normal leading-[50px] md:leading-[66.89px] underline-from-font decoration-skip-ink"
            style={{
              fontFamily: "Comic Sans MS",
              fontSize: "48px",
              fontWeight: 400,
              lineHeight: "66.89px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            <span className="bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">After School Programs:</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg text-gray-700 font-comic"
            style={{
              fontFamily: "Outfit",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "25.2px",
              letterSpacing: "0.02em",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Our After School Programs are crafted to keep children engaged, productive, and inspired in a fun and safe setting. We offer a diverse range of activities, including Art and Craft, Music, Dance, Fitness and Yoga, STEM, Tuitions, and Homework assistance (subject to availability). Please reach out to us for further details.
          </p>
          <button   onClick={handleClick}  className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition">
            Enquire Now
          </button>
        </div>
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
        {/* Image Content */}
        <div className="flex justify-center items-center">
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
