'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';

// Import SVGs
import QSvg from '../../public/quantum/q.svg';
import USvg1 from '../../public/quantum/u1.svg';
import ASvg from '../../public/quantum/a.svg';
import NSvg from '../../public/quantum/n.svg';
import TSvg from '../../public/quantum/t.svg';
import USvg2 from '../../public/quantum/u2.svg';
import MSvg from '../../public/quantum/m.svg';

const letters = [
  { id: 1, letter: "Q", fullForm: "Qurious", svg: QSvg },
  { id: 2, letter: "U", fullForm: "Unique", svg: USvg1 },
  { id: 3, letter: "A", fullForm: "Aware", svg: ASvg },
  { id: 4, letter: "N", fullForm: "Nurtured", svg: NSvg },
  { id: 5, letter: "T", fullForm: "Thoughtful", svg: TSvg },
  { id: 6, letter: "U", fullForm: "Uplifted", svg: USvg2 },
  { id: 7, letter: "M", fullForm: "Mindful", svg: MSvg },
];

const QuantumHover: React.FC = () => {
  const [hoveredLetterId, setHoveredLetterId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (hoveredLetterId === null) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % letters.length);
      }, 2000); // Change every 2 seconds
      return () => clearInterval(interval);
    }
  }, [hoveredLetterId]);

  return (
    <div id="quantum-hover" className="flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-[#d5f3f5]">
      {/* Grid Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 md:gap-10 w-full max-w-screen-lg 2xl:max-w-screen-2xl">
        {letters.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex items-center justify-center transition-all duration-300 ${
              hoveredLetterId === item.id || (hoveredLetterId === null && currentIndex === index)
                ? "animate-stars"
                : ""
            } w-[140%] pb-[110%] `} // Increase width and maintain aspect ratio
            onMouseEnter={() => setHoveredLetterId(item.id)}
            onMouseLeave={() => setHoveredLetterId(null)}
          >
            <Image
              src={item.svg}
              alt={item.letter}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </div>

      {/* Full Form Display */}
      <div className="mt-8">
        {(hoveredLetterId || hoveredLetterId === null) && (
          <div
            className="font-aladin aladin-regular text-center transition-all duration-300 text-pink-500"
            style={{
              fontSize: "calc(20px + 10vw)", // Responsive font size
              lineHeight: "calc(30px + 15vw)", // Responsive line height
            }}
          >
            {letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullForm}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumHover;
