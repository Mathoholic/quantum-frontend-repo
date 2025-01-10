'use client';

import React from 'react';
import DecorativeImages from './DecorativeImages';
import MainContent from './MainContent';

const HeroSection: React.FC = () => {
  const scrollToQuantumHover = () => {
    const element = document.getElementById("quantum-hover");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#d5f3f5] min-h-[75vh]  flex flex-col items-center justify-between relative overflow-hidden px-4 mb-0">
      <DecorativeImages />
      <div className="flex-grow flex items-center justify-center mb-4">
        <MainContent />
      </div>
      <div className='mt-4 items-center justify-center flex flex-col'>
        <button 
          onClick={scrollToQuantumHover} 
          className="bg-pink-500 text-white px-6 rounded-lg text-lg shadow-lg hover:bg-pink-600"
        >
          Let's Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
