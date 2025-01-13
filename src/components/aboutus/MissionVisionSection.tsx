import React, { useEffect } from "react";
import Image from "next/image";
import "../../styles/about-us.css";

const MissionVisionSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#D4F3F5] w-full px-16 fade-in">
      <div className="py-8">
        <h1 className="text-center text-4xl font-bold px-4 slide-up">
          <span className="font-comic text-[#EE487C]">Mission </span>
          <span className="font-comic text-[#EE487C]">&amp; </span>
          <span className="font-comic text-[#EE487C]">Vision</span>
        </h1>
      </div>
      <div className="py-8 px-4">
        <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-8 md:space-y-0 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center slide-up">
            <div className="relative w-full h-48 md:h-64 mb-4">
              <Image
                src="/about-us/target.svg"
                alt="Mission Vision Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Mission</h3>
            <p className="text-sm text-gray-600">
              To provide Child - Centric education in a safe and stimulating
              environment, through a blend of Montessori principles and other
              progressive practices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center slide-up">
            <div className="relative w-full h-48 md:h-64 mb-4">
              <Image
                src="/about-us/mission-board.svg"
                alt="Mission and Vision"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Vision</h3>
            <p className="text-sm text-gray-600">
              To nurture independents, curious and compassionate learners who
              embrace cultural heritage and global perspectives, fostering a
              lifelong love of learning and a commitment to shopping
              sustainably.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionSection;