'use client';

import React, { useState, useEffect } from "react";

const letters = [
  { letter: "Q", fullForm: "Qurious" },
  { letter: "U1", fullForm: "Unique" }, // Changed key to U1
  { letter: "A", fullForm: "Aware" },
  { letter: "N", fullForm: "Nurtured" },
  { letter: "T", fullForm: "Thoughtful" },
  { letter: "U2", fullForm: "Uplifted" }, // Changed key to U2
  { letter: "M", fullForm: "Mindful" },
];

const QuantumHover: React.FC = () => {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (hoveredLetter === null) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % letters.length);
      }, 2000); // Change every 2 seconds
      return () => clearInterval(interval);
    }
  }, [hoveredLetter]);

  return (
    <div id="quantum-hover" className="flex flex-col items-center justify-center  p-24 bg-[#d5f3f5]">
      {/* Grid Boxes */}
      <div
        className="grid grid-cols-7 gap-0"
        style={{ width: "1120px", height: "160px" }} // Increased dimensions
      >
        {letters.map((item, index) => (
          <div
            key={index}
            className={`w-[160px] h-[160px] flex items-center justify-center border-[3px] border-[#087378] font-roboto font-bold text-[160px] leading-[120px] text-white transition-all duration-300 ${ // Increased font size
              hoveredLetter === item.letter || (hoveredLetter === null && currentIndex === index)
                ? "bg-[#01B8C1] border-[#087378] text-white"
                : "hover:bg-[#01B8C1] hover:border-[#087378] hover:text-white"
            }`}
            onMouseEnter={() => setHoveredLetter(item.letter)}
            onMouseLeave={() => setHoveredLetter(null)}
          >
            <span
              className="inline-block"
              style={{
                WebkitTextStroke: "3px #087378", // Adjusted text stroke
                color: "white",
                padding: "5px", // Adjusted padding
              }}
            >
              {item.letter[0]} {/* Display only the first character */}
            </span>
          </div>
        ))}
      </div>

      {/* Full Form Display */}
      <div className="mt-8">
        {(hoveredLetter || hoveredLetter === null) && (
          <div
            className="font-roboto font-bold text-[180px] leading-[281.25px] tracking-[0.08em] text-center text-[#01B8C1] transition-all duration-300  decoration-skip-ink-none underline-offset-from-font"
          >
            {letters.find((l) => l.letter === (hoveredLetter || letters[currentIndex].letter))?.fullForm}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumHover;
