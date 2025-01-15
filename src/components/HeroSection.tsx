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
    <div className="bg-[#d5f3f5] lg:min-h-[75vh] 2xl:min-h-[50vh] flex flex-col items-center justify-between relative overflow-hidden px-4 sm:px-8 lg:px-10 ">
      <DecorativeImages />
      <div className="flex-grow flex flex-col items-center justify-center pt-[46px] px-[256px]">
        <div
          ref={mainRef}
          className="flex flex-col items-center text-center w-full h-auto justify-center gap-4 sm:gap-6 lg:px-4 absolute inset-x-0 top-20 opacity-0 2xl:gap-8 2xl:px-6 2xl:top-24"
        >
          <h1 className="font-extrabold text-gray-800 mb-4 w-full lg:max-w-[576px] 2xl:max-w-[800px] font-comic text-[32px] sm:text-[40px] lg:text-[52px] leading-[40px] sm:leading-[50px] lg:leading-[65px] 2xl:text-[70px] 2xl:leading-[75px]">
            Take A Quantum Leap Into Learning
          </h1>
          <p className="text-gray-600 sm:text-md lg:text-lg lg:max-w-2xl 2xl:max-w-4xl 2xl:text-2xl">
            Quantum kids is a new age, progressive pre-school aiming to provide
            Child-Centric education hugely inspired by Montessori philosophy. Our
            thoughtfully designed environment nurtures each child's natural
            curiosity and creativity, inspiring them to become passionate and
            lifelong learners.
          </p>
          <button 
          ref={buttonRef}
          onClick={scrollToQuantumHover} 
          className={`bg-pink-500 text-white px-3 py-2 sm:px-5 sm:py-3 rounded-lg 2xl:text-lg sm:text-base shadow-lg hover:bg-pink-600 transition-opacity duration-500 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          Let's Get Started
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;