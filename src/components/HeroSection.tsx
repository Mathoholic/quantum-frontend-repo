'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DecorativeImages from './DecorativeImages';
import MainContent from './MainContent';
import QuantumHover from './QuantumHover';

const HeroSection: React.FC = () => {
  const [showQuantumHover, setShowQuantumHover] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', onComplete: () => setIsButtonVisible(true) }
      );
    }
  }, []);

  const scrollToQuantumHover = () => {
    setShowQuantumHover(true);
    const element = document.getElementById("quantum-hover");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#d5f3f5] min-h-[75vh] flex flex-col items-center justify-between relative overflow-hidden px-4 sm:px-8 lg:px-16 mb-0">
      <DecorativeImages />
      <div className="flex-grow flex items-center justify-center mb-4">
        <MainContent />
      </div>
      <div className="mt-4 items-center justify-center flex flex-col">
        <button 
          ref={buttonRef}
          onClick={scrollToQuantumHover} 
          className={`bg-pink-500 text-white px-3 py-2 sm:px-5 sm:py-3 rounded-lg text-sm sm:text-base shadow-lg hover:bg-pink-600 transition-opacity duration-500 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          Let's Get Started
        </button>
      </div>
      {showQuantumHover && <QuantumHover />}
    </div>
  );
};

export default HeroSection;