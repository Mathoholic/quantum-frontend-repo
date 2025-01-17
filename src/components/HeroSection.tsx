'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DecorativeImages from './DecorativeImages';
import QuantumHover from './QuantumHover';

const HeroSection: React.FC = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', onComplete: () => setIsButtonVisible(true) }
      );
    }
  }, [buttonRef]);

  useEffect(() => {
    gsap.to(mainRef.current, { opacity: 1, duration: 1 });
    return () => {
      gsap.set(mainRef.current, { opacity: 0 });
    };
  }, []);

  const scrollToQuantumHover = () => {
    const element = document.getElementById("quantum-hover");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#d5f3f5] min-h-[38vh] md:min-h-[60vh] lg:min-h-[60vh] xl:min-h-[80vh] 2xl:min-h-[60vh] flex flex-col items-center justify-between relative overflow-hidden px-4 sm:px-8 md:px-12 lg:px-10">
      <DecorativeImages />
      <div className="flex-grow flex flex-col items-center justify-center md:pt-[46px] px-4 sm:px-8 md:px-12 lg:px-10  2xl:px-16">
        <div
          ref={mainRef}
          className="flex flex-col items-center text-center w-full h-auto justify-center gap-8 sm:gap-8 md:gap-10 lg:gap-2 2xl:gap-6 absolute inset-x-0 top-6 md:top-20 lg:top-10  2xl:top-12 opacity-0"
        >
          <h1 className="font-extrabold text-gray-800 md:mb-4 w-full max-w-[240px] md:max-w-[400px] lg:max-w-[576px] 2xl:max-w-[700px] font-comic text-[22px] md:text-[36px] lg:text-[44px] 2xl:text-[60px] leading-[25px]  sm:leading-[20px] md:leading-[25px] lg:leading-[65px] 2xl:leading-[75px]">
            Take A Quantum Leap Into Learning
          </h1>
          <p className="text-gray-600 text-[12px] sm:text-[12px] md:text-[16px] lg:text-lg 2xl:text-2xl max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-2xl 2xl:max-w-[900px] lg:mb-2">
            Quantum kids is a new age, progressive pre-school aiming to provide
            Child-Centric education hugely inspired by Montessori philosophy. Our
            thoughtfully designed environment nurtures each child's natural
            curiosity and creativity, inspiring them to become passionate and
            lifelong learners.
          </p>
          <button 
            ref={buttonRef}
            onClick={scrollToQuantumHover} 
            className={`bg-pink-500 text-white p-1 sm:py-3 md:p-4 lg:p-2 2xl:p-2 rounded-lg text-[14px] md:text-lg lg:text-lg 2xl:text-2xl shadow-lg hover:bg-pink-600 transition-opacity duration-500 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;