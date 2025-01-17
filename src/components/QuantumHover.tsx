'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import '../styles/globals.css';

// Import SVGs
import QSvg from '../../public/quantum/q.svg';
import USvg1 from '../../public/quantum/u1.svg';
import ASvg from '../../public/quantum/a.svg';
import NSvg from '../../public/quantum/n.svg';
import TSvg from '../../public/quantum/t.svg';
import USvg2 from '../../public/quantum/u2.svg';
import MSvg from '../../public/quantum/m.svg';
import UpliftedSvg from '../../public/quantum/uplifted.svg';
import UniqueSvg from '../../public/quantum/unique.svg';
import ThoughtfulSvg from '../../public/quantum/thoughtful.svg';
import QuriousSvg from '../../public/quantum/qurious.svg';
import NurturedSvg from '../../public/quantum/nurtured.svg';
import MindfulSvg from '../../public/quantum/mindful.svg';
import AwareSvg from '../../public/quantum/aware.svg';

const letters = [
  { id: 1, letter: "Q", fullForm: "Qurious", svg: QSvg, fullFormSvg: QuriousSvg },
  { id: 2, letter: "U", fullForm: "Unique", svg: USvg1, fullFormSvg: UniqueSvg },
  { id: 3, letter: "A", fullForm: "Aware", svg: ASvg, fullFormSvg: AwareSvg },
  { id: 4, letter: "N", fullForm: "Nurtured", svg: NSvg, fullFormSvg: NurturedSvg },
  { id: 5, letter: "T", fullForm: "Thoughtful", svg: TSvg, fullFormSvg: ThoughtfulSvg },
  { id: 6, letter: "U", fullForm: "Uplifted", svg: USvg2, fullFormSvg: UpliftedSvg },
  { id: 7, letter: "M", fullForm: "Mindful", svg: MSvg, fullFormSvg: MindfulSvg },
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
    <div id="quantum-hover" className="flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-[#d5f3f5] font-aladin">
      {/* Grid Boxes */}
      <div className="grid grid-cols-8 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 md:gap-10 w-full max-w-screen-lg 2xl:max-w-screen-2xl">
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
      <div className="mt-8 hidden 2xl:hidden md:hidden  lg:block">
        {(hoveredLetterId || hoveredLetterId === null) && (
          <div className="text-center transition-all duration-300">
            <Image
              src={letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullFormSvg}
              alt={letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullForm || 'default alt text'}
              layout="intrinsic"
              height={100} // Fixed height
              objectFit="contain"
            />
          </div>
        )}
      </div>
      <div className="mt-8 hidden 2xl:block md:block lg:hidden">
        {(hoveredLetterId || hoveredLetterId === null) && (
          <div className="text-center transition-all duration-300">
            <Image
              src={letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullFormSvg}
              alt={letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullForm || 'default alt text'}
              layout="intrinsic"
              height={170} // Fixed height
              objectFit="contain"
            />
          </div>
        )}
      </div>
      <div className="mt-8  2xl:hidden md:hidden lg:hidden">
        {(hoveredLetterId || hoveredLetterId === null) && (
          <div className="text-center transition-all duration-300">
            <Image
              src={letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullFormSvg}
              alt={letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullForm || 'default alt text'}
              layout="intrinsic"
              height={35} // Fixed height
              objectFit="contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumHover;