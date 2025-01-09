'use client';

import React, { useState } from "react";

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

  return (
    <div className="flex flex-col items-center justify-center  pb-20 bg-[#DFF9FA]">
      {/* Grid Boxes */}
      <div
        className="grid grid-cols-7 gap-0"
        style={{ width: "1120px", height: "160px" }} // Increased dimensions
      >
        {letters.map((item, index) => (
          <div
            key={index}
            className={`w-[160px] h-[160px] flex items-center justify-center border-[3px] border-[#087378] font-roboto font-bold text-[80px] leading-[100px] text-white transition-all duration-300 ${ // Increased font size
              hoveredLetter === item.letter
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
        {hoveredLetter && (
          <div
            className="font-roboto font-bold text-[180px] leading-[281.25px] tracking-[0.08em] text-center text-[#01B8C1] transition-all duration-300  decoration-skip-ink-none underline-offset-from-font"
          >
            {letters.find((l) => l.letter === hoveredLetter)?.fullForm}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumHover;
