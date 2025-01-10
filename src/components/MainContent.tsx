'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const MainContent: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      gsap.to(mainRef.current, { opacity: 1, duration: 1 });

      return () => {
        gsap.set(mainRef.current, { opacity: 0 });
      };
    } else {
      gsap.set(mainRef.current, { opacity: 0 });
    }
  }, [pathname]);

  return (
    <main
      ref={mainRef}
      className="flex flex-col items-center text-center w-full h-auto justify-center gap-4 sm:gap-6 px-4 absolute inset-x-0 top-20 opacity-0"
    >
      <h1
        className="font-extrabold text-gray-800 mb-4 w-full max-w-[576px] font-comic text-[32px] sm:text-[40px] lg:text-[52px] leading-[40px] sm:leading-[50px] lg:leading-[65px]"
      >
        Take A Quantum Leap Into Learning
      </h1>
      <p
        className="text-gray-600 text-sm sm:text-lg lg:text-xl max-w-2xl"
      >
        Quantum kids is a new age, progressive pre-school aiming to provide
        Child-Centric education hugely inspired by Montessori philosophy. Our
        thoughtfully designed environment nurtures each child's natural
        curiosity and creativity, inspiring them to become passionate and
        lifelong learners.
      </p>
    </main>
  );
};

export default MainContent;
