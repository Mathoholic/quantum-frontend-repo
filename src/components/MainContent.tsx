import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MainContent: React.FC = () => {
  const mainRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(mainRef.current, { opacity: 1 }) // Ensure the main content is visible before starting the animation
      .from(h1Ref.current, { y: -50, opacity: 0, duration: 1 }, "-=0.5")
      .from(pRef.current, { y: 50, opacity: 0, duration: 1 }, "-=0.5");
  }, []);

  return (
    <main ref={mainRef} className="flex flex-col items-center text-center w-full h-auto justify-center gap-4 sm:gap-6 px-4 absolute inset-x-0 top-20 opacity-0">
      <h1 ref={h1Ref} className="font-extrabold text-gray-800 mb-4 w-full max-w-[576px] font-comic text-[32px] sm:text-[40px] lg:text-[52px] leading-[40px] sm:leading-[50px] lg:leading-[65px]">
        Take A Quantum Leap Into Learning
      </h1>
      <p ref={pRef} className="text-gray-600 text-xs sm:text-sm lg:text-base max-w-2xl">
        Quantum kids is a new age, progressive pre-school aiming to provide
        Child-Centric education hugely inspired by Montessori philosophy. Our
        thoughtfully designed environment nurtures each child's natural
        curiosity and creativity, inspiring them to become passionate and
        life long learners.
      </p>
    </main>
  );
};

export default MainContent;